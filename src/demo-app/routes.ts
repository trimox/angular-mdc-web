import { Routes } from '@angular/router';

import { AppBarDemo } from './components/app-bar/app-bar-demo';
import { ButtonDemo, FabDemo, IconToggleDemo } from './components/buttons';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo, RadioDemo, SelectDemo, SliderDemo, SwitchDemo, TextFieldDemo } from './components/inputs-controls';
import { ChipsDemo } from './components/chips-demo/chips-demo';
import { DialogDemo } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { Home } from './home/home';
import { IconDemo } from './components/icon-demo/icon-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo, GridListDemo, ImageListDemo } from './components/lists';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { ElevationDemo, RippleDemo, TypographyDemo } from './components/core';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { TabDemo } from './components/tab-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';

import { DIALOG_DEMO_ROUTES } from './components/dialog-demo/routes';
import { TABS_DEMO_ROUTES } from './components/tab-demo';

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
  GridListDemo,
  Home,
  IconDemo,
  IconToggleDemo,
  ImageListDemo,
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
  { path: 'textfield-demo', component: TextFieldDemo },
  { path: 'toolbar-demo', component: ToolbarDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'select-demo', component: SelectDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'card-demo', component: CardDemo },
  { path: 'elevation-demo', component: ElevationDemo },
  { path: 'image-list-demo', component: ImageListDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'grid-list-demo', component: GridListDemo },
  { path: 'drawer-demo', component: DrawerDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'icon-demo', component: IconDemo },
  { path: 'dialog-demo', component: DialogDemo, children: DIALOG_DEMO_ROUTES },
  { path: 'icon-toggle-demo', component: IconToggleDemo },
  { path: 'tab-demo', component: TabDemo, children: TABS_DEMO_ROUTES },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
