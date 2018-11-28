import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';

@Directive({
  selector: '[mdcTopAppBarFixedAdjust]',
  host: { 'class': 'mdc-top-app-bar--fixed-adjust' }
})
export class MdcTopAppBarFixedAdjust { }

@Directive({
  selector: 'mdc-top-app-bar-row, [mdcTopAppBarRow]',
  exportAs: 'mdcTopAppBarRow',
  host: { 'class': 'mdc-top-app-bar__row' }
})
export class MdcTopAppBarRow {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-top-app-bar-section, [mdcTopAppBarSection]',
  exportAs: 'mdcTopAppBarSection',
  host: {
    'role': 'toolbar',
    'class': 'mdc-top-app-bar__section',
    '[class.mdc-top-app-bar__section--align-start]': 'align === "start"',
    '[class.mdc-top-app-bar__section--align-end]': 'align === "end"'
  },
  template: `
  <ng-content></ng-content>
  <span class="mdc-top-app-bar__title" *ngIf="title">{{title}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcTopAppBarSection {
  @Input() title?: string;
  @Input() align?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: 'mdc-icon[mdcTopAppBarActionItem], [mdcTopAppBarActionItem], mdc-top-app-bar-action-item',
  exportAs: 'mdcTopAppBarActionItem',
  host: {
    'role': 'button',
    'class': 'mdc-top-app-bar__action-item'
  },
  providers: [MdcRipple]
})
export class MdcTopAppBarActionItem implements OnDestroy {
  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) {

    this._ripple.init({ surface: this.elementRef.nativeElement, unbounded: true });
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }
}

@Directive({
  selector: 'mdc-icon[mdcTopAppBarNavIcon], [mdcTopAppBarNavIcon], mdc-icon[mdcTopAppBarNavigationIcon]',
  exportAs: 'mdcTopAppBarNavigationIcon',
  host: {
    'role': 'button',
    'class': 'mdc-top-app-bar__navigation-icon'
  },
  providers: [MdcRipple]
})
export class MdcTopAppBarNavigationIcon implements OnDestroy {
  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) {

    _ripple.init({ surface: this.elementRef.nativeElement, unbounded: true });
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }
}

@Directive({
  selector: 'mdc-top-app-bar-title, [mdcTopAppBarTitle]',
  exportAs: 'mdcTopAppBarTitle',
  host: { 'class': 'mdc-top-app-bar__title' },
})
export class MdcTopAppBarTitle {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}
