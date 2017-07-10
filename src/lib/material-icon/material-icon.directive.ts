import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[material-icon]'
})
export class MaterialIcon {
  @HostBinding('class.material-icons') isHostClass = true;
}
