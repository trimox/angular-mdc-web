import { NgModule } from '@angular/core';

import { MdcTabIndicatorModule } from '@angular-mdc/web/tab-indicator';
import { MdcTabModule } from '@angular-mdc/web/tab';
import { MdcTabScrollerModule } from '@angular-mdc/web/tab-scroller';

import { MdcTabBar } from './tab-bar';

@NgModule({
  imports: [
    MdcTabIndicatorModule,
    MdcTabModule,
    MdcTabScrollerModule
  ],
  exports: [
    MdcTabBar,
    MdcTabIndicatorModule,
    MdcTabModule,
    MdcTabScrollerModule
  ],
  declarations: [MdcTabBar]
})
export class MdcTabBarModule { }
