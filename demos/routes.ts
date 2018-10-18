import { Routes } from '@angular/router';

import { ButtonDemo } from './components/button-demo/button-demo';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo } from './components/checkbox-demo/checkbox-demo';
import { ChipsDemo } from './components/chips-demo/chips-demo';
import { DialogDemo } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { ElevationDemo } from './components/elevation-demo/elevation-demo';
import { FabDemo } from './components/fab-demo/fab-demo';
import { FormFieldDemo } from './components/form-field-demo/form-field-demo';
import { GettingStarted, CliGuide } from './getting-started';
import { Home } from './home/home';
import { IconButtonDemo } from './components/icon-button-demo/icon-button-demo';
import { IconDemo } from './components/icon-demo/icon-demo';
import { ImageListDemo } from './components/image-list-demo/image-list-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo } from './components/list-demo/list-demo';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { MenuSurfaceDemo } from './components/menu-surface-demo/menu-surface-demo';
import { RadioDemo } from './components/radio-demo/radio-demo';
import { RippleDemo } from './components/ripple-demo/ripple-demo';
import { SelectDemo } from './components/select-demo/select-demo';
import { SliderDemo } from './components/slider-demo/slider-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/switch-demo/switch-demo';
import { TabsDemo } from './components/tabs-demo/tabs-demo';
import { TextFieldDemo } from './components/textfield-demo/textfield-demo';
import { TopAppBarDemo } from './components/top-app-bar-demo/top-app-bar-demo';
import { TypographyDemo } from './components/typography-demo/typography-demo';

export const DEMO_ROUTES = [
  TopAppBarDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ChipsDemo,
  CliGuide,
  DialogDemo,
  DrawerDemo,
  ElevationDemo,
  FabDemo,
  FormFieldDemo,
  GettingStarted,
  Home,
  IconDemo,
  IconButtonDemo,
  ImageListDemo,
  LinearProgressDemo,
  ListDemo,
  MenuDemo,
  MenuSurfaceDemo,
  RadioDemo,
  RippleDemo,
  SelectDemo,
  SliderDemo,
  SnackbarDemo,
  SnackbarDemo,
  SwitchDemo,
  TabsDemo,
  TextFieldDemo,
  TypographyDemo
];

export const APP_ROUTES: Routes = [
  { path: 'button-demo', component: ButtonDemo },
  { path: 'card-demo', component: CardDemo },
  { path: 'checkbox-demo', component: CheckboxDemo },
  { path: 'chips-demo', component: ChipsDemo },
  { path: 'cli-guide', component: CliGuide },
  { path: 'dialog-demo', component: DialogDemo },
  { path: 'drawer-demo', component: DrawerDemo },
  { path: 'elevation-demo', component: ElevationDemo },
  { path: 'fab-demo', component: FabDemo },
  { path: 'form-field-demo', component: FormFieldDemo },
  { path: 'getting-started', component: GettingStarted },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'icon-demo', component: IconDemo },
  { path: 'icon-button-demo', component: IconButtonDemo },
  { path: 'image-list-demo', component: ImageListDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'menu-demo', component: MenuDemo },
  { path: 'menu-surface-demo', component: MenuSurfaceDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'select-demo', component: SelectDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'snackbar-demo', component: SnackbarDemo },
  { path: 'switch-demo', component: SwitchDemo },
  { path: 'tabs-demo', component: TabsDemo },
  { path: 'textfield-demo', component: TextFieldDemo },
  { path: 'top-app-bar-demo', component: TopAppBarDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: '**', redirectTo: 'home' }
];
