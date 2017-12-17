import {
  ContentChildren,
  ElementRef,
  QueryList,
  Renderer2,
} from '@angular/core';
import {
  MdcListItem,
} from '@angular-mdc/web/list';

export abstract class MdcDrawer {
  @ContentChildren(MdcListItem, { descendants: true }) options: QueryList<MdcListItem>;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef) {
  }
}
