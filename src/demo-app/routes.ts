import { Routes } from '@angular/router';

import { Home } from './home/home';
import { ButtonDemo } from './components/buttons/button-demo/button-demo';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo } from './components/inputs-controls/checkbox-demo/checkbox-demo';
import { DialogDemo } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { FabDemo } from './components/buttons/fab-demo/fab-demo';
import { ElevationDemo } from './components/core/elevation-demo/elevation-demo';
import { IconToggleDemo } from './components/buttons/icon-toggle-demo/icon-toggle-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo } from './components/list-demo/list-demo';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { RadioDemo } from './components/inputs-controls/radio-demo/radio-demo';
import { SliderDemo } from './components/inputs-controls/slider-demo/slider-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/inputs-controls/switch-demo/switch-demo';
import { TextfieldDemo } from './components/inputs-controls/textfield-demo/textfield-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';
import { TypographyDemo } from './components/core/typography-demo/typography-demo';
import { TabDemo, ItemOneContent, ItemTwoContent, ItemThreeContent } from './components/tab-demo/tab-demo';
import { RippleDemo } from './components/core/ripple-demo/ripple-demo';
import { SurfaceDemo } from './components/core/surface-demo/surface-demo';
import { IconDemo } from './components/icon-demo/icon-demo';
import { TABS_DEMO_ROUTES } from './components/tab-demo/routes';

import { Buttons } from './components/buttons/buttons';
import { Core } from './components/core/core';
import { InputsControls } from './components/inputs-controls/inputs-controls';
import { GettingStarted } from './docs/getting-started';

export const demoAppRoutes: Routes = [
  { path: 'buttons', component: Buttons },
  { path: 'core', component: Core },
  { path: 'inputs-controls', component: InputsControls },
  { path: 'getting-started', component: GettingStarted },
  { path: 'button-demo', component: ButtonDemo },
  { path: 'checkbox-demo', component: CheckboxDemo },
  { path: 'fab-demo', component: FabDemo },
  { path: 'switch-demo', component: SwitchDemo },
  { path: 'snackbar-demo', component: SnackbarDemo },
  { path: 'menu-demo', component: MenuDemo },
  { path: 'textfield-demo', component: TextfieldDemo },
  { path: 'toolbar-demo', component: ToolbarDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'card-demo', component: CardDemo },
  { path: 'elevation-demo', component: ElevationDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'drawer-demo', component: DrawerDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'surface-demo', component: SurfaceDemo },
  { path: 'icon-demo', component: IconDemo },
  { path: 'dialog-demo', component: DialogDemo },
  { path: 'icon-toggle-demo', component: IconToggleDemo },
  { path: 'tab-demo', component: TabDemo, children: TABS_DEMO_ROUTES },
  { path: '', component: Home, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
