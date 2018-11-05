import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from '../../material.module';

import {
  DialogAlert,
  DialogConfirmation,
  DialogScrollable,
  DialogForm,
  DialogSimple
} from './dialog-demo';

@NgModule({
  imports: [
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  declarations: [
    DialogAlert,
    DialogConfirmation,
    DialogForm,
    DialogScrollable,
    DialogSimple
  ],
  entryComponents: [
    DialogAlert,
    DialogConfirmation,
    DialogForm,
    DialogScrollable,
    DialogSimple
  ]
})
export class DialogExampleModule { }
