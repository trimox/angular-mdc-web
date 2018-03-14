import { NgModule } from '@angular/core';

import { MdcRouter } from '@angular-mdc/web/common';

import {
  MdcTab,
  MdcTabIconText,
} from './tab';

import { MdcTabBar, MdcTabBarIndicator } from './tab-bar';

import {
  MdcTabBarScroller,
  MdcTabBarScrollBack,
  MdcTabBarScrollForward,
  MdcTabBarScrollFrame,
} from './tab-bar-scroller';

const TAB_DECLARATIONS = [
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
  exports: [
    MdcRouter,
    TAB_DECLARATIONS
  ],
  declarations: [
    MdcRouter,
    TAB_DECLARATIONS
  ]
})
export class MdcTabModule { }
