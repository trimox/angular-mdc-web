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
export class MdcAdjustMarginDirective {
  @HostBinding('class.mdc-typography--adjust-margin') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display4]'
})
export class MdcDisplay4Directive {
  @HostBinding('class.mdc-typography--display4') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display3]'
})
export class MdcDisplay3Directive {
  @HostBinding('class.mdc-typography--display3') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display2]'
})
export class MdcDisplay2Directive {
  @HostBinding('class.mdc-typography--display2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-display1]'
})
export class MdcDisplay1Directive {
  @HostBinding('class.mdc-typography--display1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-headline]'
})
export class MdcHeadlineDirective {
  @HostBinding('class.mdc-typography--headline') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-title]'
})
export class MdcTitleDirective {
  @HostBinding('class.mdc-typography--title') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-subheading2]'
})
export class MdcSubheading2Directive {
  @HostBinding('class.mdc-typography--subheading2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-subheading1]'
})
export class MdcSubheading1Directive {
  @HostBinding('class.mdc-typography--subheading1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-body2]'
})
export class MdcBody2Directive {
  @HostBinding('class.mdc-typography--body2') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-body1]'
})
export class MdcBody1Directive {
  @HostBinding('class.mdc-typography--body1') isHostClass = true;
}

@Directive({
  selector: '[mdc-typography-caption]'
})
export class MdcCaptionDirective {
  @HostBinding('class.mdc-typography--caption') isHostClass = true;
}
