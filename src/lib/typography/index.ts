import { NgModule } from '@angular/core';

import {
  MdcAdjustMarginDirective,
  MdcBody1Directive,
  MdcBody2Directive,
  MdcButtonDirective,
  MdcCaptionDirective,
  MdcDisplay1Directive,
  MdcDisplay2Directive,
  MdcDisplay3Directive,
  MdcDisplay4Directive,
  MdcHeadlineDirective,
  MdcSubheading1Directive,
  MdcSubheading2Directive,
  MdcTitleDirective,
  MdcTypography,
} from './typography.directive';

const TYPOGRAPHY_DIRECTIVES = [
  MdcAdjustMarginDirective,
  MdcBody1Directive,
  MdcBody2Directive,
  MdcButtonDirective,
  MdcCaptionDirective,
  MdcDisplay1Directive,
  MdcDisplay2Directive,
  MdcDisplay3Directive,
  MdcDisplay4Directive,
  MdcHeadlineDirective,
  MdcSubheading1Directive,
  MdcSubheading2Directive,
  MdcTitleDirective,
  MdcTypography,
];

@NgModule({
  exports: [TYPOGRAPHY_DIRECTIVES],
  declarations: [TYPOGRAPHY_DIRECTIVES],
})
export class MdcTypographyModule { }

export * from './typography.directive';
