import { NgModule } from '@angular/core';

import { MdcList } from './list.component';
import {
  MdcListItem,
  MdcListItemStart,
  MdcListItemEnd,
  MdcListItemText,
  MdcListItemTextSecondary,
} from './list-item.directive';
import {
  MdcListGroup,
  MdcListGroupSubheader,
} from './list-group.directive';
import { MdcListDivider } from './list-divider.component';

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

export * from './list.component';
export * from './list-item.directive';
export * from './list-divider.component';
export * from './list-group.directive';
