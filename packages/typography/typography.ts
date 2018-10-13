import { Directive } from '@angular/core';

@Directive({
  selector: '[mdc-typography], [mdcTypography]',
  host: { 'class': 'mdc-typography' }
})
export class MdcTypography { }

@Directive({
  selector: '[mdcHeadline1], [mdc-typography-display4]',
  host: { 'class': 'mdc-typography--headline1' }
})
export class MdcTypographyHeadline1 { }

@Directive({
  selector: '[mdcHeadline2], [mdc-typography-display3]',
  host: { 'class': 'mdc-typography--headline2' }
})
export class MdcTypographyHeadline2 { }

@Directive({
  selector: '[mdcHeadline3], [mdc-typography-display2]',
  host: { 'class': 'mdc-typography--headline3' }
})
export class MdcTypographyHeadline3 { }

@Directive({
  selector: '[mdcHeadline4], [mdc-typography-display1]',
  host: { 'class': 'mdc-typography--headline4' }
})
export class MdcTypographyHeadline4 { }

@Directive({
  selector: '[mdcHeadline5], [mdc-typography-headline]',
  host: { 'class': 'mdc-typography--headline5' }
})
export class MdcTypographyHeadline5 { }

@Directive({
  selector: '[mdcHeadline6], [mdc-typography-title]',
  host: { 'class': 'mdc-typography--headline6' }
})
export class MdcTypographyHeadline6 { }

@Directive({
  selector: '[mdcSubtitle1], [mdc-typography-subheading2]',
  host: { 'class': 'mdc-typography--subtitle1' }
})
export class MdcTypographySubtitle1 { }

@Directive({
  selector: '[mdcSubtitle2], [mdc-typography-subheading1]',
  host: { 'class': 'mdc-typography--subheading1' }
})
export class MdcTypographySubtitle2 { }

@Directive({
  selector: '[mdcBody2], [mdc-typography-body2]',
  host: { 'class': 'mdc-typography--body2' }
})
export class MdcTypographyBody2 { }

@Directive({
  selector: '[mdcBody1], [mdc-typography-body1]',
  host: { 'class': 'mdc-typography--body1' }
})
export class MdcTypographyBody1 { }

@Directive({
  selector: '[mdcCaption], [mdc-typography-caption]',
  host: { 'class': 'mdc-typography--caption' }
})
export class MdcTypographyCaption { }

@Directive({
  selector: '[mdcButton]',
  host: { 'class': 'mdc-typography--button' }
})
export class MdcTypographyButton { }

@Directive({
  selector: '[mdcOverline]',
  host: { 'class': 'mdc-typography--overline' }
})
export class MdcTypographyOverline { }
