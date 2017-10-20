import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  HostBinding,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'mdc-icon',
})
export class MdcIcon implements OnChanges, OnInit {
  private previousFontSetClass_: string;
  private previousFontIconClass_: string;

  @Input() svgIcon: string;
  @Input() fontSet: string = 'material-icons';
  @Input() fontIcon: string;
  @HostBinding('class.material-icons') get classMaterialIcon(): string {
    return this.fontSet == 'material-icons' ? 'material-icons' : '';
  }

  constructor(
    private renderer_: Renderer2,
    public elementRef: ElementRef) {
    renderer_.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
    if (changes.svgIcon) {
      this.clearSvgElement_();
    }

    if (this.hasFontIcon()) {
      const fontSet = changes['fontSet'] ? changes['fontSet'].currentValue : this.fontSet;
      const fontIcon = changes['fontIcon'] ? changes['fontIcon'].currentValue : this.fontIcon;
      this.updateFontIconClasses_(fontSet, fontIcon);
    }
  }

  ngOnInit() {
    // Update font classes because ngOnChanges won't be called if none of the inputs are present,
    // e.g. <mdc-icon>arrow</mdc-icon> In this case we need to add a CSS class for the default font.
    if (this.hasFontIcon()) {
      this.updateFontIconClasses_(this.fontSet, this.fontIcon);
    }
  }

  hasFontIcon(): boolean {
    return !this.svgIcon;
  }

  private setSvgElement_(svg: SVGElement) {
    this.clearSvgElement_();
    this.renderer_.appendChild(this.elementRef.nativeElement, svg);
  }

  private clearSvgElement_() {
    const layoutElement = this.elementRef.nativeElement;
    const childCount = layoutElement.childNodes.length;

    // Remove existing child nodes and add the new SVG element. Note that we can't
    // use innerHTML, because IE will throw if the element has a data binding.
    for (let i = 0; i < childCount; i++) {
      this.renderer_.removeChild(layoutElement, layoutElement.childNodes[i]);
    }
  }

  private updateFontIconClasses_(fontSet: string | null, fontIcon: string | null) {
    if (!this.hasFontIcon()) {
      return;
    }

    const elem = this.elementRef.nativeElement;

    if (fontSet != this.previousFontSetClass_) {
      if (this.previousFontSetClass_) {
        this.renderer_.removeClass(elem, this.previousFontSetClass_);
      }
      if (fontSet) {
        this.renderer_.addClass(elem, fontSet);
      }
      this.previousFontSetClass_ = fontSet;
    }

    if (this.fontIcon != this.previousFontIconClass_) {
      if (this.previousFontIconClass_) {
        this.renderer_.removeClass(elem, this.previousFontIconClass_);
      }
      if (this.fontIcon) {
        for (let iconClass of this.fontIcon.split(" ")) {
          this.renderer_.addClass(elem, iconClass);
        }
      }
      this.previousFontIconClass_ = this.fontIcon;
    }
  }
}
