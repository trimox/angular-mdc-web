import { NgModule } from '@angular/core';

import {
  MdcTypography,
  MdcAdjustMarginDirective,
  MdcDisplay1Directive,
  MdcDisplay2Directive,
  MdcDisplay3Directive,
  MdcDisplay4Directive,
  MdcHeadlineDirective,
  MdcTitleDirective,
  MdcSubheading1Directive,
  MdcSubheading2Directive,
  MdcBody1Directive,
  MdcBody2Directive,
  MdcCaptionDirective
} from './typography.directive';

const TYPOGRAPHY_DIRECTIVES = [
  MdcTypography,
  MdcAdjustMarginDirective,
  MdcDisplay1Directive,
  MdcDisplay2Directive,
  MdcDisplay3Directive,
  MdcDisplay4Directive,
  MdcHeadlineDirective,
  MdcTitleDirective,
  MdcSubheading1Directive,
  MdcSubheading2Directive,
  MdcBody1Directive,
  MdcBody2Directive,
  MdcCaptionDirective
];

@NgModule({
  exports: [TYPOGRAPHY_DIRECTIVES],
  declarations: [TYPOGRAPHY_DIRECTIVES],
})
export class MdcTypographyModule { }

export * from './typography.directive';
