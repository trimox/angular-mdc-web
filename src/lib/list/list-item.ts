import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toBoolean } from '../common';
import { MdcRipple } from '../core/ripple/ripple.service';
import { MdcList } from './list';

@Directive({
  selector: '[mdc-list-item-start]'
})
export class MdcListItemStart {
  @HostBinding('class.mdc-list-item__start-detail') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-end]'
})
export class MdcListItemEnd {
  @HostBinding('class.mdc-list-item__end-detail') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-list-item, a[mdc-list-item]',
  providers: [MdcRipple]
})
export class MdcListItem implements AfterViewInit, OnChanges {
  @Input()
  get disableRipple(): boolean { return this._ripple.disabled; }
  set disableRipple(value: boolean) {
    this._ripple.disabled = toBoolean(value);
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';
  @ContentChild(MdcListItemStart) listItemStart: MdcListItemStart;

  constructor(
    public elementRef: ElementRef,
    private _renderer: Renderer2,
    private _ripple: MdcRipple,
    @Inject(forwardRef(() => MdcList)) private _mdcList: MdcList) { }

  ngAfterViewInit(): void {
    if (this.elementRef.nativeElement.tagName === 'A') {
      this._ripple.init();
    }
    if (this.listItemStart && this._mdcList.avatar) {
      this._renderer.addClass(this.listItemStart.elementRef.nativeElement, 'mdc-icon--avatar');
    }
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    let change = changes['disableRipple'];

    if (toBoolean(change.currentValue)) {
      this._ripple.disabled = true;
    } else if (!this._mdcList.disableRipple) {
      this._ripple.disabled = false;
    }
  }
}

@Directive({
  selector: '[mdc-list-item-text], mdc-list-item-text'
})
export class MdcListItemText {
  @HostBinding('class.mdc-list-item__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-secondary], mdc-list-item-secondary'
})
export class MdcListItemTextSecondary {
  @HostBinding('class.mdc-list-item__text__secondary') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
