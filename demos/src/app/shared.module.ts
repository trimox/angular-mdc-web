import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HighlightModule} from 'ngx-highlightjs';
import {HighlightPlusModule} from 'ngx-highlightjs/plus';

import {MaterialModule} from './material.module';
import {ComponentViewer} from './shared/component-viewer/component-viewer';
import {ExampleViewer} from './shared/example-viewer/example-viewer';
import {ActiveTabRouterModule} from './shared';

const SHARED_DECLARATIONS = [
  ComponentViewer,
  ExampleViewer
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ActiveTabRouterModule,
    HighlightPlusModule,
    HighlightModule
  ],
  declarations: [SHARED_DECLARATIONS],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HighlightPlusModule,
    HighlightModule,
    SHARED_DECLARATIONS
  ]
})
export class SharedModule {}
