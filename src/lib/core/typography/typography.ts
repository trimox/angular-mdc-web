import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-typography]'
})
export class MdcTypography {
  @HostBinding('class.mdc-typography') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-adjust-margin]'
})
export class MdcAdjustMargin {
  @HostBinding('class.mdc-typography--adjust-margin') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display4]'
})
export class MdcDisplay4 {
  @HostBinding('class.mdc-typography--display4') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display3]'
})
export class MdcDisplay3 {
  @HostBinding('class.mdc-typography--display3') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display2]'
})
export class MdcDisplay2 {
  @HostBinding('class.mdc-typography--display2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display1]'
})
export class MdcDisplay1 {
  @HostBinding('class.mdc-typography--display1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-headline]'
})
export class MdcHeadline {
  @HostBinding('class.mdc-typography--headline') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-title]'
})
export class MdcTitle {
  @HostBinding('class.mdc-typography--title') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-subheading2]'
})
export class MdcSubheading2 {
  @HostBinding('class.mdc-typography--subheading2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-subheading1]'
})
export class MdcSubheading1 {
  @HostBinding('class.mdc-typography--subheading1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-body2]'
})
export class MdcBody2 {
  @HostBinding('class.mdc-typography--body2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-body1]'
})
export class MdcBody1 {
  @HostBinding('class.mdc-typography--body1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-caption]'
})
export class MdcCaption {
  @HostBinding('class.mdc-typography--caption') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-button]'
})
export class MdcTypographyButton {
  @HostBinding('class.mdc-typography--button') isHostClass = true;
}
