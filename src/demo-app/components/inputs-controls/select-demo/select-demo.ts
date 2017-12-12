import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MdcSelect } from '@angular-mdc/web';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  isDisabled: boolean = false;
  selectedValue: string;
  isDarkTheme: boolean = false;
  eventIndex: number;
  eventValue: any;

  // foodControl = new FormControl('pizza-1');
  foodControl = new FormControl();

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  @ViewChild('select') select: MdcSelect;

  constructor() {
    // this.foodControl.setValue('steak-0');
    // this.selectedValue = 'pizza-1';
  }

  clearSelection() {
    this.selectedValue = null;
  }

  setSelection() {
    this.selectedValue = 'fruit-3';
  }

  handleChange(event: { index: number, value: any }) {
    this.eventIndex = event.index;
    this.eventValue = event.value;
  }
}
