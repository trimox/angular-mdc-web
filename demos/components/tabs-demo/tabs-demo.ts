import { Component } from '@angular/core';

@Component({
  selector: 'tabs-demo',
  templateUrl: './tabs-demo.html'
})
export class TabsDemo {
  onTabActivated(event) {
    console.log(event)
  }
}
