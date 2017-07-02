import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { MenuComponent, MDC_OPEN_FROM } from '../../../.././lib/menu/menu.component';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.component.html'
})
export class MenuDemoComponent implements OnInit {
  selectedIndex = -1;
  focusedItemIndex = null;
  openingPoint = "TOP_LEFT";
  @ViewChild('menu') menu: MenuComponent;

  ngOnInit() {
    let doc = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }

  handleChange() {
    this.menu.openFrom = this.openingPoint;    
  }

  showMenu() {
    this.menu.open(this.focusedItemIndex);
  }
  handleMenuSelect(event: number) {
    this.selectedIndex = event;
  }
}
