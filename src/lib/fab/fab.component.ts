import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MdcIcon } from '../icon/icon';
import { MdcRipple } from '../core/ripple/ripple.service';
import {
  toBoolean,
  KeyCodes,
  isSpaceKey
} from '../common';

export type FabPosition = 'bottom-left' | 'bottom-right' | null;

@Component({
  selector: 'button[mdc-fab], a[mdc-fab]',
  template: '<ng-content></ng-content>',
  providers: [MdcRipple]
})
export class MdcFabComponent implements AfterViewInit {
  private exited_: boolean = false;
  private position_: FabPosition = null;

  @Input() mini: boolean = false;
  @Input()
  get exited(): boolean { return this.exited_; }
  set exited(value: boolean) {
    this.exited_ = toBoolean(value);
  }
  @Input()
  get position(): FabPosition { return this.position_; }
  set position(value: FabPosition) {
    if (value !== this.position_) {
      if (value) {
        this.renderer_.addClass(this.elementRef.nativeElement, `mdc-fab--${value}`);
      } else {
        this.renderer_.removeClass(this.elementRef.nativeElement, `mdc-fab--${this.position_}`);
      }
      this.position_ = value;
    }
  }
  @Input('attr.tabindex') tabIndex: number = 0;
  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    this.tabIndex = this.exited_ ? -1 : this.tabIndex;
    return this.exited_ ? 'mdc-fab--exited' : '';
  }
  @HostListener('keypress', ['$event']) onkeypress(evt: KeyboardEvent) {
    this.handleKeyPress(evt);
  }
  @HostListener('blur', ['$event']) blur(evt: FocusEvent) {
    this.handleBlur(evt);
  }
  @ContentChild(MdcIcon) fabIcon: MdcIcon;

  constructor(
    private renderer_: Renderer2,
    public elementRef: ElementRef,
    private ripple_: MdcRipple) {
    this.ripple_.init();
  }

  ngAfterViewInit() {
    if (this.fabIcon) {
      this.renderer_.addClass(this.fabIcon.elementRef.nativeElement, 'mdc-fab__icon');
      if (this.fabIcon.hasFontIcon()) {
        this.renderer_.addClass(this.elementRef.nativeElement, 'mdc-fab__icon--size');
      }
    }
  }

  toggleExited(exited?: boolean): void {
    this.exited_ = exited != null ? exited : !this.exited_;
  }

  private handleKeyPress(keyboardEvent: KeyboardEvent) {
    let keyCode = keyboardEvent.keyCode;
    if (keyCode == KeyCodes.ENTER || isSpaceKey(keyboardEvent)) {
      this.ripple_.active = true;
      if (keyCode != KeyCodes.ENTER) {
        keyboardEvent.preventDefault();
      }
    }
  }

  private handleBlur(focusEvent: FocusEvent) {
    this.ripple_.active = false;
  }
}
