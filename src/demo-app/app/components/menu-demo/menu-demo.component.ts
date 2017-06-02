import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.component.html'
})
export class MenuDemoComponent implements OnInit {
  selectedIndex = -1;
  focusedItemIndex = null;
  @ViewChild('menu') menu;

  menuItems = [
    {
      id: 1,
      label: 'Security settings'
    },
    {
      id: 2,
      label: 'Review account activity'
    },
    {
      id: 3,
      label: 'Logoff'
    },
  ]

  ngOnInit() {
    let doc = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }

  showMenu() {
    this.menu.open(this.focusedItemIndex);
  }
  handleMenuCancel() {
    console.log('Menu cancel event');
  }
  handleMenuSelect(event: number) {
    this.selectedIndex = event;
    console.log('Menu event: Selected item: ' + event);
  }
}
