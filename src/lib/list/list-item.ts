import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { EventRegistry } from '../common/event-registry';
import { MdcRipple } from '../core/ripple/ripple.service';

import { MdcList } from './list';

export interface MdcListItemActivate {
  event: MouseEvent | KeyboardEvent;
  item: MdcListItem;
}

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

@Component({
  selector: 'mdc-list-item, a[mdc-list-item]',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class MdcListItem {
  private _selected: boolean = false;
  private _active: boolean = false;

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    if (this._active !== value) {
      this._active = value;
    }
  }
  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';
  @HostBinding('class.mdc-drawer--selected') get classSelected() {
    return this._active ? 'mdc-drawer--selected' : '';
  }
  @Output() activate = new EventEmitter<MdcListItemActivate>();
  @ContentChild(MdcListItemStart) listItemStart: MdcListItemStart;

  /** Whether or not the option is currently selected. */
  get selected(): boolean { return this._selected; }

  /** Selects the option. */
  select(): void {
    this._selected = true;
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
  }

  @HostListener('click', ['$event']) onclick(evt: MouseEvent) {
    this.activate.emit({ event: evt, item: this });
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) { }

  hasClass(className: string): boolean {
    return this._renderer.parentNode(this.elementRef.nativeElement).classList.contains(className);
  }

  isActive(): boolean {
    return this._active;
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
