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
import { MdcList } from './list.component';

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
  get disableRipple() { return this.ripple_.disabled; }
  set disableRipple(value) {
    this.ripple_.disabled = toBoolean(value);
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';
  @ContentChild(MdcListItemStart) listItemStart: MdcListItemStart;

  constructor(
    public elementRef: ElementRef,
    private renderer_: Renderer2,
    private ripple_: MdcRipple,
    @Inject(forwardRef(() => MdcList)) private mdcList_: MdcList) { }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.tagName === 'A') {
      this.ripple_.init();
    }
    if (this.listItemStart && this.mdcList_.avatar) {
      this.renderer_.addClass(this.listItemStart.elementRef.nativeElement, 'mdc-icon--avatar');
    }
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['disableRipple'];

    if (toBoolean(change.currentValue)) {
      this.ripple_.disabled = true;
    } else if (!this.mdcList_.disableRipple) {
      this.ripple_.disabled = false;
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
