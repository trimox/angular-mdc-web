import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MdcCharacterCounter} from '@angular-mdc/web/form-field';
import {MdcTextField} from './text-field';

@Component({
  selector: 'mdc-textarea',
  exportAs: 'mdcTextarea',
  host: {
    'class': 'mdc-text-field',
    '[class.mdc-text-field--textarea]': 'true',
    '[class.mdc-text-field--no-label]': '!label',
    '[class.mdc-text-field--fullwidth]': 'fullwidth',
    '[class.mdc-text-field--invalid]': 'errorState'
  },
  templateUrl: 'textarea.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTextarea extends MdcTextField {
  @Input() rows?: number;
  @Input() cols?: number;

  @ViewChild(MdcCharacterCounter, {static: false}) _characterCounterElement!: MdcCharacterCounter;
}
