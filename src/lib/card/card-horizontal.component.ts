import {
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mdc-card-horizontal',
  template: '<ng-content select="mdc-card-primary, mdc-card-title, mdc-card-subtitle, [mdc-card-media-item], mdc-card-actions"></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class CardHorizontalComponent {
  @HostBinding('class.mdc-card__horizontal-block') isHostClass = true;
}
