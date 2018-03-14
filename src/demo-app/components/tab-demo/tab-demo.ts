import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DemoRouteOne } from './route-one';
import { DemoRouteTwo } from './route-two';
import { DemoRouteThree } from './route-three';

export const TABS_DEMO_ROUTES: Routes = [
  { path: '', component: DemoRouteOne, outlet: 'taboutlet' },
  { path: 'first-tab', component: DemoRouteOne, outlet: 'taboutlet' },
  { path: 'second-tab', component: DemoRouteTwo, outlet: 'taboutlet' },
  { path: 'third-tab', component: DemoRouteThree, outlet: 'taboutlet' },
];

export class Tab {
  label: string;
  route?: string;
  icon?: string;
  disabled?: boolean;
  active?: boolean;
}

const DEMO_TABS: Tab[] = [
  { label: 'Tab One', icon: 'phone' },
  { label: 'Tab Two', icon: 'favorite' },
  { label: 'Tab Three', icon: 'person_pin', disabled: false },
];

const DEMO_TABS_ROUTES: Tab[] = [
  { label: 'Tab One', route: 'first-tab', icon: 'phone' },
  { label: 'Tab Two', route: 'second-tab', icon: 'favorite' },
  { label: 'Tab Three', route: 'third-tab', icon: 'person_pin', disabled: false },
];

const DEMO_SCROLLING_TABS: Tab[] = [
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
  asyncTabs: Observable<any>;

  demoTabs: Tab[] = DEMO_TABS;
  demoScrollingTabs: Tab[] = DEMO_SCROLLING_TABS;
  demoTabRoutes: Tab[] = DEMO_TABS_ROUTES;

  constructor(public router: Router) {
    this.asyncTabs = Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(this.demoScrollingTabs);
      }, 1000);
    });
  }

  onTabChange(event: { index: number, tab: any }) {
    console.log(event);
  }

  addTab() {
    // console.log(this.demoTabs)
    this.demoTabs.splice(3, 0,
      { label: `Tab ${this.demoTabs.length++}` });
  }

  addRouteTab() {
    this.demoTabRoutes.splice(3, 0,
      { label: `Tab ${this.demoTabRoutes.length++}`, route: 'first-tab' });
  }

  addScrollTab() {
    this.demoScrollingTabs.splice(3, 0,
      { label: `Tab ${this.demoScrollingTabs.length++}` });
  }

  deleteTab(tab: any) {
    this.demoTabs.splice(this.demoTabs.indexOf(tab), 1);
  }
}
