import {
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mdc-card-media',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class CardMediaComponent {
  @HostBinding('class.mdc-card__media') isHostClass = true;
}
