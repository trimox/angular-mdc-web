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
  selector: 'mdc-app-bar-row, [mdcAppBarRow]',
  exportAs: 'mdcAppBarRow'
})
export class MdcAppBarRow {
  @HostBinding('class.mdc-top-app-bar__row') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-app-bar-section, [mdcAppBarSection]',
  exportAs: 'mdcAppBarSection',
  template: `
  <ng-content></ng-content>
  <span class="mdc-top-app-bar__title" *ngIf="title">{{title}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcAppBarSection {
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
  selector: 'mdc-icon[mdcAppBarActionItem], [mdcAppBarActionItem], mdc-app-bar-action-item',
  exportAs: 'mdcAppBarActionItem',
  providers: [MdcRipple]
})
export class MdcAppBarActionItem {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('class.mdc-top-app-bar__action-item') isHostClass = true;

  constructor(
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {

    _ripple.attachTo(this.elementRef.nativeElement, true);
  }
}

@Directive({
  selector: 'mdc-icon[mdcAppBarNavIcon], [mdcAppBarNavIcon], mdc-icon[mdcAppBarNavigationIcon]',
  exportAs: 'mdcAppBarNavigationIcon',
  providers: [MdcRipple]
})
export class MdcAppBarNavigationIcon {
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
  selector: 'mdc-app-bar-title, [mdcAppBarTitle]',
  exportAs: 'mdcAppBarTitle'
})
export class MdcAppBarTitle {
  @HostBinding('class.mdc-top-app-bar__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
