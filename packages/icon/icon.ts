import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

@Component({
  moduleId: module.id,
  selector: 'mdc-icon, [mdcIcon]',
  exportAs: 'mdcIcon',
  host: {
    '[attr.role]': 'role',
    '[attr.tabindex]': 'tabIndex',
    'class': 'ng-mdc-icon',
    '[class.ng-mdc-icon--clickable]': 'clickable'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcIcon implements OnInit {
  private _defaultFontSetClass = 'material-icons';
  private _previousFontSetClass: string;
  private _previousFontIconClass: string;

  @Input() role: string | null = 'img';
  @Input() tabIndex: number | null;

  /** Name of the icon in the SVG icon set. */
  @Input() svgIcon: string;

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
  get clickable(): boolean { return this._clickable; }
  set clickable(value: boolean) {
    this.setClickable(value);
  }
  protected _clickable: boolean;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string) {

    if (!ariaHidden) {
      this._getHostElement().setAttribute('aria-hidden', 'true');
    }
  }

  ngOnInit(): void {
    this._updateFontIconClasses();
  }

  setIcon(content: string): void {
    this.fontIcon ? this.fontIcon = content : this._getHostElement().textContent = content;
  }

  getIcon(): string | null {
    return this.fontIcon ? this.fontIcon : this._getHostElement().textContent;
  }

  setClickable(clickable: boolean): void {
    this._clickable = toBoolean(clickable);

    if (this.clickable) {
      this.tabIndex = 0;
      this.role = 'button';
    } else {
      this.tabIndex = null;
      this.role = null;
    }
  }

  /** Splits an svgIcon binding value into its icon set and icon name components. */
  private _splitIconName(iconName: string): [string, string] {
    if (!iconName) {
      return ['', ''];
    }
    const parts = iconName.split(':');
    switch (parts.length) {
      case 1: return ['', parts[0]]; // Use default namespace.
      case 2: return <[string, string]>parts;
      default: throw Error(`Invalid icon name: "${iconName}"`);
    }
  }

  private _usingFontIcon(): boolean {
    return !this.svgIcon;
  }

  private _updateFontIconClasses(): void {
    if (!this._usingFontIcon()) {
      return;
    }

    const el: HTMLElement = this._getHostElement();

    const fontSetClass = this.fontSet ? this.fontSet : this._getDefaultFontSetClass();

    if (fontSetClass !== this._previousFontSetClass) {
      if (this._previousFontSetClass) {
        this._getHostElement().classList.remove(this._previousFontSetClass);
      }
      if (fontSetClass) {
        this._getHostElement().classList.add(fontSetClass);
      }
      this._previousFontSetClass = fontSetClass;
    }

    if (this.fontIcon !== this._previousFontIconClass) {
      if (this._previousFontIconClass) {
        this._getHostElement().classList.remove(this._previousFontIconClass);
      }
      if (this.fontIcon) {
        for (const iconClass of this.fontIcon.split(' ')) {
          this._getHostElement().classList.add(iconClass);
        }
      }
      this._previousFontIconClass = this.fontIcon;
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
}
