import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export class Child {
  label: string;
  route: string;
}
const DIRECTORY: Child[] = [
  { label: 'Tab One', route: 'first-tab' },
  { label: 'Tab Two', route: 'second-tab' },
  { label: 'Tab Three', route: 'third-tab' },
];

@Component({
  selector: 'tab-demo',
  templateUrl: './tab-demo.html'
})
export class TabDemo {
  isDisabled: boolean = true;
  isPrimaryColor: boolean = true;
  isSecondaryColor: boolean = false;
  eventTabIndex: number = 0;

  directory: Child[] = DIRECTORY;

  @ViewChild('myTabBar') myTabs: any;
  @ViewChild('myScrollFrame') myScrollFrame: any;

  constructor(public router: Router) { }

  switchToTab() {
    this.myTabs.setTabActiveAtIndex(1);
  }

  scrollForward() {
    this.myScrollFrame.scrollForward();
  }

  scrollBack() {
    this.myScrollFrame.scrollBack();
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  handleTabChange(event: { index: number, tab: any }) {
    this.eventTabIndex = event.index;
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
