import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[mdc-theme-dark]'
})
export class ThemeDark {
  @HostBinding('class.mdc-theme--dark') classThemeDark: string = 'mdc-theme--dark';
}
