import { Routes } from '@angular/router';

import { AppBarDemo } from './components/app-bar/app-bar-demo';
import { ButtonDemo } from './components/buttons/button-demo/button-demo';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo } from './components/inputs-controls/checkbox-demo/checkbox-demo';
import { ChipsDemo } from './components/chips-demo/chips-demo';
import { DialogDemo } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { ElevationDemo } from './components/core/elevation-demo/elevation-demo';
import { FabDemo } from './components/buttons/fab-demo/fab-demo';
import { Home } from './home/home';
import { IconDemo } from './components/icon-demo/icon-demo';
import { IconToggleDemo } from './components/buttons/icon-toggle-demo/icon-toggle-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo } from './components/list-demo/list-demo';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { RadioDemo } from './components/inputs-controls/radio-demo/radio-demo';
import { RippleDemo } from './components/core/ripple-demo/ripple-demo';
import { SelectDemo } from './components/inputs-controls/select-demo/select-demo';
import { SliderDemo } from './components/inputs-controls/slider-demo/slider-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/inputs-controls/switch-demo/switch-demo';
import { TabDemo } from './components/tab-demo/tab-demo';
import { TextFieldDemo } from './components/inputs-controls/textfield-demo/textfield-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';
import { TypographyDemo } from './components/core/typography-demo/typography-demo';

import { DIALOG_DEMO_ROUTES } from './components/dialog-demo/routes';
import { TABS_DEMO_ROUTES } from './components/tab-demo/routes';
import { TEXTFIELD_DEMO_ROUTES } from './components/inputs-controls/textfield-demo/routes';

export const DEMO_ROUTES = [
  AppBarDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ChipsDemo,
  DialogDemo,
  DrawerDemo,
  ElevationDemo,
  FabDemo,
  Home,
  IconDemo,
  IconToggleDemo,
  LinearProgressDemo,
  ListDemo,
  MenuDemo,
  RadioDemo,
  RippleDemo,
  SelectDemo,
  SliderDemo,
  SnackbarDemo,
  SnackbarDemo,
  SwitchDemo,
  TabDemo,
  TextFieldDemo,
  ToolbarDemo,
  TypographyDemo,
];

export const APP_ROUTES: Routes = [
  { path: 'app-bar-demo', component: AppBarDemo },
  { path: 'button-demo', component: ButtonDemo },
  { path: 'chips-demo', component: ChipsDemo },
  { path: 'checkbox-demo', component: CheckboxDemo },
  { path: 'fab-demo', component: FabDemo },
  { path: 'switch-demo', component: SwitchDemo },
  { path: 'snackbar-demo', component: SnackbarDemo },
  { path: 'menu-demo', component: MenuDemo },
  { path: 'textfield-demo', component: TextFieldDemo, children: TEXTFIELD_DEMO_ROUTES },
  { path: 'toolbar-demo', component: ToolbarDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'select-demo', component: SelectDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'card-demo', component: CardDemo },
  { path: 'elevation-demo', component: ElevationDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'drawer-demo', component: DrawerDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'icon-demo', component: IconDemo },
  { path: 'dialog-demo', component: DialogDemo, children: DIALOG_DEMO_ROUTES },
  { path: 'icon-toggle-demo', component: IconToggleDemo },
  { path: 'tab-demo', component: TabDemo, children: TABS_DEMO_ROUTES },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
