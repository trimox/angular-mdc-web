import {
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  QueryList,
  Renderer2,
} from '@angular/core';
import { MdcListItem } from '@angular-mdc/web/list';

@Directive({
  selector: '[mdc-drawer-spacer], mdc-drawer-spacer'
})
export class MdcDrawerSpacer {
  @HostBinding('class.mdc-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-drawer-content], mdc-drawer-content'
})
export class MdcDrawerContent {
  @HostBinding('class.mdc-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

export abstract class MdcDrawer {
  @ContentChildren(MdcListItem, { descendants: true }) options: QueryList<MdcListItem>;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef) {
  }
}
