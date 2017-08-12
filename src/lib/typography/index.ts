import { NgModule } from '@angular/core';

import {
  Typography,
  AdjustMarginDirective,
  Display1Directive,
  Display2Directive,
  Display3Directive,
  Display4Directive,
  HeadlineDirective,
  TitleDirective,
  Subheading1Directive,
  Subheading2Directive,
  Body1Directive,
  Body2Directive,
  CaptionDirective
} from './typography.directive';

const TYPOGRAPHY_DIRECTIVES = [
  Typography,
  AdjustMarginDirective,
  Display1Directive,
  Display2Directive,
  Display3Directive,
  Display4Directive,
  HeadlineDirective,
  TitleDirective,
  Subheading1Directive,
  Subheading2Directive,
  Body1Directive,
  Body2Directive,
  CaptionDirective
];

@NgModule({
  exports: [TYPOGRAPHY_DIRECTIVES],
  declarations: [TYPOGRAPHY_DIRECTIVES],
})
export class TypographyModule { }

export * from './typography.directive';
