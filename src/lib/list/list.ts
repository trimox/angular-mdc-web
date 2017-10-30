import {
  Component,
  Directive,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChange,
  Renderer2,
} from '@angular/core';
import { MdcListItem } from './list-item';
import { toBoolean } from '../common';

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

@Directive({
  selector: 'mdc-list',
})
export class MdcList implements OnChanges {
  private _disableRipple: boolean = false;

  @Input() dense: boolean = false;
  @Input() twoLine: boolean = false;
  @Input() avatar: boolean = false;
  @Input() border: boolean = false;
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

  constructor(public elementRef: ElementRef) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    let change = changes['disableRipple'];

    if (change) {
      this.disableRipples(toBoolean(change.currentValue));
    }
  }

  disableRipples(value: boolean): void {
    if (this.listItems) {
      this.listItems.forEach(_ => _.disableRipple = value);
    }
  }
}
