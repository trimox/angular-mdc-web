import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { CheckboxDemoComponent } from './components/checkbox-demo/checkbox-demo.component';
import { FabDemoComponent } from './components/fab-demo/fab-demo.component';
import { SwitchDemoComponent } from './components/switch-demo/switch-demo.component';
import { SnackbarDemoComponent } from './components/snackbar-demo/snackbar-demo.component';
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { TextfieldDemoComponent } from './components/textfield-demo/textfield-demo.component';
import { ToolbarDemoComponent } from './components/toolbar-demo/toolbar-demo.component';
import { LinearProgressDemoComponent } from './components/linear-progress-demo/linear-progress-demo.component';
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { RadioDemoComponent } from './components/radio-demo/radio-demo.component';

export const appRoutes: Routes = [
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
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }