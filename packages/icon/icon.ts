import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

@Component({
  moduleId: module.id,
  selector: 'mdc-icon, [mdcIcon]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcIcon',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcIcon implements OnInit {
  private _defaultFontSetClass = 'material-icons';
  private _previousFontSetClass: string;
  private _previousFontIconClass: string;
  private _previousFontSize: number | null;

  /** Font set that the icon is a part of. */
  @Input()
  get fontSet(): string { return this._fontSet; }
  set fontSet(value: string) {
    this._fontSet = this._cleanupFontValue(value);
    this._updateFontIconClasses();
  }
  protected _fontSet: string;

  /** Name of an icon within a font set. */
  @Input()
  get fontIcon(): string { return this._fontIcon; }
  set fontIcon(value: string) {
    this._fontIcon = value;
    this._updateFontIconClasses();
  }
  protected _fontIcon: string;

  @Input()
  get fontSize(): number { return this._fontSize; }
  set fontSize(value: number) {
    this.setFontSize(value);
  }
  protected _fontSize: number;

  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = toBoolean(value);
  }
  protected _leading: boolean;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = toBoolean(value);
  }
  protected _trailing: boolean;

  @Input()
  get clickable(): boolean { return this._clickable; }
  set clickable(value: boolean) {
    this.setClickable(value);
  }
  protected _clickable: boolean;

  @HostBinding('class.ng-mdc-icon') isHostClass = true;

  public foundation: any;

  constructor(
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _renderer: Renderer2,
    public elementRef: ElementRef,
    @Attribute('aria-hidden') protected ariaHidden: string) {

    if (!ariaHidden) {
      _renderer.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
    }
  }

  ngOnInit() {
    this._updateFontIconClasses();
  }

  private _updateFontIconClasses(): void {
    const el: HTMLElement = this._getHostElement();

    const fontSetClass = this.fontSet ? this.fontSet : this._getDefaultFontSetClass();

    if (fontSetClass !== this._previousFontSetClass) {
      if (this._previousFontSetClass) {
        this._renderer.removeClass(el, this._previousFontSetClass);
      }
      if (fontSetClass) {
        this._renderer.addClass(el, fontSetClass);
      }
      this._previousFontSetClass = fontSetClass;
    }

    if (this.fontIcon !== this._previousFontIconClass) {
      if (this._previousFontIconClass) {
        this._renderer.removeClass(el, this._previousFontIconClass);
      }
      if (this.fontIcon) {
        for (const iconClass of this.fontIcon.split(' ')) {
          this._renderer.addClass(el, iconClass);
        }
      }
      this._previousFontIconClass = this.fontIcon;
    }

    if (this.fontSize !== this._previousFontSize) {
      if (this._previousFontSize) {
        this._renderer.removeStyle(el, `font-size: ${this.fontSize}px`);
      }
      if (this.fontSize) {
        this._renderer.setStyle(el, 'font-size', `${this.fontSize}px`);
      }
      this._previousFontSize = this.fontSize;
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
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  setIcon(content: string): void {
    this.fontIcon ? this.fontIcon = content : this._getHostElement().textContent = content;
    this._changeDetectorRef.markForCheck();
  }

  getIcon(): string {
    return this.fontIcon ? this.fontIcon : this._getHostElement().textContent;
  }

  setFontSize(value: number): void {
    this._fontSize = value;
    this._updateFontIconClasses();
    this._changeDetectorRef.markForCheck();
  }

  setClickable(clickable: boolean): void {
    this._clickable = toBoolean(clickable);

    if (this.clickable) {
      this._renderer.setAttribute(this._getHostElement(), 'tabindex', '0');
      this._renderer.addClass(this._getHostElement(), 'ng-mdc-icon--clickable');
      this._renderer.setAttribute(this._getHostElement(), 'role', 'button');
    } else {
      this._renderer.setAttribute(this._getHostElement(), 'tabindex', '-1');
      this._renderer.removeClass(this._getHostElement(), 'ng-mdc-icon--clickable');
      this._renderer.removeAttribute(this._getHostElement(), 'role');
    }
  }
}
