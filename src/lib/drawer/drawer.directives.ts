import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[mdc-drawer-spacer], mdc-drawer-spacer'
})
export class MdcDrawerSpacer {
  @HostBinding('class.mdc-drawer__toolbar-spacer') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-drawer-header], mdc-drawer-header'
})
export class MdcDrawerHeader {
  @HostBinding('class.mdc-drawer__header') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-drawer-header-content], mdc-drawer-header-content'
})
export class MdcDrawerHeaderContent {
  @Input() primary: boolean = true;

  @HostBinding('class.mdc-drawer__header-content') isHostClass = true;
  @HostBinding('class.mdc-theme--primary-bg') get classPrimaryBackground(): string {
    return this.primary ? 'mdc-theme--primary-bg' : '';
  }
  @HostBinding('class.mdc-theme--text-primary-on-primary') get classPrimaryOnPrimary(): string {
    return this.primary ? 'mdc-theme--text-primary-on-primary' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-drawer-content], mdc-drawer-content'
})
export class MdcDrawerContent {
  @HostBinding('class.mdc-drawer__content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-drawer-navigation'
})
export class MdcDrawerNavigation {
  @HostBinding('class.mdc-drawer__drawer') isHostClass = true;
  @HostBinding('attr.role') role: string = 'navigation';

  constructor(public elementRef: ElementRef) { }
}
