import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { navigationLinks } from './index';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.html'
})
export class AppLayout {
  navLinks = navigationLinks;

  constructor(public media: ObservableMedia) { }
}
