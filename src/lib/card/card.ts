import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { toBoolean } from '../common';

import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcButton } from '../button/button';

@Directive({
  selector: 'mdc-card-primary'
})
export class MdcCardPrimary {
  @HostBinding('class.mdc-card__primary') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-horizontal',
})
export class MdcCardHorizontal {
  @HostBinding('class.mdc-card__horizontal-block') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-card-title], mdc-card-title'
})
export class MdcCardTitle {
  @Input() large: boolean = true;
  @HostBinding('class.mdc-card__title') isHostClass = true;
  @HostBinding('class.mdc-card__title--large') get classTitleLarge(): string {
    return this.large ? 'mdc-card__title--large' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-card-subtitle], mdc-card-subtitle'
})
export class MdcCardSubtitle {
  @HostBinding('class.mdc-card__subtitle') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-card-supporting-text], mdc-card-supporting-text'
})
export class MdcCardSupportingText {
  @HostBinding('class.mdc-card__supporting-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-card-media-item]'
})
export class MdcCardMediaItem {
  @Input() size: number;
  @HostBinding('class.mdc-card__media-item') isHostClass = true;
  @HostBinding('class.mdc-card__media-item--1dot5x') get classMediaItemOne(): string {
    return this.size === 1 ? 'mdc-card__media-item--1x' : '';
  }
  @HostBinding('class.mdc-card__media-item--1dot5x') get classMediaItemOneDotFive(): string {
    return this.size === 1.5 ? 'mdc-card__media-item--1dot5x' : '';
  }
  @HostBinding('class.mdc-card__media-item--2x') get classMediaItemTwo(): string {
    return this.size === 2 ? 'mdc-card__media-item--2x' : '';
  }
  @HostBinding('class.mdc-card__media-item--3x') get classMediaItemThree(): string {
    return this.size === 3 ? 'mdc-card__media-item--3x' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-media',
})
export class MdcCardMedia {
  @HostBinding('class.mdc-card__media') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-actions'
})
export class MdcCardActions {
  @Input() vertical: boolean = false;
  @HostBinding('class.mdc-card__actions') isHostClass = true;
  @HostBinding('class.mdc-card__actions--vertical') get classCardActionVertical(): string {
    return this.vertical ? 'mdc-card__actions--vertical' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'button[mdc-card-button], a[mdc-card-button]',
  providers: [MdcRipple]
})
export class MdcCardActionButton extends MdcButton {
  constructor(
    @Inject(Renderer2) renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(MdcRipple) ripple: MdcRipple) {
    super(renderer, elementRef, ripple);
    this.compact = true;
  }
}

@Directive({
  selector: 'mdc-card',
})
export class MdcCard {
  @HostBinding('class.mdc-card') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
