import {
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { ListItemDirective } from './list-item.directive';
import { toBoolean } from '../common';

@Component({
  selector: 'mdc-list',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnChanges {
  private _disableRipple: boolean = false;

  @Input() dense: boolean;
  @Input() twoLine: boolean;
  @Input() avatar: boolean;
  @Input()
  get disableRipple() { return this._disableRipple; }
  set disableRipple(value) {
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
  @ContentChildren(ListItemDirective) listItems: QueryList<ListItemDirective>;

  constructor(private _root: ElementRef) { }

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
