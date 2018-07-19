import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

@Directive({
  selector: '[mdcImageListItem], mdc-image-list-item',
  exportAs: 'mdcImageListItem'
})
export class MdcImageListItem {
  @HostBinding('class.mdc-image-list__item') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcImageListImageAspect], mdc-image-list-image-aspect',
  exportAs: 'mdcImageListImageAspect',
  template: `
  <div class="mdc-image-list__image-aspect-container">
    <ng-content></ng-content>
  </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdcImageListImageAspect {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListImage], mdc-image-list-image',
  exportAs: 'mdcImageListImage'
})
export class MdcImageListImage {
  @HostBinding('class.mdc-image-list__image') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListSupporting], mdc-image-list-supporting',
  exportAs: 'mdcImageListSupporting',
})
export class MdcImageListSupporting {
  @HostBinding('class.mdc-image-list__supporting') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListLabel], mdc-image-list-label',
  exportAs: 'mdcImageListLabel'
})
export class MdcImageListLabel {
  @HostBinding('class.mdc-image-list__label') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-image-list], mdc-image-list',
  exportAs: 'mdcImageList',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcImageList {
  @Input()
  get masonry(): boolean { return this._masonry; }
  set masonry(value: boolean) {
    this.setMasonry(value);
  }
  protected _masonry: boolean;

  @Input()
  get textProtection(): boolean { return this._textProtection; }
  set textProtection(value: boolean) {
    this.setTextProtection(value);
  }
  protected _textProtection: boolean;

  @HostBinding('class.mdc-image-list') isHostClass = true;
  @HostBinding('class.mdc-image-list--masonry') get classMasonry(): string {
    return this.masonry ? 'mdc-image-list--masonry' : '';
  }
  @HostBinding('class.mdc-image-list--with-text-protection') get classTextProtection(): string {
    return this.textProtection ? 'mdc-image-list--with-text-protection' : '';
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  setMasonry(masonry: boolean): void {
    this._masonry = toBoolean(masonry);
    this._changeDetectorRef.markForCheck();
  }

  setTextProtection(textProtection: boolean): void {
    this._textProtection = toBoolean(textProtection);
    this._changeDetectorRef.markForCheck();
  }
}
