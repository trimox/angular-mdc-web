import {
  Directive,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: 'mdc-card-actions'
})
export class CardActionsDirective {
  @Input() vertical: boolean;
  @HostBinding('class.mdc-card__actions') className: string = 'mdc-card__actions';
  @HostBinding('class.mdc-card__actions--vertical') get classCardActionVertical(): string {
    return this.vertical ? 'mdc-card__actions--vertical' : '';
  }
}