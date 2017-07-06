import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-card-supporting-text], mdc-card-supporting-text'
})
export class CardSupportingTextDirective {
  @HostBinding('class.mdc-card__supporting-text') isHostClass = true;
}