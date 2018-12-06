import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MdcHelperTextBase } from './helper-text';

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  host: {
    '[class.ngx-mdc-form-field--fluid]': 'fluid',
    '[class.mdc-form-field--align-end]': 'alignEnd'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  public label!: HTMLElement;

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

  @ContentChild(MdcFormFieldControl) _control!: MdcFormFieldControl<any>;
  @ContentChildren(MdcHelperTextBase) _assistiveElements!: QueryList<MdcHelperTextBase>;

  constructor(
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    if (this._control) {
      const formControl = this._control.elementRef.nativeElement;

      if (formControl.nextElementSibling) {
        if (formControl.nextElementSibling.tagName === 'LABEL') {
          this.label = formControl.nextElementSibling;
          this.label.setAttribute('for', this._control.inputId || '');

          this._loadListeners();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.label, 'click').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => {
          this._control.ripple!.activateRipple();

          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => this._control.ripple!.deactivateRipple());
          }
        })));
  }
}
