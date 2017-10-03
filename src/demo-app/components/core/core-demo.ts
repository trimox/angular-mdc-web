import { Component } from '@angular/core';

import { coreLinks } from '../../navigation/core-links';

@Component({
  selector: 'core-demo',
  templateUrl: './core.html'
})
export class CoreDemo {
  navLinks = coreLinks.filter(_ => _.desc.length > 0);
}
