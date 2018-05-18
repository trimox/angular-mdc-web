import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { EventRegistry } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MDCFormFieldAdapter } from '@material/form-field/adapter';
import { MDCFormFieldFoundation } from '@material/form-field';

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  template: '<ng-content></ng-content>',
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  private _label: any;

  @Input()
  get alignEnd(): boolean { return this._alignEnd; }
  set alignEnd(value: boolean) {
    this.setAlignEnd(value);
  }
  private _alignEnd: boolean;

  @HostBinding('class.mdc-form-field') isHostClass = true;
  @HostBinding('class.mdc-form-field--align-end') get classAlignEnd(): string {
    return this.alignEnd ? 'mdc-form-field--align-end' : '';
  }

  @ContentChild(MdcFormFieldControl) input: MdcFormFieldControl<any>;

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => this._registry.listen(type, handler, this._label),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._registry.unlisten(type, handler),
    activateInputRipple: () => {
      if (this.input && this.input.ripple) {
        this.input.ripple.activate();
      }
    },
    deactivateInputRipple: () => {
      if (this.input && this.input.ripple) {
        this.input.ripple.deactivate();
      }
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    if (this.input) {
      const label = this.input.elementRef.nativeElement;

      if (label.nextSibling.tagName === 'LABEL') {
        this._label = label.nextSibling;
        this._renderer.setAttribute(this._label, 'for', this.input.inputId);

        this._foundation = new MDCFormFieldFoundation(this._mdcAdapter);
        this._foundation.init();

        this._changeDetectorRef.markForCheck();
      }
    }
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  setAlignEnd(alignEnd: boolean): void {
    this._alignEnd = alignEnd;
    this._changeDetectorRef.markForCheck();
  }

  setInput(input: any): void {
    if (this.input !== input) {
      this.input = input;

      this._changeDetectorRef.markForCheck();
    }
  }

  isAlignEnd(): boolean {
    return this.alignEnd;
  }
}
