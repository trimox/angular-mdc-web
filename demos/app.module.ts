import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from './material.module';

import { DialogExampleModule } from './components/dialog-demo/dialog-example.module';

import { AppComponent } from './app.component';
import { DemoRouteOne, DemoRouteTwo, DemoRouteThree } from './components/tab-demo';

import { AppLayout } from './app-layout/app-layout';

import { APP_ROUTES, DEMO_ROUTES } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    DialogExampleModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: false })
  ],
  declarations: [
    AppComponent,
    AppLayout,
    DEMO_ROUTES,
    DemoRouteOne,
    DemoRouteTwo,
    DemoRouteThree
  ],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(AppComponent);
  }
}
