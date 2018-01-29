import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { navigationLinks } from './index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.html'
})
export class AppToolbar {
  navLinks = navigationLinks;

  constructor(public media: ObservableMedia) { }
}
