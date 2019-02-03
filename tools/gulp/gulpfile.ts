import { createPackageBuildTasks } from 'mdc-build-tools';
import { mdcPackage } from './packages';

createPackageBuildTasks(mdcPackage);

import './tasks/clean';
