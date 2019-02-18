import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighlightModule } from 'ngx-highlightjs';

import { MaterialModule } from './material.module';
import { ComponentViewer } from './shared/component-viewer';
import { ExampleViewer } from './shared/example-viewer';
import { ActiveTabRouterModule, Markdown } from './shared';

const SHARED_DECLARATIONS = [
  ComponentViewer,
  ExampleViewer,
  Markdown
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ActiveTabRouterModule,
    HighlightModule
  ],
  declarations: [SHARED_DECLARATIONS],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HighlightModule,
    SHARED_DECLARATIONS
  ]
})
export class SharedModule { }
