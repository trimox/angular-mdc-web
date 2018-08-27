import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';

@Directive({
  selector: 'mdc-top-app-bar-row, [mdcTopAppBarRow]',
  exportAs: 'mdcTopAppBarRow'
})
export class MdcTopAppBarRow {
  @HostBinding('class.mdc-top-app-bar__row') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-top-app-bar-section, [mdcTopAppBarSection]',
  exportAs: 'mdcTopAppBarSection',
  template: `
  <ng-content></ng-content>
  <span class="mdc-top-app-bar__title" *ngIf="title">{{title}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTopAppBarSection {
  @Input() title: string;
  @Input() align: string;

  @HostBinding('class.mdc-top-app-bar__section') isHostClass = true;
  @HostBinding('attr.role') role: string = 'toolbar';
  @HostBinding('class.mdc-top-app-bar__section--align-start') get classAlignStart(): string {
    return this.align === 'start' ? 'mdc-top-app-bar__section--align-start' : '';
  }
  @HostBinding('class.mdc-top-app-bar__section--align-end') get classAlignEnd(): string {
    return this.align === 'end' ? 'mdc-top-app-bar__section--align-end' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-icon[mdcTopAppBarActionItem], [mdcTopAppBarActionItem], mdc-top-app-bar-action-item',
  exportAs: 'mdcTopAppBarActionItem',
  providers: [MdcRipple]
})
export class MdcTopAppBarActionItem {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('class.mdc-top-app-bar__action-item') isHostClass = true;

  constructor(
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {

    _ripple.attachTo(this.elementRef.nativeElement, true);
  }
}

@Directive({
  selector: 'mdc-icon[mdcTopAppBarNavIcon], [mdcTopAppBarNavIcon], mdc-icon[mdcTopAppBarNavigationIcon]',
  exportAs: 'mdcTopAppBarNavigationIcon',
  providers: [MdcRipple]
})
export class MdcTopAppBarNavigationIcon {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('class.mdc-top-app-bar__navigation-icon') isHostClass = true;

  constructor(
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {

    _ripple.attachTo(this.getHostElement(), true);
  }

  /** Retrieves the DOM element of the directive. */
  getHostElement() {
    return this.elementRef.nativeElement;
  }
}

@Directive({
  selector: 'mdc-top-app-bar-title, [mdcTopAppBarTitle]',
  exportAs: 'mdcTopAppBarTitle'
})
export class MdcTopAppBarTitle {
  @HostBinding('class.mdc-top-app-bar__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
