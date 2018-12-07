import { Component } from '@angular/core';

@Component({
  templateUrl: './menu-surface-demo.html'
})
export class MenuSurfaceDemo {
  corners: string[] = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];
  images = Array.from(Array(2), (x, i) => i);

  menuItems = [
    { label: "Flights" },
    { label: "Hotel" },
    { label: "Favorites" },
    { label: "Review Activity" }
  ];
}
