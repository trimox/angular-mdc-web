import { Component } from '@angular/core';

import { navigationLinks } from '../../common/navigation-links';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  navLinks = navigationLinks.filter(_ => _.desc.length > 0);
}
