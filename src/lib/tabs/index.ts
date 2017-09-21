import { NgModule } from '@angular/core';

import {
  MdcTabComponent,
  MdcTabIconDirective,
  MdcTabIconTextDirective,
} from './tab/tab.component';

import {
  MdcTabBarDirective,
} from './tab-bar/tab-bar.directive';

import {
  MdcTabBarScroller,
  MdcTabBarScrollBackDirective,
  MdcTabBarScrollForwardDirective,
  MdcTabBarScrollFrameDirective,
  MdcTabBarScrollIndicatorInnerDirective,
} from './tab-bar-scroller/tab-bar-scroller.component';

const TAB_COMPONENTS = [
  MdcTabComponent,
  MdcTabIconDirective,
  MdcTabIconTextDirective,
  MdcTabBarDirective,
  MdcTabBarScroller,
  MdcTabBarScrollBackDirective,
  MdcTabBarScrollForwardDirective,
  MdcTabBarScrollFrameDirective,
  MdcTabBarScrollIndicatorInnerDirective,
];

@NgModule({
  exports: TAB_COMPONENTS,
  declarations: TAB_COMPONENTS
})
export class MdcTabModule { }

export * from './tab/tab.component';
export * from './tab-bar/tab-bar.directive';
export * from './tab-bar-scroller/tab-bar-scroller.component';
