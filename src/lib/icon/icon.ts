import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'mdc-icon',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcIcon',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class MdcIcon implements OnChanges, OnInit {
  private _defaultFontSetClass = 'material-icons';
  private _previousFontSetClass: string;
  private _previousFontIconClass: string;
  private _previousFontSize: number | null;

  /** Font set that the icon is a part of. */
  @Input()
  get fontSet(): string { return this._fontSet; }
  set fontSet(value: string) {
    this._fontSet = this._cleanupFontValue(value);
  }
  private _fontSet: string;

  /** Name of an icon within a font set. */
  @Input()
  get fontIcon(): string { return this._fontIcon; }
  set fontIcon(value: string) {
    this._fontIcon = value;
  }
  private _fontIcon: string;

  @Input() fontSize: number | null;

  constructor(
    protected _renderer: Renderer2,
    public elementRef: ElementRef,
    @Attribute('aria-hidden') protected ariaHidden: string) {

    if (!ariaHidden) {
      _renderer.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const fontSize = changes['fontSize'] ? changes['fontSize'].currentValue : this.fontSize;

    this._updateFontIconClasses(fontSize);
  }

  ngOnInit() {
    this._updateFontIconClasses(this.fontSize);
  }

  private _updateFontIconClasses(fontSize: number | null): void {
    const el: HTMLElement = this._getHostElement();

    const fontSetClass = this.fontSet ? this.fontSet : this._getDefaultFontSetClass();

    if (fontSetClass !== this._previousFontSetClass) {
      if (this._previousFontSetClass) {
        this.getRenderer().removeClass(el, this._previousFontSetClass);
      }
      if (fontSetClass) {
        this.getRenderer().addClass(el, fontSetClass);
      }
      this._previousFontSetClass = fontSetClass;
    }

    if (this.fontIcon !== this._previousFontIconClass) {
      if (this._previousFontIconClass) {
        this.getRenderer().removeClass(el, this._previousFontIconClass);
      }
      if (this.fontIcon) {
        for (const iconClass of this.fontIcon.split(' ')) {
          this.getRenderer().addClass(el, iconClass);
        }
      }
      this._previousFontIconClass = this.fontIcon;
    }

    if (fontSize !== this._previousFontSize) {
      if (this._previousFontSize) {
        this.getRenderer().removeStyle(el, `font-size: ${fontSize}px`);
      }
      if (fontSize) {
        this.getRenderer().setStyle(el, 'font-size', `${fontSize}px`);
      }
      this._previousFontSize = fontSize;
    }
  }

  private _getDefaultFontSetClass(): string {
    return this._defaultFontSetClass;
  }

  /**
     * Cleans up a value to be used as a fontIcon or fontSet.
     * Since the value ends up being assigned as a CSS class, we
     * have to trim the value and omit space-separated values.
     */
  private _cleanupFontValue(value: string) {
    return typeof value === 'string' ? value.trim().split(' ')[0] : value;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  /** Retrieves the renderer of the component host. */
  getRenderer(): Renderer2 {
    return this._renderer;
  }
}
