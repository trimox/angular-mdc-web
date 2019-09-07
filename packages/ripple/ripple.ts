import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

import {MdcRipple, MDCRippleCapableSurface} from './ripple.service';

@Component({
  selector: 'mdc-ripple, [mdc-ripple]',
  template: '<ng-content></ng-content>',
  providers: [MdcRipple],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcRippleComponent implements AfterViewInit, OnDestroy, MDCRippleCapableSurface {
  _root!: Element;

  get ripple(): MdcRipple {
    return this._ripple;
  }

  @Input()
  get attachTo(): any {
    return this._attachTo;
  }
  set attachTo(element: any) {
    if (this._attachTo) {
      this._attachTo.classList.remove('mdc-ripple-surface');
    }
    this._attachTo = element;
    if (this._attachTo) {
      this._attachTo.classList.add('mdc-ripple-surface');
    }
  }
  private _attachTo: any;

  @Input()
  get primary(): boolean {
    return this._primary;
  }
  set primary(value: boolean) {
    this._primary = coerceBooleanProperty(value);
    this._primary ? this.attachTo.classList.add('mdc-ripple-surface--primary')
      : this.attachTo.classList.remove('mdc-ripple-surface--primary');
  }
  private _primary: boolean = false;

  @Input()
  get secondary(): boolean {
    return this._secondary;
  }
  set secondary(value: boolean) {
    this._secondary = coerceBooleanProperty(value);
    this._secondary ? this.attachTo.classList.add('mdc-ripple-surface--accent')
      : this.attachTo.classList.remove('mdc-ripple-surface--accent');
  }
  private _secondary: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean = false;

  @Input()
  get unbounded(): boolean {
    return this._unbounded;
  }
  set unbounded(value: boolean) {
    this._unbounded = coerceBooleanProperty(value);
  }
  protected _unbounded: boolean = false;

  constructor(
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) {
    this._root = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this._ripple = new MdcRipple(this.elementRef);
    this._ripple.init();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }
}

@Directive({
  selector: '[mdcRipple]',
  providers: [MdcRipple]
})
export class MdcRippleDirective extends MdcRippleComponent {
  constructor(
    _ripple: MdcRipple,
    elementRef: ElementRef) {

    super(_ripple, elementRef);

    this._unbounded = true;
    this.elementRef.nativeElement.setAttribute('data-mdc-ripple-is-unbounded', '');
  }
}
