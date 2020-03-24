import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import {MDCComponent} from '@angular-mdc/web/base';
import {
  MDCTextFieldCharacterCounterFoundation,
  MDCTextFieldCharacterCounterAdapter
} from '@material/textfield';

@Component({
  selector: '[mdcCharacterCounter]',
  exportAs: 'mdcCharacterCounter',
  host: {
    'class': 'mdc-text-field-character-counter'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCharacterCounter extends MDCComponent<MDCTextFieldCharacterCounterFoundation> implements OnDestroy {
  get foundation(): MDCTextFieldCharacterCounterFoundation {
    return this._foundation;
  }

  getDefaultFoundation() {
    const adapter: MDCTextFieldCharacterCounterAdapter = {
      setContent: (content: string) => this.elementRef.nativeElement.textContent = content
    };
    return new MDCTextFieldCharacterCounterFoundation(adapter);
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
