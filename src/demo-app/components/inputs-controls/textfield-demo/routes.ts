import { Routes } from '@angular/router';

import {
  TextFieldTab,
  TextFieldBoxTab,
  TextAreaTab,
} from './textfield-demo';

export const TEXTFIELD_DEMO_ROUTES: Routes = [
  { path: '', component: TextFieldTab, outlet: 'taboutlet' },
  { path: 'text-field-tab', component: TextFieldTab, outlet: 'taboutlet' },
  { path: 'text-field-box-tab', component: TextFieldBoxTab, outlet: 'taboutlet' },
  { path: 'textarea-tab', component: TextAreaTab, outlet: 'taboutlet' },
];
