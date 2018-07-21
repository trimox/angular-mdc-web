#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const cpx = require('cpx');

const destPath = 'packages/material-components-web/scss';
let basePath = process.cwd();
let source = path.resolve(basePath, 'node_modules/@material/**/*.scss');
let dest = path.resolve(basePath, destPath);

fs.mkdirSync(destPath);

cpx.copy(source, dest);

//node scripts/rewrite-sass-import-statements.js packages/material-components-web/scss
