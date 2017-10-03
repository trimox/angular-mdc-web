import { Component } from '@angular/core';

import { coreLinks, navigationLinks } from '../../navigation';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})
export class Home {
  coreLinks = coreLinks.filter(_ => _.desc.length > 0);
  navLinks = navigationLinks.filter(_ => _.desc.length > 0);
}
