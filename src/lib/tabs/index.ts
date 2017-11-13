import { NgModule } from '@angular/core';

import { MdcIconModule } from '../icon/index';

import {
  MdcTab,
  MdcTabIconText,
} from './tab/tab';

import { MdcTabBar, MdcTabBarIndicator } from './tab-bar/tab-bar';

import {
  MdcTabBarScroller,
  MdcTabBarScrollBack,
  MdcTabBarScrollForward,
  MdcTabBarScrollFrame,
} from './tab-bar-scroller/tab-bar-scroller';

const TAB_COMPONENTS = [
  MdcTab,
  MdcTabIconText,
  MdcTabBar,
  MdcTabBarIndicator,
  MdcTabBarScroller,
  MdcTabBarScrollBack,
  MdcTabBarScrollForward,
  MdcTabBarScrollFrame,
];

@NgModule({
  imports: [
    MdcIconModule,
  ],
  exports: [
    MdcIconModule,
    TAB_COMPONENTS
  ],
  declarations: [TAB_COMPONENTS]
})
export class MdcTabModule { }

export * from './tab/tab';
export * from './tab-bar/tab-bar';
export * from './tab-bar-scroller/tab-bar-scroller';
