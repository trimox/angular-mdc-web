import {
  Directive,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdc-card-title], mdc-card-title'
})
export class CardTitleDirective {
  @Input() titleLarge: boolean = true;
  @HostBinding('class.mdc-card__title') className: string = 'mdc-card__title';
  @HostBinding('class.mdc-card__title--large') get classTitleLarge(): string {
     return this.titleLarge ? 'mdc-card__title--large' : '';
  }
}