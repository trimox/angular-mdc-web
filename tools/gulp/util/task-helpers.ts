import * as gulp from 'gulp';

// This import lacks type definitions.
const gulpClean = require('gulp-clean');

/** Delete files. */
export function cleanTask(glob: string) {
  return () => gulp.src(glob, { read: false }).pipe(gulpClean(null));
}
