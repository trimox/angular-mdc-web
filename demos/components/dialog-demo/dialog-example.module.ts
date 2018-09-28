import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from '../../material.module';

import {
  DialogAlert,
  DialogConfirmation,
  DialogScrollable,
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
    DialogScrollable,
    DialogSimple
  ],
  entryComponents: [
    DialogAlert,
    DialogConfirmation,
    DialogScrollable,
    DialogSimple
  ]
})
export class DialogExampleModule { }
