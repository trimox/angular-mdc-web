import { Routes } from '@angular/router';

import { AppBarDemo } from './components/app-bar/app-bar-demo';
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
import { GridListDemo } from './components/grid-list-demo/grid-list-demo';
import { Home } from './home/home';
import { IconButtonDemo } from './components/icon-button-demo/icon-button-demo';
import { IconDemo } from './components/icon-demo/icon-demo';
import { ImageListDemo } from './components/image-list-demo/image-list-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo } from './components/list-demo/list-demo';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { RadioDemo } from './components/radio-demo/radio-demo';
import { RippleDemo } from './components/ripple-demo/ripple-demo';
import { SelectDemo } from './components/select-demo/select-demo';
import { ShapeDemo } from './components/shape-demo/shape-demo';
import { SliderDemo } from './components/slider-demo/slider-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/switch-demo/switch-demo';
import { TextFieldDemo } from './components/textfield-demo/textfield-demo';
import { TypographyDemo } from './components/typography-demo/typography-demo';

export const DEMO_ROUTES = [
  AppBarDemo,
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
  GridListDemo,
  Home,
  IconDemo,
  IconButtonDemo,
  ImageListDemo,
  LinearProgressDemo,
  ListDemo,
  MenuDemo,
  RadioDemo,
  RippleDemo,
  SelectDemo,
  SliderDemo,
  ShapeDemo,
  SnackbarDemo,
  SnackbarDemo,
  SwitchDemo,
  TextFieldDemo,
  TypographyDemo
];

export const APP_ROUTES: Routes = [
  { path: 'app-bar-demo', component: AppBarDemo },
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
  { path: 'grid-list-demo', component: GridListDemo },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'icon-demo', component: IconDemo },
  { path: 'icon-button-demo', component: IconButtonDemo },
  { path: 'image-list-demo', component: ImageListDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'menu-demo', component: MenuDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'select-demo', component: SelectDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'shape-demo', component: ShapeDemo },
  { path: 'snackbar-demo', component: SnackbarDemo },
  { path: 'switch-demo', component: SwitchDemo },
  { path: 'textfield-demo', component: TextFieldDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: '**', redirectTo: 'home' }
];
