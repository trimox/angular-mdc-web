import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DemoMaterialModule } from './demo-material.module';

import { AppComponent } from './app.component';
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
import { IconDemo } from './components/icon-demo/icon-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { SwitchDemo } from './components/inputs-controls/switch-demo/switch-demo';
import { TextfieldDemo } from './components/inputs-controls/textfield-demo/textfield-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';
import { TypographyDemo } from './components/core/typography-demo/typography-demo';
import { TabDemo, ItemOneContent, ItemTwoContent, ItemThreeContent } from './components/tab-demo/tab-demo';
import { RippleDemo } from './components/core/ripple-demo/ripple-demo';
import { SurfaceDemo } from './components/core/surface-demo/surface-demo';
import { SelectDemo } from './components/inputs-controls/select-demo/select-demo';

import { Home } from './home/home';
import { AppToolbar } from './navigation/app-toolbar';
import { Buttons } from './components/buttons/buttons';
import { Core } from './components/core/core';
import { InputsControls } from './components/inputs-controls/inputs-controls';
import { GettingStarted } from './docs/getting-started';

import { demoAppRoutes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    RouterModule.forRoot(demoAppRoutes, { useHash: true, enableTracing: false })
  ],
  declarations: [
    Home,
    AppComponent,
    AppToolbar,
    Buttons,
    Core,
    InputsControls,
    GettingStarted,
    ButtonDemo,
    CardDemo,
    CheckboxDemo,
    DialogDemo,
    DrawerDemo,
    ElevationDemo,
    FabDemo,
    IconDemo,
    IconToggleDemo,
    SelectDemo,
    LinearProgressDemo,
    ListDemo,
    MenuDemo,
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
