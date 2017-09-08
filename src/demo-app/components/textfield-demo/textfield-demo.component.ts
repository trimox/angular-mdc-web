import { Component } from '@angular/core';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.component.html'
})
export class TextfieldDemoComponent {
  username: string = '';
  prefill:string = 'John Doe';
  comments:string;
  subject:string;
  message:string;
  isDisabled = false;
  isRequired = true;
  isDense = false;
}
