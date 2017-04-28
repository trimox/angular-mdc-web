import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SnackbarComponent } from './snackbar';

@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [SnackbarComponent],
	declarations: [SnackbarComponent],
})
export class SnackbarModule { }
