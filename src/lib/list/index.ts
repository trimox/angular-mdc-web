import { NgModule } from '@angular/core';

import { ListComponent } from './list.component';
import {
  ListItemDirective,
  ListItemStartDirective,
  ListItemEndDirective,
  ListItemTextDirective,
  ListItemTextSecondaryDirective,
} from './list-item.directive';
import {
  ListGroupDirective,
  ListGroupSubheaderDirective,
} from './list-group.directive';
import { ListDividerComponent } from './list-divider.component';

const LIST_COMPONENTS = [
  ListComponent,
  ListItemDirective,
  ListItemStartDirective,
  ListItemEndDirective,
  ListItemTextDirective,
  ListItemTextSecondaryDirective,
  ListGroupDirective,
  ListGroupSubheaderDirective,
  ListDividerComponent,
];

@NgModule({
  exports: LIST_COMPONENTS,
  declarations: LIST_COMPONENTS,
})
export class ListModule { }

export * from './list.component';
export * from './list-item.directive';
