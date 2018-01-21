import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
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
  prefill: string = 'John Doe';
}

@Component({
  templateUrl: './text-field-box-tab.html',
})
export class TextFieldBoxTab { }

@Component({
  templateUrl: './textarea-tab.html',
})
export class TextAreaTab { }
