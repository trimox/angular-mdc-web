import { NgModule } from '@angular/core';

import { MdcListComponent } from './list.component';
import {
  MdcListItemDirective,
  MdcListItemStartDirective,
  MdcListItemEndDirective,
  MdcListItemTextDirective,
  MdcListItemTextSecondaryDirective,
} from './list-item.directive';
import {
  MdcListGroupDirective,
  MdcListGroupSubheaderDirective,
} from './list-group.directive';
import { MdcListDividerComponent } from './list-divider.component';

const LIST_COMPONENTS = [
  MdcListComponent,
  MdcListItemDirective,
  MdcListItemStartDirective,
  MdcListItemEndDirective,
  MdcListItemTextDirective,
  MdcListItemTextSecondaryDirective,
  MdcListGroupDirective,
  MdcListGroupSubheaderDirective,
  MdcListDividerComponent,
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
