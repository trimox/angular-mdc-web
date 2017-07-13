import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
  `
  <navbar></navbar>
  <div #scrollContainer mdc-typography>
    <router-outlet (activate)="onActivate($event, scrollContainer)"></router-outlet>
  </div>  
  `
})
export class AppComponent {
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
