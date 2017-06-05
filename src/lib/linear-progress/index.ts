import { NgModule } from '@angular/core';

import { LinearProgressComponent } from './linear-progress';

const PROGRESS_COMPONENTS = [
	LinearProgressComponent,
];

@NgModule({
	exports: [PROGRESS_COMPONENTS],
	declarations: [PROGRESS_COMPONENTS],
})
export class LinearProgressModule { }
