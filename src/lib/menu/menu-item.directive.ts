import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'mdc-menu-item'
})
export class MenuItemDirective {
  private disabled_: boolean = false;
  
  @Input() id: string;
  @Input() label: string;
  @Input() icon: string;
  @Input()
  get disabled() {
    return this.disabled_;
  }
  set disabled(value: boolean) {
    this.disabled_ = value;
    if (value) {
      this._renderer.setAttribute(this._root.nativeElement, 'aria-disabled', 'true');
      this.tabindex = -1;
    } else {
      this._renderer.removeAttribute(this._root.nativeElement, 'aria-disabled');
      this.tabindex = 0;
    }
  }
  @HostBinding('class') className: string = 'mdc-list-item';
  @HostBinding('attr.role') role: string = 'menuitem';
  @HostBinding('tabindex') tabindex: number = 0;
  itemEl: ElementRef = this._root;

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) { }
}