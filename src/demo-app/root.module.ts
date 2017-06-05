import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './../../dist/bundle/core.js';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);