import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

@Directive({
  selector: 'mdc-card-media-content, [mdcCardMediaContent]',
  exportAs: 'mdcCardMediaContent',
  host: { 'class': 'mdc-card__media-content' }
})
export class MdcCardMediaContent {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-media, [mdcCardMedia]',
  exportAs: 'mdcCardMedia',
  host: {
    'class': 'mdc-card__media',
    '[class.mdc-card__media--square]': 'square',
    '[class.mdc-card__media--16-9]': 'wide'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCardMedia {
  @Input()
  get square(): boolean { return this._square; }
  set square(value: boolean) {
    this._square = toBoolean(value);
  }
  private _square: boolean = false;

  @Input()
  get wide(): boolean { return this._wide; }
  set wide(value: boolean) {
    this._wide = toBoolean(value);
  }
  private _wide: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-primary-action, [mdcCardPrimaryAction]',
  exportAs: 'mdcCardPrimaryAction',
  host: { 'class': 'mdc-card__primary-action' },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MdcRipple]
})
export class MdcCardPrimaryAction implements OnDestroy {
  constructor(
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) {

    this._ripple.init({ surface: this.elementRef.nativeElement });
  }

  ngOnDestroy(): void {
    this._ripple.destroy();
  }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-actions, [mdcCardActions]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCardActions',
  host: {
    'class': 'mdc-card__actions',
    '[class.mdc-card__actions--full-bleed]': 'fullBleed'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCardActions {
  @Input()
  get fullBleed(): boolean { return this._fullBleed; }
  set fullBleed(value: boolean) {
    this._fullBleed = toBoolean(value);
  }
  private _fullBleed: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: 'mdc-card-action-buttons, [mdcCardActionButtons]',
  exportAs: 'mdcCardActionButtons',
  host: { 'class': 'mdc-card__action-buttons' }
})
export class MdcCardActionButtons {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: 'mdc-card-action-icons, [mdcCardActionIcons]',
  exportAs: 'mdcCardActionIcons',
  host: { 'class': 'mdc-card__action-icons' }
})
export class MdcCardActionIcons {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcCardAction]',
  host: { 'class': 'mdc-card__action' }
})
export class MdcCardAction {
  @Input('mdcCardAction')
  get action(): string { return this._action; }
  set action(action: string) {
    // If the directive is set without a name (updated programatically), then this setter will
    // trigger with an empty string and should not overwrite the programatically set value.
    if (!action) { return; }

    if (action === 'button') {
      this.elementRef.nativeElement.classList.remove('mdc-card__action--icon');
      this.elementRef.nativeElement.classList.add('mdc-card__action--button');
    } else if (action === 'icon') {
      this.elementRef.nativeElement.classList.remove('mdc-card__action--button');
      this.elementRef.nativeElement.classList.add('mdc-card__action--icon');
      this.elementRef.nativeElement.setAttribute('tabIndex', '0');
      this.elementRef.nativeElement.setAttribute('role', 'button');
    }
    this._action = action;
  }
  private _action: string = '';

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card',
  exportAs: 'mdcCard',
  host: {
    'class': 'mdc-card',
    '[class.mdc-card--outlined]': 'outlined'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCard {
  @Input()
  get outlined(): boolean { return this._outlined; }
  set outlined(value: boolean) {
    this._outlined = toBoolean(value);
  }
  private _outlined: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}
