import { Routes } from '@angular/router';

import {
  ItemOneContent,
  ItemTwoContent,
  ItemThreeContent,
} from './tab-demo';

export const TABS_DEMO_ROUTES: Routes = [
  { path: '', component: ItemOneContent, outlet: 'taboutlet' },
  { path: 'first-tab', component: ItemOneContent, outlet: 'taboutlet' },
  { path: 'second-tab', component: ItemTwoContent, outlet: 'taboutlet' },
  { path: 'third-tab', component: ItemThreeContent, outlet: 'taboutlet' },
];
