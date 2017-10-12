import {
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChange,
} from '@angular/core';
import { MdcListItem } from './list-item.directive';
import { toBoolean } from '../common';

@Component({
  selector: 'mdc-list',
  template: `<ng-content></ng-content>`,
})
export class MdcList implements OnChanges {
  private disableRipple_: boolean = false;

  @Input() dense: boolean = false;
  @Input() twoLine: boolean = false;
  @Input() avatar: boolean = false;
  @Input() border: boolean = false;
  @Input()
  get disableRipple() { return this.disableRipple_; }
  set disableRipple(value) {
    this.disableRipple_ = toBoolean(value);
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

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['disableRipple'];

    if (change) {
      this.disableRipples(toBoolean(change.currentValue));
    }
  }

  disableRipples(value: boolean) {
    if (this.listItems) {
      this.listItems.forEach(_ => _.disableRipple = value);
    }
  }
}
