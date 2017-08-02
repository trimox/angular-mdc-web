import { Component } from '@angular/core';

@Component({
  selector: 'tab-demo',
  templateUrl: './tab-demo.component.html'
})
export class TabDemoComponent {
  tabLinks = [
    { label: 'Item One', link: 'first-tab', active: true },
    { label: 'Item Two', link: 'second-tab' },
    { label: 'Item Three', link: 'third-tab' },
  ];
}

@Component({
  selector: 'item-one-routed-content',
  template: '<p class="panel" role="tabpanel">Item One</p>',
})
export class ItemOneContent { }


@Component({
  selector: 'item-two-routed-content',
  template: '<p class="panel" role="tabpanel">Item Two</p>',
})
export class ItemTwoContent { }


@Component({
  selector: 'item-three-routed-content',
  template: '<p class="panel" role="tabpanel">Item Three</p>',
})
export class ItemThreeContent { }
