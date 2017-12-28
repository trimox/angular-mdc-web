import {
  Directive,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'mdc-content, [mdc-content]'
})
export class MdcContent {
  @HostBinding('class.mdc-content') isHostClass = true;
}
