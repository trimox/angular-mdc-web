import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-typography], [mdcTypography]'
})
export class MdcTypography {
  @HostBinding('class.mdc-typography') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline1], [mdc-typography-display4]'
})
export class MdcTypographyHeadline1 {
  @HostBinding('class.mdc-typography--headline1') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline2], [mdc-typography-display3]'
})
export class MdcTypographyHeadline2 {
  @HostBinding('class.mdc-typography--headline2') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline3], [mdc-typography-display2]'
})
export class MdcTypographyHeadline3 {
  @HostBinding('class.mdc-typography--headline3') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline4], [mdc-typography-display1]'
})
export class MdcTypographyHeadline4 {
  @HostBinding('class.mdc-typography--headline4') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline5], [mdc-typography-headline]'
})
export class MdcTypographyHeadline5 {
  @HostBinding('class.mdc-typography--headline5') isHostClass = true;
}

@Directive({
  selector: '[mdcHeadline6], [mdc-typography-title]'
})
export class MdcTypographyHeadline6 {
  @HostBinding('class.mdc-typography--headline6') isHostClass = true;
}

@Directive({
  selector: '[mdcSubtitle1], [mdc-typography-subheading2]'
})
export class MdcTypographySubtitle1 {
  @HostBinding('class.mdc-typography--subtitle1') isHostClass = true;
}

@Directive({
  selector: '[mdcSubtitle2], [mdc-typography-subheading1]'
})
export class MdcTypographySubtitle2 {
  @HostBinding('class.mdc-typography--subtitle2') isHostClass = true;
}

@Directive({
  selector: '[mdcBody2], [mdc-typography-body2]'
})
export class MdcTypographyBody2 {
  @HostBinding('class.mdc-typography--body2') isHostClass = true;
}

@Directive({
  selector: '[mdcBody1], [mdc-typography-body1]'
})
export class MdcTypographyBody1 {
  @HostBinding('class.mdc-typography--body1') isHostClass = true;
}

@Directive({
  selector: '[mdcCaption], [mdc-typography-caption]'
})
export class MdcTypographyCaption {
  @HostBinding('class.mdc-typography--caption') isHostClass = true;
}

@Directive({
  selector: '[mdcButton]'
})
export class MdcTypographyButton {
  @HostBinding('class.mdc-typography--button') isHostClass = true;
}

@Directive({
  selector: '[mdcOverline]'
})
export class MdcTypographyOverline {
  @HostBinding('class.mdc-typography--overline') isHostClass = true;
}
