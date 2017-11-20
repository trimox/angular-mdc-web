import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../common';

import { MdcListItem } from './list-item';

@Directive({
  selector: '[mdc-list-group], mdc-list-group'
})
export class MdcListGroup {
  @HostBinding('class.mdc-list-group') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-group-subheader], mdc-list-group-subheader'
})
export class MdcListGroupSubheader {
  @HostBinding('class.mdc-list-group__subheader') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: '[mdc-list-divider], mdc-list-divider',
  template: '<div class="mdc-list-divider" role="seperator"></div>',
})
export class MdcListDivider {
  private _inset: boolean = false;

  @Input()
  get inset(): boolean { return this._inset; }
  set inset(value: boolean) {
    this._inset = toBoolean(value);
    this._inset ? this._renderer.addClass(this.elementRef.nativeElement, 'mdc-list-divider--inset')
      : this._renderer.removeClass(this.elementRef.nativeElement, 'mdc-list-divider--inset');
  }

  constructor(
    public elementRef: ElementRef,
    private _renderer: Renderer2) { }
}

@Component({
  selector: 'mdc-list',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcList implements AfterContentInit, OnChanges {
  private _disableRipple: boolean = false;
  private _avatar: boolean = false;

  @Input() dense: boolean = false;
  @Input() twoLine: boolean = false;
  @Input() border: boolean = false;
  @Input()
  get avatar(): boolean { return this._avatar; }
  set avatar(value: boolean) {
    this._avatar = toBoolean(value);
  }
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = toBoolean(value);
  }
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('attr.role') role: string = 'list';
  @HostBinding('class.mdc-list--dense') get classDenseList(): string {
    return this.dense ? 'mdc-list--dense' : '';
  }
  @HostBinding('class.mdc-list--two-line') get classTwoline(): string {
    return this.twoLine ? 'mdc-list--two-line' : '';
  }
  @HostBinding('class.mdc-list--avatar-list') get classAvatarList(): string {
    return this.avatar ? 'mdc-list--avatar-list' : '';
  }
  @HostBinding('class.mdc-list--border') get classBorder(): string {
    return this.border ? 'mdc-list--border' : '';
  }
  @ContentChildren(MdcListItem) listItems: QueryList<MdcListItem>;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disableRipple = changes['disableRipple'];
    const avatar = changes['avatar'];

    if (disableRipple) {
      this._configureRipples(disableRipple.currentValue);
    }

    if (avatar) {
      this._configureAvatars(avatar.currentValue);
    }
  }

  ngAfterContentInit(): void {
    if (!this._disableRipple) {
      this._configureRipples(false);
    }

    if (this._avatar) {
      this._configureAvatars(true);
    }
  }

  isRippleDisabled(): boolean {
    return this._disableRipple;
  }

  private _configureRipples(value: boolean): void {
    if (this.listItems) {
      this.listItems.forEach(_ => {
        value ? _.ripple.destroy() : _.ripple.init();
      });
    }
  }

  private _configureAvatars(value: boolean): void {
    if (this.listItems) {
      this.listItems.forEach(_ => {
        if (_.listItemStart) {
          value ? this._renderer.addClass(_.listItemStart.elementRef.nativeElement, 'mdc-icon--avatar')
            : this._renderer.removeClass(_.listItemStart.elementRef.nativeElement, 'mdc-icon--avatar');
        }
      });
    }
  }
}
