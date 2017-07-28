import {
  Directive,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[mdc-card-title], mdc-card-title'
})
export class CardTitleDirective {
  @Input() large: boolean = true;
  @HostBinding('class.mdc-card__title') isHostClass = true;
  @HostBinding('class.mdc-card__title--large') get classTitleLarge(): string {
     return this.large ? 'mdc-card__title--large' : '';
  }
}
