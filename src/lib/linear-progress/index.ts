import { NgModule } from '@angular/core';

import { LinearProgressComponent } from './linear-progress.component';

@NgModule({
  exports: [LinearProgressComponent],
  declarations: [LinearProgressComponent],
})
export class LinearProgressModule { }

export * from './linear-progress.component';
