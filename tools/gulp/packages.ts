import { BuildPackage, buildConfig } from 'ng-mdc-build-tools';
import { join } from 'path';

export const mdcPackage = new BuildPackage('web');

// The mdc package re-exports its secondary entry-points at the root so that all of the
// components can still be imported through `@angular-mdc/web`.
mdcPackage.exportsSecondaryEntryPointsAtRoot = true;

// To avoid refactoring of the project the mdc package will map to the source path `lib/`.
mdcPackage.sourceDir = join(buildConfig.packagesDir, 'lib');
