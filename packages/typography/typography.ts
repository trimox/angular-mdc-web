import { Directive } from '@angular/core';

@Directive({
  selector: '[mdc-typography], [mdcTypography]',
  host: { 'class': 'mdc-typography' }
})
export class MdcTypography { }

@Directive({
  selector: '[mdcHeadline1]',
  host: { 'class': 'mdc-typography--headline1' }
})
export class MdcHeadline1 { }

@Directive({
  selector: '[mdcHeadline2]',
  host: { 'class': 'mdc-typography--headline2' }
})
export class MdcHeadline2 { }

@Directive({
  selector: '[mdcHeadline3]',
  host: { 'class': 'mdc-typography--headline3' }
})
export class MdcHeadline3 { }

@Directive({
  selector: '[mdcHeadline4]',
  host: { 'class': 'mdc-typography--headline4' }
})
export class MdcHeadline4 { }

@Directive({
  selector: '[mdcHeadline5]',
  host: { 'class': 'mdc-typography--headline5' }
})
export class MdcHeadline5 { }

@Directive({
  selector: '[mdcHeadline6]',
  host: { 'class': 'mdc-typography--headline6' }
})
export class MdcHeadline6 { }

@Directive({
  selector: '[mdcSubtitle1]',
  host: { 'class': 'mdc-typography--subtitle1' }
})
export class MdcSubtitle1 { }

@Directive({
  selector: '[mdcSubtitle2]',
  host: { 'class': 'mdc-typography--subtitle2' }
})
export class MdcSubtitle2 { }

@Directive({
  selector: '[mdcBody2]',
  host: { 'class': 'mdc-typography--body2' }
})
export class MdcBody2 { }

@Directive({
  selector: '[mdcBody1]',
  host: { 'class': 'mdc-typography--body1' }
})
export class MdcBody1 { }

@Directive({
  selector: '[mdcCaption]',
  host: { 'class': 'mdc-typography--caption' }
})
export class MdcCaption { }

@Directive({
  selector: '[mdcButton]',
  host: { 'class': 'mdc-typography--button' }
})
export class MdcTypographyButton { }

@Directive({
  selector: '[mdcOverline]',
  host: { 'class': 'mdc-typography--overline' }
})
export class MdcOverline { }
