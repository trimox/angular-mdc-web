import { Component, ViewChild } from '@angular/core';

import { MdcRadioChange, MdcMenu, MdcListItem } from '@angular-mdc/web';

@Component({
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  menuItems = [
    { label: "Flights" },
    { label: "Hotel" },
    { label: "Favorites" }
  ];

  lastSelection: number;

  @ViewChild('demomenu') demoMenu: MdcMenu;

  onMenuSelect(event: { index: number, item: MdcListItem }) {
    this.lastSelection = event.index;
  }

  addItem(): void {
    this.menuItems.push({
      label: "New Item"
    });
  }

  onRadioChange(evt: MdcRadioChange): void {
    if (evt.value) {
      this.demoMenu.anchorCorner = evt.value;
    }
  }
}
