import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import {MDCRippleAdapter, MDCRippleFoundation} from '@material/ripple';

import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';

@Directive({
  selector: '[mdcTopAppBarFixedAdjust]',
  host: {'class': 'mdc-top-app-bar--fixed-adjust'}
})
export class MdcTopAppBarFixedAdjust {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: 'mdc-top-app-bar-row, [mdcTopAppBarRow]',
  exportAs: 'mdcTopAppBarRow',
  host: {'class': 'mdc-top-app-bar__row'}
})
export class MdcTopAppBarRow {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
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
  <span class="mdc-top-app-bar__title" *ngIf="title">{{title}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTopAppBarSection {
  @Input() title?: string;
  @Input() align?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcTopAppBarActionItem], mdc-top-app-bar-action-item',
  exportAs: 'mdcTopAppBarActionItem',
  host: {
    'role': 'button',
    'class': 'mdc-top-app-bar__action-item mdc-icon-button'
  },
  providers: [MdcRipple]
})
export class MdcTopAppBarActionItem implements OnDestroy, MDCRippleCapableSurface {
  _root!: Element;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) {
    this._root = elementRef.nativeElement;
    _ripple = this._createRipple();
    _ripple.init();
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      isUnbounded: () => true
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }
}

@Directive({
  selector: '[mdcTopAppBarNavIcon], mdc-icon[mdcTopAppBarNavigationIcon]',
  exportAs: 'mdcTopAppBarNavigationIcon',
  host: {
    'role': 'button',
    'class': 'mdc-top-app-bar__navigation-icon mdc-icon-button'
  },
  providers: [MdcRipple]
})
export class MdcTopAppBarNavigationIcon implements OnDestroy, MDCRippleCapableSurface {
  _root!: Element;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private _ripple: MdcRipple) {
    this._root = elementRef.nativeElement;
    _ripple = this._createRipple();
    _ripple.init();
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      isUnbounded: () => true
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }
}

@Directive({
  selector: 'mdc-top-app-bar-title, [mdcTopAppBarTitle]',
  exportAs: 'mdcTopAppBarTitle',
  host: {'class': 'mdc-top-app-bar__title'},
})
export class MdcTopAppBarTitle {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
