import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mdc-card',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input() darkTheme: boolean;
  @HostBinding('class.mdc-card') className: string = 'mdc-card';
  @HostBinding('class.mdc-card--theme-dark') get classDarkTheme(): string {
     return this.darkTheme ? 'mdc-card--theme-dark' : '';
  }
}