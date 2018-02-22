import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

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
export class TextFieldTab implements OnInit {
  userForm: FormGroup;
  prefilledText: string = 'Prefilled';

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl({ value: '', disabled: false }, Validators.required)
    });
  }
}

@Component({
  templateUrl: './text-field-box-tab.html',
})
export class TextFieldBoxTab { }

@Component({
  templateUrl: './textarea-tab.html',
})
export class TextAreaTab { }
