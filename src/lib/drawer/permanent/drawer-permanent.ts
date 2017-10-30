import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

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

@Directive({
  selector: '[mdc-permanent-drawer-selected]'
})
export class MdcPermanentDrawerSelected {
  @HostBinding('class.mdc-permanent-drawer--selected') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-permanent-drawer',
})
export class MdcPermanentDrawer {
  @Input() fixed: boolean = false;
  @HostBinding('class.mdc-permanent-drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';
  @HostBinding('class.mdc-permanent-drawer--fixed') get classFixed(): string {
    return this.fixed ? 'mdc-permanent-drawer--fixed' : '';
  }

  constructor(public elementRef: ElementRef) { }
}
