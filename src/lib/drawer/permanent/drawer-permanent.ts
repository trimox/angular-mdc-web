import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MdcDrawer } from '../drawer';

@Component({
  moduleId: module.id,
  selector: 'mdc-drawer-permanent',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcDrawerPermanent extends MdcDrawer {
  @Input() fixed: boolean = false;
  @HostBinding('class.mdc-drawer--permanent') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  @HostBinding('class.ng-mdc-drawer--permanent--fixed') get classFixed(): string {
    return this.fixed ? 'ng-mdc-drawer--permanent--fixed' : '';
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef) {
    super(renderer, elementRef);
  }
}
