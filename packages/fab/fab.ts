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
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

export type FabPosition = 'bottom-left' | 'bottom-right' | null;

@Component({
  moduleId: module.id,
  selector: 'button[mdc-fab], a[mdc-fab]',
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
    this.setExited(value);
  }
  private _exited: boolean;

  @Input()
  get extended(): boolean { return this._extended; }
  set extended(value: boolean) {
    this._extended = toBoolean(value);
  }
  private _extended: boolean;

  @Input()
  get position(): string { return this._position; }
  set position(value: string) {
    this.setPosition(value);
  }
  private _position: string;

  @Input() label: string;
  @Input() icon: string | null;
  @Input('attr.tabindex') tabIndex: number = 0;

  @HostBinding('class.mdc-fab') isHostClass = true;
  @HostBinding('class.mdc-fab--mini') get classMini(): string {
    return this.mini ? 'mdc-fab--mini' : '';
  }
  @HostBinding('class.mdc-fab--exited') get classExited(): string {
    return this.exited ? 'mdc-fab--exited' : '';
  }
  @HostBinding('class.mdc-fab--extended') get classExtended(): string {
    return this.extended ? 'mdc-fab--extended' : '';
  }

  @ContentChild(MdcIcon) fabIcon: MdcIcon;

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) { }

  ngAfterContentInit(): void {
    if (this.fabIcon) {
      this.fabIcon.elementRef.nativeElement.classList.add('mdc-fab__icon');
    }
    this._ripple.attachTo(this._getHostElement());
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  setExited(exited: boolean): void {
    this._exited = toBoolean(exited);
    this.tabIndex = exited ? -1 : this.tabIndex;
    this._changeDetectionRef.markForCheck();
  }

  setPosition(position: string): void {
    this._getHostElement().classList.remove(`mdc-fab--${this._position}`);
    this._position = position;

    if (this.position) {
      this._getHostElement().classList.add(`mdc-fab--${position}`);
    }
  }

  toggleExited(exited?: boolean): void {
    this._exited = exited != null ? exited : !this._exited;
  }

  /** Focuses the button. */
  focus(): void {
    this._getHostElement().focus();
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
