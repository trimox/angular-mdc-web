import {
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield/character-counter/index';

@Component({
  moduleId: module.id,
  selector: '[mdcCharacterCounter]',
  exportAs: 'mdcCharacterCounter',
  host: { 'class': 'mdc-text-field-character-counter' },
  template: '<ng-content></ng-content>'
})
export class MdcCharacterCounter implements OnDestroy {
  getDefaultFoundation(): any {
    const adapter: any = {
      setContent: (content: string) => this.elementRef.nativeElement.textContent = content
    };

    return new MDCTextFieldCharacterCounterFoundation(adapter);
  }

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  ngOnDestroy(): void {
    this.getDefaultFoundation().destroy();
  }
}
