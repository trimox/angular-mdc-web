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
  private _previousFontSetClass: string;
  private _previousFontIconClass: string;
  private _previousFontSize: number | null;

  @Input() fontSet: string = 'material-icons';
  @Input() fontIcon: string;
  @Input() fontSize: number | null;
  @HostBinding('class.ng-mdc-icon') isHostClass = true;
  @HostBinding('class.material-icons') get classMaterialIcon(): string {
    return this.fontSet === 'material-icons' ? 'material-icons' : '';
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    @Attribute('aria-hidden') ariaHidden: string) {

    if (!ariaHidden) {
      _renderer.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const fontSize = changes['fontSize'] ? changes['fontSize'].currentValue : this.fontSize;
    const fontSet = changes['fontSet'] ? changes['fontSet'].currentValue : this.fontSet;
    const fontIcon = changes['fontIcon'] ? changes['fontIcon'].currentValue : this.fontIcon;
    this._updateFontIconClasses(fontSet, fontIcon, fontSize);
  }

  ngOnInit() {
    this._updateFontIconClasses(this.fontSet, this.fontIcon, this.fontSize);
  }

  private _updateFontIconClasses(fontSet: string | null, fontIcon: string | null, fontSize: number | null): void {
    const el = this.elementRef.nativeElement;

    if (fontSet !== this._previousFontSetClass) {
      if (this._previousFontSetClass) {
        this._renderer.removeClass(el, this._previousFontSetClass);
      }
      if (fontSet) {
        this._renderer.addClass(el, fontSet);
      }
      this._previousFontSetClass = fontSet;
    }

    if (fontIcon !== this._previousFontIconClass) {
      if (this._previousFontIconClass) {
        this._renderer.removeClass(el, this._previousFontIconClass);
      }
      if (fontIcon) {
        for (const iconClass of fontIcon.split(' ')) {
          this._renderer.addClass(el, iconClass);
        }
      }
      this._previousFontIconClass = fontIcon;
    }

    if (fontSize !== this._previousFontSize) {
      if (this._previousFontSize) {
        this._renderer.removeStyle(el, `font-size: ${fontSize}px`);
      }
      if (fontSize) {
        this._renderer.setStyle(el, 'font-size', `${fontSize}px`);
      }
      this._previousFontSize = fontSize;
    }
  }
}
