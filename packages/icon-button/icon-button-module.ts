import { NgModule } from '@angular/core';

import { MdcIconModule } from '@angular-mdc/web/icon';
import { MdcIconButton } from './icon-button';

@NgModule({
  imports: [MdcIconModule],
  exports: [
    MdcIconButton,
    MdcIconModule
  ],
  declarations: [MdcIconButton]
})
export class MdcIconButtonModule { }
