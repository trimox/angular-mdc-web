import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GettingStarted } from './getting-started';
import { Home } from './home/home';

export const DEMO_DECLARATIONS = [
  GettingStarted,
  Home
];

const routes: Routes = [
  { path: 'button-demo', loadChildren: './components/button-demo/button.module#ButtonModule' },
  { path: 'card-demo', loadChildren: './components/card-demo/card.module#CardModule' },
  { path: 'checkbox-demo', loadChildren: './components/checkbox-demo/checkbox.module#CheckboxModule' },
  { path: 'chips-demo', loadChildren: './components/chips-demo/chips.module#ChipsModule' },
  { path: 'dialog-demo', loadChildren: './components/dialog-demo/dialog.module#DialogModule' },
  { path: 'drawer-demo', loadChildren: './components/drawer-demo/drawer.module#DrawerModule' },
  { path: 'elevation-demo', loadChildren: './components/elevation-demo/elevation.module#ElevationModule' },
  { path: 'fab-demo', loadChildren: './components/fab-demo/fab.module#FabModule' },
  { path: 'form-field-demo', loadChildren: './components/form-field-demo/form-field.module#FormFieldModule' },
  { path: 'getting-started', component: GettingStarted },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'icon-demo', loadChildren: './components/icon-demo/icon.module#IconModule' },
  { path: 'icon-button-demo', loadChildren: './components/icon-button-demo/icon-button.module#IconButtonModule' },
  { path: 'image-list-demo', loadChildren: './components/image-list-demo/image-list.module#ImageListModule' },
  {
    path: 'linear-progress-demo',
    loadChildren: './components/linear-progress-demo/linear-progress.module#LinearProgressModule'
  },
  { path: 'list-demo', loadChildren: './components/list-demo/list.module#ListModule' },
  { path: 'menu-demo', loadChildren: './components/menu-demo/menu.module#MenuModule' },
  { path: 'menu-surface-demo', loadChildren: './components/menu-surface-demo/menu-surface.module#MenuSurfaceModule' },
  { path: 'radio-demo', loadChildren: './components/radio-demo/radio.module#RadioModule' },
  { path: 'ripple-demo', loadChildren: './components/ripple-demo/ripple.module#RippleModule' },
  { path: 'select-demo', loadChildren: './components/select-demo/select.module#SelectModule' },
  { path: 'slider-demo', loadChildren: './components/slider-demo/slider.module#SliderModule' },
  { path: 'snackbar-demo', loadChildren: './components/snackbar-demo/snackbar.module#SnackbarModule' },
  { path: 'switch-demo', loadChildren: './components/switch-demo/switch.module#SwitchModule' },
  { path: 'tabs-demo', loadChildren: './components/tabs-demo/tabs.module#TabsModule' },
  { path: 'text-field-demo', loadChildren: './components/text-field-demo/text-field.module#TextFieldModule' },
  { path: 'top-app-bar-demo', loadChildren: './components/top-app-bar-demo/top-app-bar.module#TopAppBarModule' },
  { path: 'typography-demo', loadChildren: './components/typography-demo/typography.module#TypographyModule' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
