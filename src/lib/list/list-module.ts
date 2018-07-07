import { NgModule } from '@angular/core';

import {
  MdcList,
  MdcListDivider,
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
  MdcListItemText,
];

@NgModule({
  exports: LIST_DECLARATIONS,
  declarations: LIST_DECLARATIONS,
})
export class MdcListModule { }
