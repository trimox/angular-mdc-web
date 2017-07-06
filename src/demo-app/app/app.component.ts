import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}