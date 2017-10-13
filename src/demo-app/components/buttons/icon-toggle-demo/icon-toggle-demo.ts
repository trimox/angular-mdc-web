import { Component } from '@angular/core';

@Component({
  selector: 'icon-toggle-demo',
  templateUrl: './icon-toggle-demo.html'
})
export class IconToggleDemo {
  isOn: boolean = false;
  isDisabled: boolean;
  isPrimary: boolean;
  isAccent: boolean;
  isDarkTheme: boolean;
}
