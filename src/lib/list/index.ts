import { NgModule } from '@angular/core';

import { MdcRippleModule } from '../core/ripple/index';

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
  imports: [MdcRippleModule],
  exports: LIST_COMPONENTS,
  declarations: LIST_COMPONENTS,
})
export class MdcListModule { }

export * from './list';
export * from './list-item';
