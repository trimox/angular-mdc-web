import { Component } from '@angular/core';

@Component({
  selector: 'icon-toggle-demo',
  templateUrl: './icon-toggle-demo.component.html'
})
export class IconToggleDemoComponent {
  isOn: boolean = false;
  isDisabled: boolean;
  isPrimary: boolean;
  isAccent: boolean;
  isDarkTheme: boolean;
}
