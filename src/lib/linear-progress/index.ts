import { NgModule } from '@angular/core';

import { MdcLinearProgressComponent } from './linear-progress.component';

@NgModule({
  exports: [MdcLinearProgressComponent],
  declarations: [MdcLinearProgressComponent],
})
export class MdcLinearProgressModule { }

export * from './linear-progress.component';
