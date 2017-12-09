import { Routes } from '@angular/router';

import {
  DialogServiceTab,
  DialogTab,
} from './dialog-demo';

export const DIALOG_DEMO_ROUTES: Routes = [
  { path: '', component: DialogServiceTab, outlet: 'taboutlet' },
  { path: 'dialog-service-tab', component: DialogServiceTab, outlet: 'taboutlet' },
  { path: 'dialog-tab', component: DialogTab, outlet: 'taboutlet' },
];
