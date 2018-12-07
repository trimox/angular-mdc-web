import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from './material.module';

import { DialogExampleModule } from './components/dialog-demo/dialog-example.module';

import { AppComponent } from './app.component';
import { AppLayout } from './app-layout';

import { AppRoutingModule, DEMO_DECLARATIONS } from './app-routing.module';

import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml }
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DemoMaterialModule,
    DialogExampleModule,
    HighlightModule.forRoot({ languages: hljsLanguages })
  ],
  declarations: [
    AppComponent,
    AppLayout,
    DEMO_DECLARATIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
