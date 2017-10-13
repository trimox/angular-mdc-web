import { Component } from '@angular/core';

import { coreLinks } from '../../navigation';

@Component({
  selector: 'core',
  templateUrl: './core.html'
})
export class Core {
  items = coreLinks.filter(_ => _.desc.length > 0);
}
