import {
  Component,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mdc-card-horizontal',
  templateUrl: './card-horizontal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CardHorizontalComponent {
  @HostBinding('class.mdc-card__horizontal-block') className: string = 'mdc-card__horizontal-block';
}