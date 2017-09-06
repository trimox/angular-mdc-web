import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MdcRipple } from '../ripple/ripple.directive';
import {
  toBoolean,
  KeyCodes,
  isSpaceKey
} from '../common';

@Component({
  selector: 'button[mdc-button], a[mdc-button]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [MdcRipple]
})
export class MdcButtonComponent {
  private disabled_: boolean = false;

  @Input() type: string;
  @Input() raised: boolean;
  @Input() primary: boolean;
  @Input() dense: boolean;
  @Input() compact: boolean;
  @Input() accent: boolean;
  @Input() unelevated: boolean;
  @Input() stroked: boolean;
  @Input()
  get disabled() { return this.disabled_; }
  set disabled(value) {
    this.disabled_ = toBoolean(value);
    if (this.disabled_) {
      this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", 'true');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
    }
  }
  @Input()
  get disableRipple() { return this.ripple.disabled; }
  set disableRipple(value) {
    this.ripple.disabled = toBoolean(value);
  }
  @HostBinding('tabindex') get tabindex(): number {
    return this.disabled ? -1 : 0;
  }
  @HostBinding('attr.type') get attrType(): string {
    return this.type ? this.type : 'button';
  }
  @HostBinding('class.mdc-button') isHostClass = true;
  @HostBinding('class.mdc-button--raised') get classRaised(): string {
    return this.raised ? 'mdc-button--raised' : '';
  }
  @HostBinding('class.mdc-button--primary') get classPrimary(): string {
    return this.primary ? 'mdc-button--primary' : '';
  }
  @HostBinding('class.mdc-button--accent') get classAccent(): string {
    return this.accent ? 'mdc-button--accent' : '';
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
  @HostListener('keypress', ['$event']) onkeypress(evt) {
    this.handleKeyPress_(evt);
  }
  @HostListener('blur', ['$event']) blur(evt) {
    this.handleBlur_(evt);
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) {
    this.ripple.init();
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
