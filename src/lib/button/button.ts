import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MdcIcon } from '../icon/icon';
import { MdcRipple } from '../core/ripple/ripple.service';
import {
  toBoolean,
  KeyCodes,
  isSpaceKey
} from '../common';

@Component({
  selector: 'button[mdc-button], a[mdc-button]',
  template: '<ng-content></ng-content>',
  host: {
    '[attr.aria-disabled]': 'disabled.toString()',
  },
  providers: [MdcRipple],
})
export class MdcButton implements AfterViewInit {
  private disabled_: boolean = false;

  @Input() raised: boolean = false;
  @Input() primary: boolean = false;
  @Input() dense: boolean = false;
  @Input() compact: boolean = false;
  @Input() secondary: boolean = false;
  @Input() unelevated: boolean = false;
  @Input() stroked: boolean = false;
  @Input()
  get disabled(): boolean { return this.disabled_; }
  set disabled(value) {
    this.disabled_ = toBoolean(value);
    if (this.disabled_) {
      this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", 'true');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
    }
  }
  @Input()
  get disableRipple(): boolean { return this.ripple.disabled; }
  set disableRipple(value) {
    this.ripple.disabled = toBoolean(value);
  }
  @HostBinding('tabindex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }
  @HostBinding('class.mdc-button') isHostClass = true;
  @HostBinding('class.mdc-button--raised') get classRaised(): string {
    return this.raised ? 'mdc-button--raised' : '';
  }
  @HostBinding('class.mdc-button--primary') get classPrimary(): string {
    return this.primary ? 'mdc-button--primary' : '';
  }
  @HostBinding('class.mdc-button--secondary') get classSecondary(): string {
    return this.secondary ? 'mdc-button--secondary' : '';
  }
  @HostBinding('class.mdc-button--dense') get classDense(): string {
    return this.dense ? 'mdc-button--dense' : '';
  }
  @HostBinding('class.mdc-button--compact') get classCompact(): string {
    return this.compact ? 'mdc-button--compact' : '';
  }
  @HostBinding('class.mdc-button--unelevated') get classUnelevated(): string {
    return this.unelevated ? 'mdc-button--unelevated' : '';
  }
  @HostBinding('class.mdc-button--stroked') get classStroked(): string {
    return this.stroked ? 'mdc-button--stroked' : '';
  }
  @HostListener('click', ['$event']) onclick(evt: Event) {
    this.handleClick_(evt);
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this.handleKeyPress_(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this.handleBlur_(evt);
  }
  @ContentChild(MdcIcon) buttonIcon: MdcIcon;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) { }

  ngAfterViewInit() {
    if (this.buttonIcon) {
      this.renderer.addClass(this.buttonIcon.elementRef.nativeElement, 'mdc-button__icon');
    }
    if (!this.disableRipple) {
      this.ripple.init();
    }
  }

  private handleClick_(event: Event) {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private handleKeyPress_(keyboardEvent: KeyboardEvent) {
    let keyCode = keyboardEvent.keyCode;
    if (keyCode == KeyCodes.ENTER || isSpaceKey(keyboardEvent)) {
      this.ripple.active = true;
      if (keyCode != KeyCodes.ENTER) {
        keyboardEvent.preventDefault();
      }
    }
  }

  private handleBlur_(focusEvent: FocusEvent) {
    this.ripple.active = false;
  }
}
