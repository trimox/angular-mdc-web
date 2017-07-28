import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-card-subtitle], mdc-card-subtitle'
})
export class CardSubtitleComponent {
  @HostBinding('class.mdc-card__subtitle') isHostClass = true;
}
