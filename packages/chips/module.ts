import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcChip, MdcChipIcon, MdcChipCheckmark} from './chip';
import {MdcChipText} from './chip-directives';
import {MdcChipSet} from './chip-set';

export const CHIP_DECLARATIONS = [
  MdcChip,
  MdcChipCheckmark,
  MdcChipIcon,
  MdcChipSet,
  MdcChipText
];

@NgModule({
  imports: [CommonModule, MdcIconModule],
  exports: CHIP_DECLARATIONS,
  declarations: CHIP_DECLARATIONS
})
export class MdcChipsModule { }
