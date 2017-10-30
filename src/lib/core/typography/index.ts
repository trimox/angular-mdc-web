import { NgModule } from '@angular/core';

import {
  MdcAdjustMargin,
  MdcBody1,
  MdcBody2,
  MdcTypographyButton,
  MdcCaption,
  MdcDisplay1,
  MdcDisplay2,
  MdcDisplay3,
  MdcDisplay4,
  MdcHeadline,
  MdcSubheading1,
  MdcSubheading2,
  MdcTitle,
  MdcTypography,
} from './typography';

const TYPOGRAPHY_DIRECTIVES = [
  MdcAdjustMargin,
  MdcBody1,
  MdcBody2,
  MdcTypographyButton,
  MdcCaption,
  MdcDisplay1,
  MdcDisplay2,
  MdcDisplay3,
  MdcDisplay4,
  MdcHeadline,
  MdcSubheading1,
  MdcSubheading2,
  MdcTitle,
  MdcTypography,
];

@NgModule({
  exports: [TYPOGRAPHY_DIRECTIVES],
  declarations: [TYPOGRAPHY_DIRECTIVES],
})
export class MdcTypographyModule { }

export * from './typography';
