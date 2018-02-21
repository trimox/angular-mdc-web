import { NgModule } from '@angular/core';

import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcChip, MdcChipText, MdcChipIcon } from './chip';
import { MdcChipSet } from './chip-set';

export const CHIP_DECLARATIONS = [
  MdcChip,
  MdcChipIcon,
  MdcChipSet,
  MdcChipText,
];

@NgModule({
  imports: [MdcIconModule],
  exports: CHIP_DECLARATIONS,
  declarations: CHIP_DECLARATIONS
})
export class MdcChipsModule { }
