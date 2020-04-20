import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GettingStarted} from './getting-started/getting-started';
import {Home} from './home/home';

export const DEMO_DECLARATIONS = [
  GettingStarted,
  Home
];

const routes: Routes = [
  {
    path: 'button', loadChildren: () =>
      import('./components/button/module').then(m => m.ButtonModule)
  },
  {path: 'card', loadChildren: () => import('./components/card/module').then(m => m.CardModule)},
  {
    path: 'checkbox', loadChildren: () =>
      import('./components/checkbox/module').then(m => m.CheckboxModule)
  },
  {
    path: 'chips', loadChildren: () =>
      import('./components/chips/module').then(m => m.ChipsModule)
  },
  {path: 'theme', loadChildren: () => import('./components/theme/module').then(m => m.ThemeModule)},
  {
    path: 'data-table', loadChildren: () =>
      import('./components/data-table/module').then(m => m.DataTableModule)
  },
  {path: 'dialog', loadChildren: () => import('./components/dialog/module').then(m => m.DialogModule)},
  {path: 'drawer', loadChildren: () => import('./components/drawer/module').then(m => m.DrawerModule)},
  {
    path: 'elevation', loadChildren: () =>
      import('./components/elevation/module').then(m => m.ElevationModule)
  },
  {path: 'fab', loadChildren: () => import('./components/fab/module').then(m => m.FabModule)},
  {
    path: 'form-field', loadChildren: () =>
      import('./components/form-field/module').then(m => m.FormFieldModule)
  },
  {path: 'getting-started', component: GettingStarted},
  {path: 'home', component: Home, pathMatch: 'full'},
  {path: 'icon', loadChildren: () => import('./components/icon/module').then(m => m.IconModule)},
  {
    path: 'icon-button', loadChildren: () =>
      import('./components/icon-button/module').then(m => m.IconButtonModule)
  },
  {
    path: 'image-list', loadChildren: () =>
      import('./components/image-list/module').then(m => m.ImageListModule)
  },
  {
    path: 'linear-progress', loadChildren: () =>
      import('./components/linear-progress/module').then(m => m.LinearProgressModule)
  },
  {path: 'list', loadChildren: () => import('./components/list/module').then(m => m.ListModule)},
  {path: 'menu', loadChildren: () => import('./components/menu/module').then(m => m.MenuModule)},
  {
    path: 'menu-surface', loadChildren: () =>
      import('./components/menu-surface/module').then(m => m.MenuSurfaceModule)
  },
  {path: 'radio', loadChildren: () => import('./components/radio/module').then(m => m.RadioModule)},
  {path: 'ripple', loadChildren: () => import('./components/ripple/module').then(m => m.RippleModule)},
  {path: 'select', loadChildren: () => import('./components/select/module').then(m => m.SelectModule)},
  {path: 'shape', loadChildren: () => import('./components/shape/module').then(m => m.ShapeModule)},
  {path: 'slider', loadChildren: () => import('./components/slider/module').then(m => m.SliderModule)},
  {
    path: 'snackbar', loadChildren: () =>
      import('./components/snackbar/module').then(m => m.SnackbarModule)
  },
  {path: 'switch', loadChildren: () => import('./components/switch/module').then(m => m.SwitchModule)},
  {path: 'tabs', loadChildren: () => import('./components/tabs/module').then(m => m.TabsModule)},
  {
    path: 'text-field', loadChildren: () =>
      import('./components/text-field/module').then(m => m.TextFieldModule)
  },
  {
    path: 'top-app-bar', loadChildren: () =>
      import('./components/top-app-bar/module').then(m => m.TopAppBarModule)
  },
  {
    path: 'typography', loadChildren: () =>
      import('./components/typography/module').then(m => m.TypographyModule)
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
