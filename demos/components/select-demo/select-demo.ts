import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  // foodControl = new FormControl('fruit-3');
  foodControl = new FormControl();

  public formOne: FormGroup;
  public fruits: object[] = [
    {
      id: 1,
      name: "Pineapple",
      tasty: true
    },
    {
      id: 2,
      name: "Watermelon",
      tasty: false
    }
  ];

  foods = [
    { value: '', disabled: false },
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', viewValue: 'Fruit' },
  ];

  compareFn(f1: any, f2: any): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }

  constructor(private fb: FormBuilder) {
    this.formOne = this.fb.group({
      fruit: [undefined]
    });

    this.foodControl.setValue('fruit-3');
  }

  onChange(event: { index: number, value: any }) {
    console.log(`onChange: ${event.index}`);
  }

  onSelectionChange(event: { index: any, value: any }) {
    console.log(`onSelectionChange: ${event.index} ${event.value}`);
  }

  onSelectionChangeFruit(event: { index: any, value: any }) {
    console.log(`onSelectionChangeFruit: ${event.index} ${event.value}`);
  }
}
