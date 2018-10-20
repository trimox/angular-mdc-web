import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

@Directive({
  selector: 'mdc-fab-label, [mdcFabLabel]',
  host: { 'class': 'mdc-fab__label' }
})
export class MdcFabLabel { }

@Component({
  moduleId: module.id,
  selector: 'button[mdc-fab], a[mdc-fab]',
  host: {
    '[attr.tabindex]': 'exited ? -1 : 0',
    'class': 'mdc-fab',
    '[class.mdc-fab--mini]': 'mini',
    '[class.mdc-fab--exited]': 'exited',
    '[class.mdc-fab--extended]': 'extended'
  },
  template: `
  <ng-content></ng-content>
  <mdc-icon class="mdc-fab__icon" *ngIf="icon">{{icon}}</mdc-icon>
  <span class="mdc-fab__label" *ngIf="label">{{label}}</span>
  `,
  providers: [MdcRipple],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFab implements AfterContentInit, OnDestroy {
  @Input()
  get mini(): boolean { return this._mini; }
  set mini(value: boolean) {
    this._mini = toBoolean(value);
  }
  private _mini: boolean;

  @Input()
  get exited(): boolean { return this._exited; }
  set exited(value: boolean) {
    this._exited = toBoolean(value);
    this._changeDetectionRef.markForCheck();
  }
  private _exited: boolean;

  @Input()
  get extended(): boolean { return this._extended; }
  set extended(value: boolean) {
    this._extended = toBoolean(value);
  }
  private _extended: boolean;

  @Input()
  get position(): string | null { return this._position; }
  set position(value: string | null) {
    if (this._position) {
      this._getHostElement().classList.remove(`ng-mdc-fab--${this._convertPosition(this._position)}`);
    }
    if (value) {
      this._getHostElement().classList.add(`ng-mdc-fab--${this._convertPosition(value)}`);
    }
    this._position = value;
  }
  private _position: string | null;

  @Input() label: string;
  @Input() icon: string | null;

  @ContentChild(MdcIcon) fabIcon: MdcIcon;

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    if (this.fabIcon) {
      this.fabIcon.elementRef.nativeElement.classList.add('mdc-fab__icon');
    }
    this._ripple.init({ surface: this._getHostElement() });
  }

  private _convertPosition(position: string): string | null {
    if (position === 'bottomLeft') {
      return 'bottom-left';
    } else if (position === 'bottomRight') {
      return 'bottom-right';
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  toggleExited(exited?: boolean): void {
    this._exited = exited ? exited : !this._exited;
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
