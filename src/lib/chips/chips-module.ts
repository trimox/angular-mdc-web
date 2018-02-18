import { NgModule } from '@angular/core';

import { MdcChip, MdcChipText } from './chip';
import { MdcChipSet } from './chip-set';

export const CHIP_DECLARATIONS = [
  MdcChip,
  MdcChipSet,
  MdcChipText,
];

@NgModule({
  exports: CHIP_DECLARATIONS,
  declarations: CHIP_DECLARATIONS
})
export class MdcChipsModule { }
