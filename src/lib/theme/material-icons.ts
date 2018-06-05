import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[materialIcons], [material-icon]'
})
export class MdcMaterialIcons {
  @HostBinding('class.material-icons') isHostClass = true;
}
