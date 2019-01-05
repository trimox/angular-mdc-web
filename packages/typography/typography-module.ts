import { NgModule } from '@angular/core';

import {
  MdcTypography,
  MdcBody1,
  MdcBody2,
  MdcTypographyButton,
  MdcCaption,
  MdcHeadline1,
  MdcHeadline2,
  MdcHeadline3,
  MdcHeadline4,
  MdcHeadline5,
  MdcHeadline6,
  MdcOverline,
  MdcSubtitle1,
  MdcSubtitle2
} from './typography';

const TYPOGRAPHY_DECLARATIONS = [
  MdcTypography,
  MdcBody1,
  MdcBody2,
  MdcTypographyButton,
  MdcCaption,
  MdcHeadline1,
  MdcHeadline2,
  MdcHeadline3,
  MdcHeadline4,
  MdcHeadline5,
  MdcHeadline6,
  MdcOverline,
  MdcSubtitle1,
  MdcSubtitle2
];

@NgModule({
  exports: TYPOGRAPHY_DECLARATIONS,
  declarations: TYPOGRAPHY_DECLARATIONS
})
export class MdcTypographyModule { }
