import {Directive} from '@angular/core';

@Directive({
  selector: '[mdcDrawerTitle]',
  host: {'class': 'mdc-drawer__title'}
})
export class MdcDrawerTitle {}

@Directive({
  selector: '[mdcDrawerSubtitle]',
  host: {'class': 'mdc-drawer__subtitle'}
})
export class MdcDrawerSubtitle {}

@Directive({
  selector: 'mdc-drawer-content, [mdcDrawerContent]',
  host: {'class': 'mdc-drawer__content'}
})
export class MdcDrawerContent {}

@Directive({
  selector: 'mdc-drawer-app-content, [mdcDrawerAppContent]',
  host: {'class': 'mdc-drawer-app-content'}
})
export class MdcDrawerAppContent {}
