import { Component } from '@angular/core';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
  username: string;
  prefill: string = 'John Doe';
  comments: string;
  subject: string;
  message: string;
  isDisabled = false;
  isRequired = true;
  isDense = false;
  isTextareaRequired: boolean = false;
}
