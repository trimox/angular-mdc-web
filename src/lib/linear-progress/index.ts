import { NgModule } from '@angular/core';

import { MdcLinearProgress } from './linear-progress';

@NgModule({
  exports: [MdcLinearProgress],
  declarations: [MdcLinearProgress],
})
export class MdcLinearProgressModule { }

export * from './linear-progress';
