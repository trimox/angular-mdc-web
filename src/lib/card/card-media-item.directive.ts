import {
  Directive,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdc-card-media-item]'
})
export class CardMediaItemDirective {
  @Input() size: number;
  @HostBinding('class.mdc-card__media-item') className: string = 'mdc-card__media-item';
  @HostBinding('class.mdc-card__media-item--1dot5x') get classMediaItemOne(): string {    
    return this.size === 1 ? 'mdc-card__media-item--1x' : '';
  }
  @HostBinding('class.mdc-card__media-item--1dot5x') get classMediaItemOneDotFive(): string {    
    return this.size === 1.5 ? 'mdc-card__media-item--1dot5x' : '';
  }
  @HostBinding('class.mdc-card__media-item--2x') get classMediaItemTwo(): string {    
    return this.size === 2 ? 'mdc-card__media-item--2x' : '';
  }
  @HostBinding('class.mdc-card__media-item--3x') get classMediaItemThree(): string {    
    return this.size === 3 ? 'mdc-card__media-item--3x' : '';
  }
}