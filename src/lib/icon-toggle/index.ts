import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdcIconToggle } from './icon-toggle';
import { MdcIconModule } from '../icon/index';

const ICON_TOGGLE_COMPONENTS = [
  MdcIconToggle,
];

@NgModule({
  imports: [FormsModule, MdcIconModule],
  exports: [
    ICON_TOGGLE_COMPONENTS,
    MdcIconModule,
  ],
  declarations: ICON_TOGGLE_COMPONENTS
})
export class MdcIconToggleModule { }

export * from './icon-toggle';
