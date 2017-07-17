import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { ListComponent } from './list.component';
import { Ripple } from '../ripple/ripple.directive';
import { toBoolean } from '../common/boolean-property';

@Directive({
  selector: 'mdc-list-item, a[mdc-list-item]',
  providers: [Ripple]
})
export class ListItemDirective implements AfterViewInit, OnChanges {
  @Input()
  get disableRipple() { return this._ripple.disabled; }
  set disableRipple(value) {
    this._ripple.disabled = toBoolean(value);
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';

  constructor(
    private elementRef: ElementRef,
    private _ripple: Ripple,
    @Inject(forwardRef(() => ListComponent)) private _parent: ListComponent) { }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.tagName === 'A') {
      this._ripple.disabled = false;
    }
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['disableRipple'];

    if (toBoolean(change.currentValue)) {
      this._ripple.disabled = true;
    } else if (!this._parent.disableRipple) {
      this._ripple.disabled = false;
    }
  }
}

@Directive({
  selector: '[mdc-list-item-start]'
})
export class ListItemStartDirective {
  @HostBinding('class.mdc-list-item__start-detail') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-end]'
})
export class ListItemEndDirective {
  @HostBinding('class.mdc-list-item__end-detail') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-text]'
})
export class ListItemTextDirective {
  @HostBinding('class.mdc-list-item__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-secondary]'
})
export class ListItemTextSecondaryDirective {
  @HostBinding('class.mdc-list-item__text__secondary') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
