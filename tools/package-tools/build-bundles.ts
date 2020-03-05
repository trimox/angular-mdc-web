import {join, dirname} from 'path';
import {terserJs} from './minify-sources';
import {buildConfig} from './build-config';
import {BuildPackage} from './build-package';
import {rollupRemoveLicensesPlugin} from './rollup-remove-licenses';
import {dashCaseToCamelCase, rollupGlobals} from './rollup-globals';
import {remapSourcemap} from './sourcemap-remap';

// There are no type definitions available for these imports.
const rollup = require('rollup');
const rollupNodeResolve = require('@rollup/plugin-node-resolve');
const rollupAlias = require('@rollup/plugin-alias');
const babel = require('rollup-plugin-babel');

/** Directory where all bundles will be created in. */
const bundlesDir = join(buildConfig.outputDir, 'bundles');

/** Utility for creating bundles from raw ngc output. */
export class PackageBundler {
  /** Name of the AMD module for the primary entry point of the build package. */
  private readonly primaryAmdModuleName: string;

  constructor(private _buildPackage: BuildPackage) {
    this.primaryAmdModuleName = this._getAmdModuleName(_buildPackage.name);
  }

  /** Creates all bundles for the package and all associated entry points (UMD, ES5, ES2015). */
  async createBundles() {
    for (const entryPoint of this._buildPackage.secondaryEntryPoints) {
      await this.bundleSecondaryEntryPoint(entryPoint);
    }

    await this.bundlePrimaryEntryPoint();
  }

  /** Bundles the primary entry-point w/ given entry file, e.g. @angular-mdc/web */
  private async bundlePrimaryEntryPoint() {
    const packageName = this._buildPackage.name;

    return this.bundleEntryPoint({
      entryFile: this._buildPackage.entryFilePath,
      esm5EntryFile: join(this._buildPackage.esm5OutputDir, 'index.js'),
      importName: `@angular-mdc/${packageName}`,
      moduleName: this.primaryAmdModuleName,
      esm2015Dest: join(bundlesDir, `${packageName}.js`),
      esm5Dest: join(bundlesDir, `${packageName}.es5.js`),
      umdDest: join(bundlesDir, `${packageName}.umd.js`),
      umdMinDest: join(bundlesDir, `${packageName}.umd.min.js`),
    });
  }

  /** Bundles a single secondary entry-point w/ given entry file, e.g. @angular-mdc/web/button */
  private async bundleSecondaryEntryPoint(entryPointName: string) {
    const packageName = this._buildPackage.name;
    const entryFile = join(this._buildPackage.outputDir, entryPointName, 'index.js');
    const esm5EntryFile = join(this._buildPackage.esm5OutputDir, entryPointName, 'index.js');

    return this.bundleEntryPoint({
      entryFile,
      esm5EntryFile,
      importName: `@angular-mdc/${packageName}/${entryPointName}`,
      moduleName: this._getAmdModuleName(packageName, entryPointName),
      esm2015Dest: join(bundlesDir, `${packageName}`, `${entryPointName}.js`),
      esm5Dest: join(bundlesDir, `${packageName}`, `${entryPointName}.es5.js`),
      umdDest: join(bundlesDir, `${packageName}-${entryPointName}.umd.js`),
      umdMinDest: join(bundlesDir, `${packageName}-${entryPointName}.umd.min.js`)
    });
  }

  /**
   * Creates the ES5, ES2015, and UMD bundles for the specified entry-point.
   * @param config Configuration that specifies the entry-point, module name, and output
   * bundle paths.
   */
  private async bundleEntryPoint(config: BundlesConfig) {
    // Build FESM-2015 bundle file.
    await this.createRollupBundle({
      importName: config.importName,
      moduleName: config.moduleName,
      entry: config.entryFile,
      dest: config.esm2015Dest,
      format: 'es'
    });

    // Build FESM-5 bundle file.
    await this.createRollupBundle({
      importName: config.importName,
      moduleName: config.moduleName,
      entry: config.esm5EntryFile,
      dest: config.esm5Dest,
      format: 'es',
    });

    // Create UMD bundle of ES5 output.
    await this.createRollupBundle({
      importName: config.importName,
      moduleName: config.moduleName,
      entry: config.esm5Dest,
      dest: config.umdDest,
      format: 'umd',
    });

    // Create a minified UMD bundle using terser-js
    terserJs(config.umdDest, config.umdMinDest);

    // Remaps the sourcemaps to be based on top of the original TypeScript source files.
    await remapSourcemap(config.esm2015Dest);
    await remapSourcemap(config.esm5Dest);
    await remapSourcemap(config.umdDest);
  }

  /** Creates a rollup bundle of a specified JavaScript file.*/
  private async createRollupBundle(config: RollupBundleConfig) {
    const bundleOptions = {
      context: 'this',
      external: Object.keys(rollupGlobals),
      input: config.entry,
      onwarn: (warning: any) => {
        if (/but never used/.test(warning.message)) {
          return false;
        }

        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          throw Error(warning.message);
        }
        console.warn(warning.message);
      },
      plugins: [
        rollupRemoveLicensesPlugin
      ]
    };

    const writeOptions = {
      name: config.moduleName || 'ng.web',
      amd: {id: config.importName},
      banner: buildConfig.licenseBanner,
      format: config.format,
      file: config.dest,
      globals: rollupGlobals,
      sourcemap: true
    };

    // Only transpile es5 / umd packages
    if (config.format === 'umd') {
      bundleOptions.plugins.push(babel({
        include: 'node_modules/**',
        presets: [
          ['@babel/preset-env',
            {
              'modules': false,
              'targets': {
                'browsers': [
                  'last 2 versions',
                  'not ie 10'
                ]
              }
            }
          ]
        ]
      }));
    }

    // For UMD bundles, we need to adjust the `external` bundle option in order to include
    // all necessary code in the bundle.
    if (config.format === 'umd') {
      bundleOptions.plugins.push(rollupNodeResolve());
      // For all UMD bundles, we want to exclude tslib from the `external` bundle option so that
      // it is inlined into the bundle.
      let external = Object.keys(rollupGlobals);
      external.splice(external.indexOf('tslib'), 1);

      // If each secondary entry-point is re-exported at the root, we want to exclude those
      // secondary entry-points from the rollup globals because we want the UMD for the
      // primary entry-point to include *all* of the sources for those entry-points.
      if (this._buildPackage.exportsSecondaryEntryPointsAtRoot &&
        config.moduleName === this.primaryAmdModuleName) {

        const importRegex = new RegExp(`@angular-mdc/${this._buildPackage.name}/.+`);
        external = external.filter(e => !importRegex.test(e));

        // Use the rollup-alias plugin to map imports of the form `@angular-mdc/web/button`
        // to the actual file location so that rollup can resolve the imports (otherwise they
        // will be treated as external dependencies and not included in the bundle).
        bundleOptions.plugins.push(rollupAlias({
          entries: this._getResolvedSecondaryEntryPointImportPaths(config.dest)
        }));
      }
      bundleOptions.external = external;
    }

    return rollup.rollup(bundleOptions).then((bundle: any) => bundle.write(writeOptions));
  }

  /**
   * Gets array of import aliases (e.g. `@angular-mdc/web/button`) with the path of the es5
   * bundle output.
   * @param bundleOutputDir Path to the bundle output directory.
   * @returns Array of alias with resolved path.
   */
  private _getResolvedSecondaryEntryPointImportPaths(bundleOutputDir: string) {
    return this._buildPackage.secondaryEntryPoints.map(p => {
      return {
        find: `@angular-mdc/${this._buildPackage.name}/${p}`,
        replacement: join(dirname(bundleOutputDir), this._buildPackage.name, `${p}.es5.js`)
      };
    });
  }

  /**
   * Gets the AMD module name for a package and an optional entry point. This is consistent
   * to the module name format being used in "angular/angular".
   */
  private _getAmdModuleName(packageName: string, entryPointName?: string) {
    let amdModuleName = `ng.${dashCaseToCamelCase(packageName)}`;

    if (entryPointName) {
      // For example, the "@angular-mdc/web/top-app-bar" entry-point should be converted into
      // the following AMD module name: "ng.web.top-app-bar". Similar to the package name,
      // the entry-point name needs to be camel-cased in case it contains dashes.
      amdModuleName += `.${dashCaseToCamelCase(entryPointName)}`;
    }

    return amdModuleName;
  }
}

/** Configuration for creating library bundles. */
interface BundlesConfig {
  entryFile: string;
  esm5EntryFile: string;
  importName: string;
  moduleName: string;
  esm2015Dest: string;
  esm5Dest: string;
  umdDest: string;
  umdMinDest: string;
}

/** Configuration for creating a bundle via rollup. */
interface RollupBundleConfig {
  entry: string;
  dest: string;
  format: string;
  moduleName: string;
  importName: string;
}
