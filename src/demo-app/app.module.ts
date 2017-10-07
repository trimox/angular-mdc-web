import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DemoMaterialModule } from './demo-material.module';

import { AppComponent } from './app.component';
import { ButtonDemo } from './components/button-demo/button-demo';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo } from './components/checkbox-demo/checkbox-demo';
import { DialogDemo } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { FabDemo } from './components/fab-demo/fab-demo';
import { ElevationDemo } from './components/core/elevation-demo/elevation-demo';
import { IconToggleDemo } from './components/icon-toggle-demo/icon-toggle-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo } from './components/list-demo/list-demo';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { RadioDemo } from './components/radio-demo/radio-demo';
import { SliderDemo } from './components/slider-demo/slider-demo';
import { IconDemo } from './components/icon-demo/icon-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/switch-demo/switch-demo';
import { TextfieldDemo } from './components/textfield-demo/textfield-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';
import { TypographyDemo } from './components/core/typography-demo/typography-demo';
import { TabDemo, ItemOneContent, ItemTwoContent, ItemThreeContent } from './components/tab-demo/tab-demo';
import { Navbar } from './components/navigation/navbar';
import { RippleDemo } from './components/core/ripple-demo/ripple-demo';
import { SurfaceDemo } from './components/core/surface-demo/surface-demo';

import { Home } from './components/home/home';

import { demoAppRoutes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    RouterModule.forRoot(demoAppRoutes, { useHash: true })
  ],
  declarations: [
    Home,
    AppComponent,
    ButtonDemo,
    CardDemo,
    CheckboxDemo,
    DialogDemo,
    DrawerDemo,
    ElevationDemo,
    FabDemo,
    IconDemo,
    IconToggleDemo,
    LinearProgressDemo,
    ListDemo,
    MenuDemo,
    Navbar,
    RadioDemo,
    SliderDemo,
    SnackbarDemo,
    SwitchDemo,
    TabDemo,
    TextfieldDemo,
    ToolbarDemo,
    TypographyDemo,
    RippleDemo,
    SurfaceDemo,
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
