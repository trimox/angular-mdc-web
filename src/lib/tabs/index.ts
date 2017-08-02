import { NgModule } from '@angular/core';

import {
  TabComponent,
  TabIconDirective,
  TabIconTextDirective,
} from './tab/tab.component';

import {
  TabBarDirective,
} from './tab-bar/tab-bar.directive';

import {
  TabBarScrollerDirective,
  TabBarScrollBackDirective,
  TabBarScrollForwardDirective,
  TabBarScrollFrameDirective,
  TabBarScrollIndicatorInnerDirective,
} from './tab-bar-scroller/tab-bar-scroller.component';

const TAB_COMPONENTS = [
  TabComponent,
  TabIconDirective,
  TabIconTextDirective,
  TabBarDirective,
  TabBarScrollerDirective,
  TabBarScrollBackDirective,
  TabBarScrollForwardDirective,
  TabBarScrollFrameDirective,
  TabBarScrollIndicatorInnerDirective,
];

@NgModule({
  exports: TAB_COMPONENTS,
  declarations: TAB_COMPONENTS
})
export class TabModule { }

export * from './tab/tab.component';
export * from './tab-bar/tab-bar.directive';
export * from './tab-bar-scroller/tab-bar-scroller.component';
