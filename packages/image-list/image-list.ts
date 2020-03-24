import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Directive({
  selector: '[mdcImageListItem], mdc-image-list-item',
  exportAs: 'mdcImageListItem',
  host: { 'class': 'mdc-image-list__item' }
})
export class MdcImageListItem {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: '[mdcImageListImageAspect], mdc-image-list-image-aspect',
  exportAs: 'mdcImageListImageAspect',
  template: `
  <div class="mdc-image-list__image-aspect-container">
    <ng-content></ng-content>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcImageListImageAspect {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListImage], mdc-image-list-image',
  exportAs: 'mdcImageListImage',
  host: { 'class': 'mdc-image-list__image' }
})
export class MdcImageListImage {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListSupporting], mdc-image-list-supporting',
  exportAs: 'mdcImageListSupporting',
  host: { 'class': 'mdc-image-list__supporting' }
})
export class MdcImageListSupporting {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcImageListLabel], mdc-image-list-label',
  exportAs: 'mdcImageListLabel',
  host: { 'class': 'mdc-image-list__label' }
})
export class MdcImageListLabel {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: '[mdc-image-list], mdc-image-list',
  exportAs: 'mdcImageList',
  host: {
    'class': 'mdc-image-list',
    '[class.mdc-image-list--masonry]': 'masonry',
    '[class.mdc-image-list--with-text-protection]': 'textProtection'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcImageList {
  @Input()
  get masonry(): boolean { return this._masonry; }
  set masonry(value: boolean) {
    this._masonry = coerceBooleanProperty(value);
  }
  private _masonry: boolean = false;

  @Input()
  get textProtection(): boolean { return this._textProtection; }
  set textProtection(value: boolean) {
    this._textProtection = coerceBooleanProperty(value);
  }
  private _textProtection: boolean = false;

  constructor(public elementRef: ElementRef) { }
}
