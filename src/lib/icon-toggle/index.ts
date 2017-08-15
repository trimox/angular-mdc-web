import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IconToggleComponent,
} from './icon-toggle.component';

const ICON_TOGGLE_COMPONENTS = [
  IconToggleComponent,
];

@NgModule({
  imports: [FormsModule],
  exports: ICON_TOGGLE_COMPONENTS,
  declarations: ICON_TOGGLE_COMPONENTS
})
export class IconToggleModule { }

export * from './icon-toggle.component';
