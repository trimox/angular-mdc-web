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

@Component({
  selector: 'tab-demo',
  templateUrl: './tab-demo.html'
})
export class TabDemo {
  demoTabs = [
    { label: 'Tab One', icon: 'phone', disabled: false },
    { label: 'Tab Two', icon: 'favorite', disabled: false },
    { label: 'Tab Three', icon: 'person_pin', disabled: false },
  ];

  demoTabRoutes = [
    { label: 'Tab One', route: 'first-tab' },
    { label: 'Tab Two', route: 'second-tab' },
    { label: 'Tab Three', route: 'third-tab', disabled: false },
  ];

  demoScrollingTabs = [
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

  asyncTabs: Observable<any>;

  constructor(private router: Router) {
    this.asyncTabs = Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(this.demoScrollingTabs);
      }, 1000);
    });
  }

  onTabChange(event: { index: number, tab: any }) {
    console.log(event);
  }

  addScrollTab() {
    this.demoScrollingTabs.push({ label: `Tab ${this.demoScrollingTabs.length}` });
  }

  deleteTab(tab: any) {
    this.demoTabs.splice(this.demoTabs.indexOf(tab), 1);
  }
}
