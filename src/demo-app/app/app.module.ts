import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navigation/navbar.component';
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { CheckboxDemoComponent } from './components/checkbox-demo/checkbox-demo.component';
import { FabDemoComponent } from './components/fab-demo/fab-demo.component';
import { SwitchDemoComponent } from './components/switch-demo/switch-demo.component';
import { SnackbarDemoComponent } from './components/snackbar-demo/snackbar-demo.component';
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { TextfieldDemoComponent } from './components/textfield-demo/textfield-demo.component';
import { ToolbarDemoComponent } from './components/toolbar-demo/toolbar-demo.component';

import { MaterialModule } from './../../lib';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

require('@material/typography/mdc-typography.scss');
require('@material/card/mdc-card.scss');

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ButtonDemoComponent,
    CheckboxDemoComponent,
    FabDemoComponent,
    SwitchDemoComponent,
    SnackbarDemoComponent,
    MenuDemoComponent,
    TextfieldDemoComponent,
    ToolbarDemoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }