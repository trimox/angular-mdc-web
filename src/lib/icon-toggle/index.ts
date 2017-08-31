import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdcIconToggleComponent } from './icon-toggle.component';

const ICON_TOGGLE_COMPONENTS = [
  MdcIconToggleComponent,
];

@NgModule({
  imports: [FormsModule],
  exports: ICON_TOGGLE_COMPONENTS,
  declarations: ICON_TOGGLE_COMPONENTS
})
export class MdcIconToggleModule { }

export * from './icon-toggle.component';
