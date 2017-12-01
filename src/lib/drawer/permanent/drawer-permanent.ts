import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MdcDrawer } from '../drawer';

@Directive({
  selector: '[mdc-permanent-drawer-spacer], mdc-permanent-drawer-spacer'
})
export class MdcPermanentDrawerSpacer {
  @HostBinding('class.mdc-permanent-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-permanent-drawer-content], mdc-permanent-drawer-content'
})
export class MdcPermanentDrawerContent {
  @HostBinding('class.mdc-permanent-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-permanent-drawer',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcPermanentDrawer extends MdcDrawer {
  @Input() fixed: boolean = false;
  @HostBinding('class.mdc-permanent-drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  @HostBinding('class.mdc-permanent-drawer--fixed') get classFixed(): string {
    return this.fixed ? 'mdc-permanent-drawer--fixed' : '';
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef) {
    super(renderer, elementRef);
  }
}
