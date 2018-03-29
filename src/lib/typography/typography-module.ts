import { NgModule } from '@angular/core';

import {
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

const TYPOGRAPHY_DECLARATIONS = [
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
  exports: TYPOGRAPHY_DECLARATIONS,
  declarations: TYPOGRAPHY_DECLARATIONS,
})
export class MdcTypographyModule { }
