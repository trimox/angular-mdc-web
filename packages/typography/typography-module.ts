import { NgModule } from '@angular/core';

import {
  MdcTypography,
  MdcTypographyBody1,
  MdcTypographyBody2,
  MdcTypographyButton,
  MdcTypographyCaption,
  MdcTypographyHeadline1,
  MdcTypographyHeadline2,
  MdcTypographyHeadline3,
  MdcTypographyHeadline4,
  MdcTypographyHeadline5,
  MdcTypographyHeadline6,
  MdcTypographyOverline,
  MdcTypographySubtitle1,
  MdcTypographySubtitle2
} from './typography';

const TYPOGRAPHY_DECLARATIONS = [
  MdcTypography,
  MdcTypographyBody1,
  MdcTypographyBody2,
  MdcTypographyButton,
  MdcTypographyCaption,
  MdcTypographyHeadline1,
  MdcTypographyHeadline2,
  MdcTypographyHeadline3,
  MdcTypographyHeadline4,
  MdcTypographyHeadline5,
  MdcTypographyHeadline6,
  MdcTypographyOverline,
  MdcTypographySubtitle1,
  MdcTypographySubtitle2
];

@NgModule({
  exports: TYPOGRAPHY_DECLARATIONS,
  declarations: TYPOGRAPHY_DECLARATIONS
})
export class MdcTypographyModule { }
