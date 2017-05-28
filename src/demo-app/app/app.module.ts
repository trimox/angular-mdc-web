import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { MaterialModule } from './../../lib';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Home } from './components/home';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    Home,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }