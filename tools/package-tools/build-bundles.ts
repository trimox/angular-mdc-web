import { join, dirname } from 'path';
import { buildConfig } from './build-config';
import { BuildPackage } from './build-package';
import { rollupRemoveLicensesPlugin } from './rollup-remove-licenses';
import { rollupGlobals, dashCaseToCamelCase, rollupExternals } from './rollup-globals';

// There are no type definitions available for these imports.
const rollup = require('rollup');
const rollupNodeResolutionPlugin = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rollupAlias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

/** Directory where all bundles will be created in. */
const bundlesDir = join(buildConfig.outputDir, 'bundles');

/** Utility for creating bundles from raw ngc output. */
export class PackageBundler {
  constructor(private buildPackage: BuildPackage) { }

  /** Creates all bundles for the package and all associated entry points (UMD, ES5, ES2015). */
  async createBundles() {
    for (const entryPoint of this.buildPackage.secondaryEntryPoints) {
      await this.bundleSecondaryEntryPoint(entryPoint);
    }

    await this.bundlePrimaryEntryPoint();
  }

  /** Bundles the primary entry-point w/ given entry file, e.g. @angular-mdc/web */
  private async bundlePrimaryEntryPoint() {
    const packageName = this.buildPackage.name;

    return this.bundleEntryPoint({
      entryFile: this.buildPackage.entryFilePath,
      esm5EntryFile: join(this.buildPackage.esm5OutputDir, 'index.js'),
      moduleName: `ng.${this.buildPackage.name}`,
      esm2015Dest: join(bundlesDir, `${packageName}.js`),
      esm5Dest: join(bundlesDir, `${packageName}.es5.js`),
      umdDest: join(bundlesDir, `${packageName}.umd.js`),
      umdMinDest: join(bundlesDir, `${packageName}.umd.min.js`),
    });
  }

  /** Bundles a single secondary entry-point w/ given entry file, e.g. @angular-mdc/web/button */
  private async bundleSecondaryEntryPoint(entryPoint: string) {
    const packageName = this.buildPackage.name;
    const entryFile = join(this.buildPackage.outputDir, entryPoint, 'index.js');
    const esm5EntryFile = join(this.buildPackage.esm5OutputDir, entryPoint, 'index.js');

    return this.bundleEntryPoint({
      entryFile,
      esm5EntryFile,
      moduleName: `ng.${packageName}.${dashCaseToCamelCase(entryPoint)}`,
      esm2015Dest: join(bundlesDir, `${packageName}`, `${entryPoint}.js`),
      esm5Dest: join(bundlesDir, `${packageName}`, `${entryPoint}.es5.js`),
      umdDest: join(bundlesDir, `${packageName}-${entryPoint}.umd.js`),
      umdMinDest: join(bundlesDir, `${packageName}-${entryPoint}.umd.min.js`),
    });
  }

  /**
   * Creates the ES5, ES2015, and UMD bundles for the specified entry-point.
   * @param config Configuration that specifies the entry-point, module name, and output
   *     bundle paths.
   */
  private async bundleEntryPoint(config: BundlesConfig) {
    // Build FESM-2015 bundle file.
    await this.createRollupBundle({
      name: config.moduleName,
      input: config.entryFile,
      file: config.esm2015Dest,
      format: 'es',
      es6: true
    });

    // Build FESM-5 bundle file.
    await this.createRollupBundle({
      name: config.moduleName,
      input: config.esm5EntryFile,
      file: config.esm5Dest,
      format: 'es',
    });

    // Create UMD bundle of ES5 output.
    await this.createRollupBundle({
      name: config.moduleName,
      input: config.esm5Dest,
      file: config.umdDest,
      format: 'umd',
    });
  }

  /** Creates a rollup bundle of a specified JavaScript file.*/
  private async createRollupBundle(config: RollupBundleConfig) {
    const bundleOptions = {
      context: 'this',
      external: Object.keys(rollupExternals),
      input: config.input,
      onwarn: (message: string) => {
        if (/but never used/.test(message)) {
          return false;
        }
        console.warn(message);
      },
      plugins: [
        rollupRemoveLicensesPlugin,
        rollupNodeResolutionPlugin(),
        rollupAlias(this.getResolvedSecondaryEntryPointImportPaths(config.file))
      ]
    };

    const writeOptions = {
      name: config.name || 'ng.web',
      globals: rollupGlobals,
      file: config.file,
      format: config.format,
      banner: buildConfig.licenseBanner,
      sourcemap: false
    };

    bundleOptions.plugins.push(commonjs({
      include: 'node_modules/**'
    }));

    // Only transpile es5 / umd packages
    if (!config.es6) {
      bundleOptions.plugins.push(babel({
        include: 'node_modules/**'
      }));
    }

    // For UMD bundles, we need to adjust the `external` bundle option in order to include
    // all necessary code in the bundle.
    if (config.format === 'umd') {
      // bundleOptions.plugins.push(minify());

      // For all UMD bundles, we want to exclude tslib from the `external` bundle option so that
      // it is inlined into the bundle.
      let external = Object.keys(rollupGlobals);
      external.splice(external.indexOf('tslib'), 1);

      // If each secondary entry-point is re-exported at the root, we want to exclude those
      // secondary entry-points from the rollup globals because we want the UMD for the
      // primary entry-point to include *all* of the sources for those entry-points.
      if (this.buildPackage.exportsSecondaryEntryPointsAtRoot &&
        config.name === `ng.${this.buildPackage.name}`) {

        const importRegex = new RegExp(`@angular-mdc/${this.buildPackage.name}/.+`);
        external = external.filter(e => !importRegex.test(e));
      }

      bundleOptions.external = external;
    }

    return rollup.rollup(bundleOptions).then((bundle: any) => bundle.write(writeOptions));
  }

  /**
   * Gets mapping of import aliases (e.g. `@angular-mdc/web/button`) to the path of the es5
   * bundle output.
   * @param bundleOutputDir Path to the bundle output directory.
   * @returns Map of alias to resolved path.
   */
  private getResolvedSecondaryEntryPointImportPaths(bundleOutputDir: string) {
    return this.buildPackage.secondaryEntryPoints.reduce((map, p) => {
      map[`@angular-mdc/${this.buildPackage.name}/${p}`] =
        join(dirname(bundleOutputDir), this.buildPackage.name, `${p}.es5.js`);
      return map;
    }, {} as { [key: string]: string });
  }
}

/** Configuration for creating library bundles. */
interface BundlesConfig {
  entryFile: string;
  esm5EntryFile: string;
  moduleName: string;
  esm2015Dest: string;
  esm5Dest: string;
  umdDest: string;
  umdMinDest: string;
}

/** Configuration for creating a bundle via rollup. */
interface RollupBundleConfig {
  input: string;
  file: string;
  format: string;
  name: string;
  es6?: boolean;
}
