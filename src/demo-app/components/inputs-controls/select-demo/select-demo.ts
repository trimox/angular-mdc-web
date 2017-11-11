import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  isDisabled: boolean = false;
  selectedValue: string;
  closeOnScroll: boolean = true;
  isDarkTheme: boolean = false;
  eventIndex: number;
  eventValue: any;

  @ViewChild('select') select: any;

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  clearSelection() {
    this.select.clearSelection();
  }

  setSelection() {
    this.selectedValue = 'fruit-3';
  }

  handleChange(event: {index: number, value: any}) {
    this.eventIndex = event.index;
    this.eventValue = event.value;
  }
}
