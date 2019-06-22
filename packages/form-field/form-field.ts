import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MdcHelperText } from './helper-text';

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  host: {
    '[class.ngx-mdc-form-field--fluid]': 'fluid',
    '[class.mdc-form-field--align-end]': 'alignEnd'
  },
  template: `<ng-content></ng-content>
  <ng-content select="[mdcHelperText, mdc-helper-text]"></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  public label?: HTMLElement;

  @Input()
  get fluid(): boolean { return this._fluid; }
  set fluid(value: boolean) {
    this._fluid = toBoolean(value);
  }
  private _fluid: boolean = false;

  @Input()
  get alignEnd(): boolean { return this._alignEnd; }
  set alignEnd(value: boolean) {
    this._alignEnd = toBoolean(value);
  }
  private _alignEnd: boolean = false;

  @ContentChild(MdcFormFieldControl, {static: false}) _control!: MdcFormFieldControl<any>;
  @ContentChildren(MdcHelperText, { descendants: true }) assistiveElements!: QueryList<MdcHelperText>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterContentInit(): void {
    if (this._control) {
      const control = this._control.elementRef.nativeElement;

      if (control.nextElementSibling) {
        if (control.nextElementSibling.tagName === 'LABEL') {
          this.label = control.nextElementSibling;
          if (this.label && this._control.inputId) {
            this.label!.setAttribute('for', this._control.inputId);
            this._loadListeners();
          }
        }
      }
    }

    // When assistive elements change, initialize foundation
    this.assistiveElements.changes.pipe(startWith(null), takeUntil(this._destroy))
      .subscribe(() => {
        (this.assistiveElements).forEach(helperText =>
          this._initHelperTextFoundation(helperText));
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _initHelperTextFoundation(helperText: MdcHelperText): void {
    const control = this._control;

    if (control && control.controlType) {
      control.helperText = helperText;
      this._changeDetectorRef.markForCheck();
    }
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.label!, 'click').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => {
          this._control.ripple!.activateRipple();

          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => this._control.ripple!.deactivateRipple());
          }
        })));
  }
}
