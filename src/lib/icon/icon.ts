import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'mdc-icon',
})
export class MdcIcon implements OnChanges, OnInit {
  private _previousFontSetClass: string;
  private _previousFontIconClass: string;

  @Input() fontSet: string = 'material-icons';
  @Input() fontIcon: string;
  @HostBinding('class.material-icons') get classMaterialIcon(): string {
    return this.fontSet == 'material-icons' ? 'material-icons' : '';
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) {
    _renderer.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
  }

  ngOnChanges(changes: SimpleChanges) {
    const fontSet = changes['fontSet'] ? changes['fontSet'].currentValue : this.fontSet;
    const fontIcon = changes['fontIcon'] ? changes['fontIcon'].currentValue : this.fontIcon;
    this._updateFontIconClasses(fontSet, fontIcon);
  }

  ngOnInit() {
    this._updateFontIconClasses(this.fontSet, this.fontIcon);
  }

  private _updateFontIconClasses(fontSet: string | null, fontIcon: string | null): void {
    const elem = this.elementRef.nativeElement;

    if (fontSet != this._previousFontSetClass) {
      if (this._previousFontSetClass) {
        this._renderer.removeClass(elem, this._previousFontSetClass);
      }
      if (fontSet) {
        this._renderer.addClass(elem, fontSet);
      }
      this._previousFontSetClass = fontSet;
    }

    if (this.fontIcon != this._previousFontIconClass) {
      if (this._previousFontIconClass) {
        this._renderer.removeClass(elem, this._previousFontIconClass);
      }
      if (this.fontIcon) {
        for (let iconClass of this.fontIcon.split(" ")) {
          this._renderer.addClass(elem, iconClass);
        }
      }
      this._previousFontIconClass = this.fontIcon;
    }
  }
}
