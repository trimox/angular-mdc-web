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
import { SnackbarModule } from '../../../src/components/snackbar';
import { MenuModule } from '../../../src/components/menu';
import { RippleModule } from '../../../src/components/ripple';

import { Home } from './components/home';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		RippleModule,
		ButtonModule,
		TextfieldModule,
		FabModule,
		SnackbarModule,
		MenuModule
	],
	declarations: [
		AppComponent,
		Home
	],
	bootstrap: [AppComponent]
})
export class AppModule { }