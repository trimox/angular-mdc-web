import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

@Directive({
  selector: 'mdc-card-media-content, [mdcCardMediaContent]',
  exportAs: 'mdcCardMediaContent'
})
export class MdcCardMediaContent {
  @HostBinding('class.mdc-card__media-content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-media, [mdcCardMedia]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCardMedia',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCardMedia {
  @Input()
  get square(): boolean { return this._square; }
  set square(value: boolean) {
    this.setSquare(value);
  }
  private _square: boolean;

  @Input()
  get wide(): boolean { return this._wide; }
  set wide(value: boolean) {
    this.setWide(value);
  }
  private _wide: boolean;

  @HostBinding('class.mdc-card__media') isHostClass = true;
  @HostBinding('class.mdc-card__media--square') get classSquare() {
    return this.square ? 'mdc-card__media--square' : '';
  }
  @HostBinding('class.mdc-card__media--16-9') get classWide() {
    return this._wide ? 'mdc-card__media--16-9' : '';
  }

  constructor(public elementRef: ElementRef) { }

  setWide(wide: boolean): void {
    this._wide = wide;
  }

  setSquare(square: boolean): void {
    this._square = square;
  }
}

@Directive({
  selector: 'mdc-card-primary-action, [mdcCardPrimaryAction]',
  exportAs: 'mdcCardPrimaryAction'
})
export class MdcCardPrimaryAction {
  @HostBinding('class.mdc-card__primary-action') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-actions, [mdcCardActions]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCardActions',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCardActions {
  @Input()
  get fullBleed(): boolean { return this._fullBleed; }
  set fullBleed(value: boolean) {
    this._fullBleed = toBoolean(value);
  }
  private _fullBleed: boolean;

  @Input()
  get buttons(): boolean { return this._buttons; }
  set buttons(value: boolean) {
    this._buttons = toBoolean(value);
  }
  private _buttons: boolean;

  @Input()
  get icons(): boolean { return this._icons; }
  set icons(value: boolean) {
    this._icons = toBoolean(value);
  }
  private _icons: boolean;

  @HostBinding('class.mdc-card__actions') isHostClass = true;
  @HostBinding('class.mdc-card__actions--full-bleed') get classFullBleed() {
    return this.fullBleed ? 'mdc-card__actions--full-bleed' : '';
  }
  @HostBinding('class.mdc-card__action-buttons') get classActionButtons() {
    return this.buttons ? 'mdc-card__action-buttons' : '';
  }
  @HostBinding('class.mdc-card__action-icons') get classActionIcons() {
    return this.icons ? 'mdc-card__action-icons' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-action-buttons, [mdcCardActionButtons]',
  exportAs: 'mdcCardActionButtons'
})
export class MdcCardActionButtons {
  @HostBinding('class.mdc-card__action-buttons') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-action-icons, [mdcCardActionIcons]',
  exportAs: 'mdcCardActionIcons'
})
export class MdcCardActionIcons {
  @HostBinding('class.mdc-card__action-icons') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcCardAction]'
})
export class MdcCardAction {
  @Input('mdcCardAction')
  get action(): string { return this._action; }
  set action(action: string) {
    // If the directive is set without a name (updated programatically), then this setter will
    // trigger with an empty string and should not overwrite the programatically set value.
    if (!action) { return; }

    if (action === 'button') {
      this._renderer.addClass(this.elementRef.nativeElement, 'mdc-card__action--button');
    } else if (action === 'icon') {
      this._renderer.addClass(this.elementRef.nativeElement, 'mdc-card__action--icon');
      this._renderer.setAttribute(this.elementRef.nativeElement, 'tabIndex', '0');
      this._renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
    }

    this._action = action;
  }
  _action: string;

  @HostBinding('class.mdc-card__action') isHostClass = true;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card, [mdc-card]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCard',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCard {
  @Input()
  get stroked(): boolean { return this._stroked; }
  set stroked(value: boolean) {
    this.setStroked(value);
  }
  private _stroked: boolean;

  @HostBinding('class.mdc-card') isHostClass = true;
  @HostBinding('class.mdc-card--stroked') get classStroked() {
    return this.stroked ? 'mdc-card--stroked' : '';
  }

  constructor(public elementRef: ElementRef) { }

  setStroked(stroked: boolean): void {
    this._stroked = stroked;
  }
}
