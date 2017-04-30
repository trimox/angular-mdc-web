import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { ButtonModule } from '../../../src/components/button';
import { TextfieldModule } from '../../../src/components/textfield';
import { FabModule } from '../../../src/components/fab';

import { Home } from './components/home';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		ButtonModule,
		TextfieldModule,
		FabModule
	],
	declarations: [
		AppComponent,
		Home
	],
	bootstrap: [AppComponent]
})
export class AppModule { }