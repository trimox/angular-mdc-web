import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { CardDemoComponent } from './components/card-demo/card-demo.component';
import { CheckboxDemoComponent } from './components/checkbox-demo/checkbox-demo.component';
import { DialogDemoComponent } from './components/dialog-demo/dialog-demo.component';
import { DrawerDemoComponent } from './components/drawer-demo/drawer-demo.component';
import { FabDemoComponent } from './components/fab-demo/fab-demo.component';
import { ElevationDemoComponent } from './components/elevation-demo/elevation-demo.component';
import { LinearProgressDemoComponent } from './components/linear-progress-demo/linear-progress-demo.component';
import { ListDemoComponent } from './components/list-demo/list-demo.component';
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { RadioDemoComponent } from './components/radio-demo/radio-demo.component';
import { SnackbarDemoComponent } from './components/snackbar-demo/snackbar-demo.component';
import { SwitchDemoComponent } from './components/switch-demo/switch-demo.component';
import { TextfieldDemoComponent } from './components/textfield-demo/textfield-demo.component';
import { ToolbarDemoComponent } from './components/toolbar-demo/toolbar-demo.component';
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { TabDemoComponent, ItemOneContent, ItemTwoContent, ItemThreeContent } from './components/tab-demo/tab-demo.component';

import { MaterialModule } from '@angular-mdc/web';
// import { MaterialModule } from '../lib/module';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navigation/navbar.component';

import { demoAppRoutes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot(demoAppRoutes, { useHash: true })
  ],
  declarations: [
    AppComponent,
    ButtonDemoComponent,
    CardDemoComponent,
    CheckboxDemoComponent,
    DialogDemoComponent,
    DrawerDemoComponent,
    ElevationDemoComponent,
    FabDemoComponent,
    HomeComponent,
    LinearProgressDemoComponent,
    ListDemoComponent,
    MenuDemoComponent,
    NavbarComponent,
    RadioDemoComponent,
    SnackbarDemoComponent,
    SwitchDemoComponent,
    TabDemoComponent,
    TextfieldDemoComponent,
    ToolbarDemoComponent,
    TypographyDemoComponent,
    ItemOneContent,
    ItemTwoContent,
    ItemThreeContent,
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(AppComponent);
  }
}
