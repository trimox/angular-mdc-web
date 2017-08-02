import { Routes } from '@angular/router';

import {
  ItemOneContent,
  ItemTwoContent,
  ItemThreeContent,
} from './tab-demo.component';

export const TABS_DEMO_ROUTES: Routes = [
  { path: 'first-tab', component: ItemOneContent },
  { path: 'second-tab', component: ItemTwoContent },
  { path: 'third-tab', component: ItemThreeContent },
];
