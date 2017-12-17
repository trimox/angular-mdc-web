import { NgModule } from '@angular/core';

import {
  MdcList,
  MdcListDivider,
  MdcListGroup,
  MdcListGroupSubheader,
} from './list';
import {
  MdcListItem,
  MdcListItemGraphic,
  MdcListItemMeta,
  MdcListItemSecondaryText,
  MdcListItemText,
} from './list-item';

const LIST_COMPONENTS = [
  MdcList,
  MdcListDivider,
  MdcListGroup,
  MdcListGroupSubheader,
  MdcListItem,
  MdcListItemGraphic,
  MdcListItemMeta,
  MdcListItemSecondaryText,
  MdcListItemText,
];

@NgModule({
  exports: LIST_COMPONENTS,
  declarations: LIST_COMPONENTS,
})
export class MdcListModule { }
