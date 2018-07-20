import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcRadioChange, MdcMenu, MdcMenuItem } from '@angular-mdc/web';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  selectedIndex = -1;

  @ViewChild('demomenu') demoMenu: MdcMenu;

  handleMenuSelect(event: { index: number, item: MdcMenuItem }) {
    console.log(event);
    this.selectedIndex = event.index;
  }

  onRadioChange(evt: MdcRadioChange): void {
    if (evt.value) {
      this.demoMenu.setAnchorCorner(evt.value);
    }
  }
}
