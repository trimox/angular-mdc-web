import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Ripple } from '../ripple/ripple.directive';
import { TextfieldComponent } from './textfield.component';

@Component({
  selector: 'mdc-textfield-box',
  template:
  `
  <input #input class="mdc-textfield__input"
  [type]="type"
  [id]="id"
  [attr.name]="name"
  [(ngModel)]="value"
  [tabindex]="tabindex"
  [maxlength]="maxlength"
  [disabled]="disabled"
  [required]="required"
  (focus)="onFocus($event)"
  (keydown)="onKeyDown($event)"
  (blur)="onBlur($event)"
  (input)="onInput($event)" />
  <label #inputlabel [attr.for]="id" class="mdc-textfield__label">{{label}}</label>
  <div class="mdc-textfield__bottom-line"></div>
  `,
  providers: [Ripple]
})
export class TextfieldBoxComponent extends TextfieldComponent implements OnInit {
  @HostBinding('class.mdc-textfield--box') isHostClass = true;

  ngOnInit() {
    this.ripple.init();
  }
}
