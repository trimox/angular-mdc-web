import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { CardDemoComponent } from './components/card-demo/card-demo.component';
import { CheckboxDemoComponent } from './components/checkbox-demo/checkbox-demo.component';
import { DrawerDemoComponent } from './components/drawer-demo/drawer-demo.component';
import { ElevationDemoComponent } from './components/elevation-demo/elevation-demo.component';
import { FabDemoComponent } from './components/fab-demo/fab-demo.component';
import { SwitchDemoComponent } from './components/switch-demo/switch-demo.component';
import { SnackbarDemoComponent } from './components/snackbar-demo/snackbar-demo.component';
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { TextfieldDemoComponent } from './components/textfield-demo/textfield-demo.component';
import { TABS_DEMO_ROUTES } from './components/tab-demo/routes';
import { TabDemoComponent } from './components/tab-demo/tab-demo.component';
import { ToolbarDemoComponent } from './components/toolbar-demo/toolbar-demo.component';
import { LinearProgressDemoComponent } from './components/linear-progress-demo/linear-progress-demo.component';
import { ListDemoComponent } from './components/list-demo/list-demo.component';
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { RadioDemoComponent } from './components/radio-demo/radio-demo.component';

export const demoAppRoutes: Routes = [
  { path: 'button-demo', component: ButtonDemoComponent },
  { path: 'checkbox-demo', component: CheckboxDemoComponent },
  { path: 'fab-demo', component: FabDemoComponent },
  { path: 'switch-demo', component: SwitchDemoComponent },
  { path: 'snackbar-demo', component: SnackbarDemoComponent },
  { path: 'menu-demo', component: MenuDemoComponent },
  { path: 'textfield-demo', component: TextfieldDemoComponent },
  { path: 'toolbar-demo', component: ToolbarDemoComponent },
  { path: 'linear-progress-demo', component: LinearProgressDemoComponent },
  { path: 'typography-demo', component: TypographyDemoComponent },
  { path: 'radio-demo', component: RadioDemoComponent },
  { path: 'card-demo', component: CardDemoComponent },
  { path: 'elevation-demo', component: ElevationDemoComponent },
  { path: 'list-demo', component: ListDemoComponent },
  { path: 'drawer-demo', component: DrawerDemoComponent },
  { path: 'tab-demo', component: TabDemoComponent, children: TABS_DEMO_ROUTES },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
