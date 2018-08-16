import { Component } from '@angular/core';

import { MdcTabActivatedEvent } from '@angular-mdc/web';

@Component({
  selector: 'tabs-demo',
  templateUrl: './tabs-demo.html'
})
export class TabsDemo {
  tabs = [
    { label: "Flights", icon: "airplanemode_active" },
    { label: "Hotel", icon: "hotel" },
    { label: "Favorites", icon: "favorite" }
  ];

  lastTab: number;

  logTab(event: MdcTabActivatedEvent): void {
    this.lastTab = event.index;
  }

  addTab(): void {
    this.tabs.push({
      label: "New Tab",
      icon: "hotel"
    });
  }
}
