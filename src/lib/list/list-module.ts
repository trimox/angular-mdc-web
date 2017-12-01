import { NgModule } from '@angular/core';

import {
  MdcList,
  MdcListDivider,
  MdcListGroup,
  MdcListGroupSubheader,
} from './list';
import {
  MdcListItem,
  MdcListItemStart,
  MdcListItemEnd,
  MdcListItemText,
  MdcListItemTextSecondary,
} from './list-item';

const LIST_COMPONENTS = [
  MdcList,
  MdcListItem,
  MdcListItemStart,
  MdcListItemEnd,
  MdcListItemText,
  MdcListItemTextSecondary,
  MdcListGroup,
  MdcListGroupSubheader,
  MdcListDivider,
];

@NgModule({
  exports: LIST_COMPONENTS,
  declarations: LIST_COMPONENTS,
})
export class MdcListModule { }
