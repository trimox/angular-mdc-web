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
  @HostBinding('class.mdc-card__actions') isHostClass = true;
  @HostBinding('class.mdc-card__actions--vertical') get classCardActionVertical(): string {
    return this.vertical ? 'mdc-card__actions--vertical' : '';
  }
}
