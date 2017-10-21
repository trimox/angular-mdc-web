import { Component } from '@angular/core';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  isDisabled: boolean = false;
  selectedValue: string;
  closeOnScroll: boolean = true;
  isDarkTheme: boolean = false;

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];
}
