import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';

import { MDCNotchedOutlineFoundation } from '@material/notched-outline/index';

@Component({
  moduleId: module.id,
  selector: '[mdcNotchedOutline], mdc-notched-outline',
  exportAs: 'mdcNotchedOutline',
  host: {
    'class': 'mdc-notched-outline',
    '[class.mdc-notched-outline--upgraded]': 'label',
    '[class.mdc-notched-outline--no-label]': '!label'
  },
  template: `
  <div class="mdc-notched-outline__leading"></div>
  <div #notch class="mdc-notched-outline__notch">
    <label mdcFloatingLabel [for]="for">{{label}}</label>
  </div>
  <div class="mdc-notched-outline__trailing"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcNotchedOutline {
  @Input() label?: string;
  @Input() for?: string;
  @ViewChild('notch') _notchElement!: ElementRef<HTMLElement>;
  @ViewChild(MdcFloatingLabel) floatingLabel!: MdcFloatingLabel;

  private _createAdapter() {
    return {
      addClass: (className: string) => this.elementRef.nativeElement.classList.add(className),
      removeClass: (className: string) =>
        this.elementRef.nativeElement.classList.remove(className),
      setNotchWidthProperty: (width: number) =>
        this._notchElement.nativeElement.style.setProperty('width', width > 0 ? width + 'px' : '0')
    };
  }

  private _foundation: {
    notch(notchWidth: number): void,
    closeNotch(): void
  } = new MDCNotchedOutlineFoundation(this._createAdapter());

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  /** Updates notched outline to open notch in outline path. */
  notch(notchWidth: number): void {
    this._foundation.notch(notchWidth);
  }

  /** Updates the notched outline to close notch in outline path. */
  closeNotch(): void {
    this._foundation.closeNotch();
  }
}
