import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: ' mdc-fab-icon, [mdc-fab-icon]'
})
export class FabIconDirective {
  @HostBinding('class.mdc-fab__icon') isHostClass = true;
}
