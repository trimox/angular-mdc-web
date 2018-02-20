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
  selector: 'mdc-card-media-content, [mdc-card-media-content]',
  exportAs: 'mdcCardMediaContent'
})
export class MdcCardMediaContent {
  @HostBinding('class.mdc-card__media-content') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-media, [mdc-card-media]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCardMedia',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCardMedia {
  private _square: boolean;
  private _image: boolean;

  @Input()
  get square(): boolean { return this._square; }
  set square(value: boolean) {
    this._square = toBoolean(value);
  }

  @Input()
  get image(): boolean { return this._image; }
  set image(value: boolean) {
    this._image = toBoolean(value);
  }

  @HostBinding('class.mdc-card__media') isHostClass = true;
  @HostBinding('class.mdc-card__media--square') get classMediaSquare() {
    return this.square ? 'mdc-card__media--square' : '';
  }
  @HostBinding('class.mdc-card__media--16-9') get classMediaImage() {
    return this.image ? 'mdc-card__media--16-9' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-primary-action, [mdc-card-primary-action]',
  exportAs: 'mdcCardPrimaryAction'
})
export class MdcCardPrimaryAction {
  @HostBinding('class.mdc-card__primary-action') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-card-actions, [mdc-card-actions]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcCardActions',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcCardActions {
  private _fullBleed: boolean;
  private _icons: boolean;
  private _buttons: boolean;

  @Input()
  get fullBleed(): boolean { return this._fullBleed; }
  set fullBleed(value: boolean) {
    this._fullBleed = toBoolean(value);
  }
  @Input()
  get buttons(): boolean { return this._buttons; }
  set buttons(value: boolean) {
    this._buttons = toBoolean(value);
  }
  @Input()
  get icons(): boolean { return this._icons; }
  set icons(value: boolean) {
    this._icons = toBoolean(value);
  }

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
  selector: 'mdc-card-action-buttons, [mdc-card-action-buttons]',
  exportAs: 'mdcCardActionButtons'
})
export class MdcCardActionButtons {
  @HostBinding('class.mdc-card__action-buttons') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-card-action-icons, [mdc-card-action-icons]',
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
  private _stroked: boolean;

  @Input()
  get stroked(): boolean { return this._stroked; }
  set stroked(value: boolean) {
    this._stroked = toBoolean(value);
  }

  @HostBinding('class.mdc-card') isHostClass = true;
  @HostBinding('class.mdc-card--stroked') get classStroked() {
    return this.stroked ? 'mdc-card--stroked' : '';
  }

  constructor(public elementRef: ElementRef) { }
}
