import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcListDivider} from './list-divider';
import {
  MdcList,
  MdcListGroup,
  MdcListGroupSubheader
} from './list';
import {
  MdcListItem,
  MdcListItemGraphic,
  MdcListItemMeta,
  MdcListItemSecondary,
  MdcListItemText
} from './list-item';

const LIST_DECLARATIONS = [
  MdcList,
  MdcListDivider,
  MdcListGroup,
  MdcListGroupSubheader,
  MdcListItem,
  MdcListItemGraphic,
  MdcListItemMeta,
  MdcListItemSecondary,
  MdcListItemText
];

@NgModule({
  imports: [CommonModule],
  exports: LIST_DECLARATIONS,
  declarations: LIST_DECLARATIONS,
})
export class MdcListModule { }
