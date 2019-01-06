import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule, DEMO_DECLARATIONS } from './app-routing.module';

import { HighlightModule } from 'ngx-highlightjs';

import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'json', func: json },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml }
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HighlightModule.forRoot({ languages: hljsLanguages })
  ],
  declarations: [
    AppComponent,
    DEMO_DECLARATIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
