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
    path: 'button-demo', loadChildren: () =>
      import('./components/button/module').then(m => m.ButtonModule)
  },
  {path: 'card-demo', loadChildren: () => import('./components/card-demo/card.module').then(m => m.CardModule)},
  {
    path: 'checkbox-demo', loadChildren: () =>
      import('./components/checkbox/module').then(m => m.CheckboxModule)
  },
  {
    path: 'chips-demo', loadChildren: () =>
      import('./components/chips-demo/chips.module').then(m => m.ChipsModule)
  },
  {path: 'theme-docs', loadChildren: () => import('./components/theme-docs/theme.module').then(m => m.ThemeModule)},
  {
    path: 'data-table-demo', loadChildren: () =>
      import('./components/data-table-demo/data-table.module').then(m => m.DataTableModule)
  },
  {path: 'dialog-demo', loadChildren: () => import('./components/dialog-demo/dialog.module').then(m => m.DialogModule)},
  {path: 'drawer-demo', loadChildren: () => import('./components/drawer-demo/drawer.module').then(m => m.DrawerModule)},
  {
    path: 'elevation-demo', loadChildren: () =>
      import('./components/elevation-demo/elevation.module').then(m => m.ElevationModule)
  },
  {path: 'fab-demo', loadChildren: () => import('./components/fab-demo/fab.module').then(m => m.FabModule)},
  {
    path: 'form-field-demo', loadChildren: () =>
      import('./components/form-field-demo/form-field.module').then(m => m.FormFieldModule)
  },
  {path: 'getting-started', component: GettingStarted},
  {path: 'home', component: Home, pathMatch: 'full'},
  {path: 'icon-demo', loadChildren: () => import('./components/icon/module').then(m => m.IconModule)},
  {
    path: 'icon-button-demo', loadChildren: () =>
      import('./components/icon-button-demo/icon-button.module').then(m => m.IconButtonModule)
  },
  {
    path: 'image-list-demo', loadChildren: () =>
      import('./components/image-list-demo/image-list.module').then(m => m.ImageListModule)
  },
  {
    path: 'linear-progress-demo', loadChildren: () =>
      import('./components/linear-progress/module').then(m => m.LinearProgressModule)
  },
  {path: 'list-demo', loadChildren: () => import('./components/list-demo/list.module').then(m => m.ListModule)},
  {path: 'menu-demo', loadChildren: () => import('./components/menu-demo/menu.module').then(m => m.MenuModule)},
  {
    path: 'menu-surface-demo', loadChildren: () =>
      import('./components/menu-surface-demo/menu-surface.module').then(m => m.MenuSurfaceModule)
  },
  {path: 'radio-demo', loadChildren: () => import('./components/radio-demo/radio.module').then(m => m.RadioModule)},
  {path: 'ripple-demo', loadChildren: () => import('./components/ripple-demo/ripple.module').then(m => m.RippleModule)},
  {path: 'select-demo', loadChildren: () => import('./components/select/module').then(m => m.SelectModule)},
  {path: 'shape-docs', loadChildren: () => import('./components/shape-docs/shape.module').then(m => m.ShapeModule)},
  {path: 'slider-demo', loadChildren: () => import('./components/slider-demo/slider.module').then(m => m.SliderModule)},
  {
    path: 'snackbar-demo', loadChildren: () =>
      import('./components/snackbar-demo/snackbar.module').then(m => m.SnackbarModule)
  },
  {path: 'switch-demo', loadChildren: () => import('./components/switch-demo/switch.module').then(m => m.SwitchModule)},
  {path: 'tabs-demo', loadChildren: () => import('./components/tabs-demo/tabs.module').then(m => m.TabsModule)},
  {
    path: 'text-field-demo', loadChildren: () =>
      import('./components/text-field-demo/text-field.module').then(m => m.TextFieldModule)
  },
  {
    path: 'top-app-bar-demo', loadChildren: () =>
      import('./components/top-app-bar-demo/top-app-bar.module').then(m => m.TopAppBarModule)
  },
  {
    path: 'typography-demo', loadChildren: () =>
      import('./components/typography-demo/typography.module').then(m => m.TypographyModule)
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
