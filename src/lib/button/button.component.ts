import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
  ViewEncapsulation
} from '@angular/core';
import { Ripple } from '.././ripple/ripple.directive';
import { toBoolean } from '../common/boolean-property';
import { KeyCodes } from '../common/keycodes';
import { isSpaceKey } from '../common/events';

@Component({
  selector: 'button[mdc-button], a[mdc-button]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  providers: [Ripple]
})
export class ButtonComponent implements OnChanges {
  private _disabled: boolean = false;

  @Input() type: string;
  @Input() raised: boolean;
  @Input() primary: boolean;
  @Input() dense: boolean;
  @Input() compact: boolean;
  @Input() accent: boolean;
  @Input() cardAction: boolean;
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value) {
    this._disabled = toBoolean(value);
    if (this._disabled) {
      this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", 'true');
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
    }
  }
  @Input()
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
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
  @HostBinding('class.mdc-card__action') get classCardAction(): string {
    return this.cardAction ? 'mdc-card__action' : '';
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
    private _ripple: Ripple) {
    this._ripple.init();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['cardAction'];

    if (change) {
      if (!toBoolean(change.currentValue)) {
        this.compact = false;
      } else {
        this.compact = true;
      }
    }
  }

  private handleKeyPress_(keyboardEvent: KeyboardEvent) {
    let keyCode = keyboardEvent.keyCode;
    if (keyCode == KeyCodes.ENTER || isSpaceKey(keyboardEvent)) {
      this._ripple.active = true;
      if (keyCode != KeyCodes.ENTER) {
        keyboardEvent.preventDefault();
      }
    }
  }

  private handleBlur_(focusEvent: FocusEvent) {
    this._ripple.active = false;
  }
}
