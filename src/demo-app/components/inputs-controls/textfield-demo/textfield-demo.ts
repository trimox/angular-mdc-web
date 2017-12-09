import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
  comments: string;
  subject: string;
  message: string;
  isDisabled = false;
  isRequired = true;
  isDense = false;
  isTextareaRequired: boolean = false;

  textfieldTabs = [
    { label: 'Text Field', route: 'text-field-tab' },
    { label: 'Text Field Box', route: 'text-field-box-tab' },
    { label: 'Textarea', route: 'textarea-tab' },
  ];
}

@Component({
  templateUrl: './text-field-tab.html',
})
export class TextFieldTab {
  username: string;
  prefill: string = 'John Doe';
  isDisabled = false;
  isRequired = true;
  isDense = false;

  @ViewChild('prefilled') prefilled: any;

  selectAll() {
    this.prefilled.selectAll();
  }
}

@Component({
  templateUrl: './text-field-box-tab.html',
})
export class TextFieldBoxTab { }

@Component({
  templateUrl: './textarea-tab.html',
})
export class TextAreaTab {
  isTextareaRequired: boolean = false;
}
