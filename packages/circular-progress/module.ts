import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MdcCircularProgress,
  MdcCircularProgressLarge,
  MdcCircularProgressMedium,
  MdcCircularProgressSmall,
} from './circular-progress';

const PROGRESS_DECLARATIONS = [
  MdcCircularProgress,
  MdcCircularProgressLarge,
  MdcCircularProgressMedium,
  MdcCircularProgressSmall,
];

@NgModule({
  imports: [CommonModule],
  exports: [PROGRESS_DECLARATIONS],
  declarations: [PROGRESS_DECLARATIONS]
})
export class MdcCircularProgressModule { }
