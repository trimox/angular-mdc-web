import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export class Child {
  label: string;
  route?: string;
  icon?: string;
  disabled?: boolean;
  active?: boolean;
}
const PANELS: Child[] = [
  { label: 'Tab One', route: 'first-tab', icon: 'phone' },
  { label: 'Tab Two', route: 'second-tab', icon: 'favorite' },
  { label: 'Tab Three', route: 'third-tab', icon: 'person_pin', disabled: false },
];

const LARGE: Child[] = [
  { label: 'Tab One' },
  { label: 'Tab Two', active: true },
  { label: 'Tab Three' },
  { label: 'Tab Four' },
  { label: 'Tab Five' },
  { label: 'Tab Six' },
  { label: 'Tab Seven' },
  { label: 'Tab Eight' },
  { label: 'Tab Nine' },
];

@Component({
  selector: 'tab-demo',
  templateUrl: './tab-demo.html'
})
export class TabDemo {
  panels: Child[] = PANELS;
  panelsLarge: Child[] = LARGE;

  constructor(public router: Router) { }

  onTabChange(event: { index: number, tab: any }) {
    console.log(event);
  }
}

@Component({
  selector: 'item-one-routed-content',
  template: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
      Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
      In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
      feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
      orci enim rutrum enim, vel tempor sapien arcu a tellus.</p>`,
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
