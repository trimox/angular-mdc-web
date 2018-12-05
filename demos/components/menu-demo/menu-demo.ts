import { Component } from '@angular/core';

import { MdcListItem } from '@angular-mdc/web';

@Component({
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  corners: string[] = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];

  menuItems = [
    { label: 'Flights' },
    { label: 'Hotel' },
    { label: 'Favorites' },
    { label: 'Review Activity'}
  ];

  lastSelection: number;

  onMenuSelect(event: { index: number, item: MdcListItem }) {
    this.lastSelection = event.index;
  }

  addItem(): void {
    this.menuItems.push({
      label: 'New Item'
    });
  }
}
