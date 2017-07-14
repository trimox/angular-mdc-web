import {
  Component,
} from '@angular/core';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.component.html'
})
export class TextfieldDemoComponent {
  username = null;
  password = null;
  comments = null;
  subject = null;
  message = null;
  isDisabled = false;
  isRequired = true;
}
