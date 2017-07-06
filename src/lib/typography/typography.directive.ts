import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-typography]'
})
export class Typography {
  @HostBinding('class.mdc-typography') className: string = 'mdc-typography';
}

@Directive({
  selector: '[mdc-typography-adjust-margin]'
})
export class AdjustMarginDirective {
  @HostBinding('class.mdc-typography--adjust-margin') className: string = 'mdc-typography--adjust-margin';
}

@Directive({
  selector: '[mdc-typography-display4]'
})
export class Display4Directive {
  @HostBinding('class.mdc-typography--display4') className: string = 'mdc-typography--display4';
}

@Directive({
  selector: '[mdc-typography-display3]'
})
export class Display3Directive {
  @HostBinding('class.mdc-typography--display3') className: string = 'mdc-typography--display3';
}

@Directive({
  selector: '[mdc-typography-display2]'
})
export class Display2Directive {
  @HostBinding('class.mdc-typography--display2') className: string = 'mdc-typography--display2';
}

@Directive({
  selector: '[mdc-typography-display1]'
})
export class Display1Directive {
  @HostBinding('class.mdc-typography--display1') className: string = 'mdc-typography--display1';
}

@Directive({
  selector: '[mdc-typography-headline]'
})
export class HeadlineDirective {
  @HostBinding('class.mdc-typography--headline') className: string = 'mdc-typography--headline';
}

@Directive({
  selector: '[mdc-typography-title]'
})
export class TitleDirective {
  @HostBinding('class.mdc-typography--title') className: string = 'mdc-typography--title';
}

@Directive({
  selector: '[mdc-typography-subheading2]'
})
export class Subheading2Directive {
  @HostBinding('class.mdc-typography--subheading2') className: string = 'mdc-typography--subheading2';
}

@Directive({
  selector: '[mdc-typography-subheading1]'
})
export class Subheading1Directive {
  @HostBinding('class.mdc-typography--subheading1') className: string = 'mdc-typography--subheading1';
}

@Directive({
  selector: '[mdc-typography-body2]'
})
export class Body2Directive {
  @HostBinding('class.mdc-typography--body2') className: string = 'mdc-typography--body2';
}

@Directive({
  selector: '[mdc-typography-body1]'
})
export class Body1Directive {
  @HostBinding('class.mdc-typography--body1') className: string = 'mdc-typography--body1';
}

@Directive({
  selector: '[mdc-typography-caption]'
})
export class CaptionDirective {
  @HostBinding('class.mdc-typography--caption') className: string = 'mdc-typography--caption';
}
