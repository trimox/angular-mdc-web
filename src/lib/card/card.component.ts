import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Renderer2,
} from '@angular/core';
import { toBoolean } from '../common';

import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcButtonComponent } from '../button/button.component';

@Directive({
  selector: 'mdc-card-primary'
})
export class MdcCardPrimaryDirective {
  @HostBinding('class.mdc-card__primary') isHostClass = true;
}

@Directive({
  selector: 'mdc-card-horizontal',
})
export class MdcCardHorizontalComponent {
  @HostBinding('class.mdc-card__horizontal-block') isHostClass = true;
}

@Directive({
  selector: '[mdc-card-title], mdc-card-title'
})
export class MdcCardTitleDirective {
  @Input() large: boolean = true;
  @HostBinding('class.mdc-card__title') isHostClass = true;
  @HostBinding('class.mdc-card__title--large') get classTitleLarge(): string {
    return this.large ? 'mdc-card__title--large' : '';
  }
}

@Directive({
  selector: '[mdc-card-subtitle], mdc-card-subtitle'
})
export class MdcCardSubtitleComponent {
  @HostBinding('class.mdc-card__subtitle') isHostClass = true;
}

@Directive({
  selector: '[mdc-card-supporting-text], mdc-card-supporting-text'
})
export class MdcCardSupportingTextDirective {
  @HostBinding('class.mdc-card__supporting-text') isHostClass = true;
}

@Directive({
  selector: '[mdc-card-media-item]'
})
export class MdcCardMediaItemDirective {
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
}

@Component({
  selector: 'mdc-card-media',
  template: '<ng-content></ng-content>',
})
export class MdcCardMediaComponent {
  @HostBinding('class.mdc-card__media') isHostClass = true;
}

@Directive({
  selector: 'mdc-card-actions'
})
export class MdcCardActionsDirective {
  @Input() vertical: boolean;
  @HostBinding('class.mdc-card__actions') isHostClass = true;
  @HostBinding('class.mdc-card__actions--vertical') get classCardActionVertical(): string {
    return this.vertical ? 'mdc-card__actions--vertical' : '';
  }
}

@Directive({
  selector: 'button[mdc-card-button], a[mdc-card-button]',
  providers: [MdcRipple]
})
export class MdcCardActionButtonDirective extends MdcButtonComponent {
  constructor(
    @Inject(Renderer2) renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(MdcRipple) ripple: MdcRipple) {
    super(renderer, elementRef, ripple);
  }
}

@Component({
  selector: 'mdc-card',
  template: '<ng-content></ng-content>',
})
export class MdcCardComponent implements AfterContentInit {
  @HostBinding('class.mdc-card') isHostClass = true;
  @ContentChildren(MdcCardActionButtonDirective, { descendants: true }) cardButtons: QueryList<MdcCardActionButtonDirective>;

  constructor(
    private renderer_: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.cardButtons.forEach((_) => {
      this.renderer_.addClass(_.elementRef.nativeElement, 'mdc-card__action');
      _.compact = true;
    });
  }
}
