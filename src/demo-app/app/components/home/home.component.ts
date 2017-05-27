import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class Home {
  @ViewChild('snack') snack;
  @ViewChild('menu') menu;

  username = null;
  password = null;
  comments = null;
  subject = null;
  message = null;
  submitEventText = null;
  inputHasFocus = false;
  inputKeysPressed = 0;
  inputCount = 0;
  selectedIndex = -1;
  focusedItemIndex = null;
  menuItems = [
    {
      id: 1,
      label: 'Security settings'
    },
    {
      id: 2,
      label: 'Review account activity'
    },
    {
      id: 3,
      label: 'Logoff'
    },
  ]

  handleFocus($event) {
    this.inputHasFocus = true;
  }
  handleBlur($event) {
    this.inputHasFocus = false;
  }
  handleInput($event) {
    this.inputCount++;
  }
  handleKeyDown($event) {
    this.inputKeysPressed++;
  }
  submit(message) {
    this.submitEventText = message;
  }
  showSnack(multiline: boolean, actionOnBottom: boolean) {
    var data = {
      message: 'Example of the MDC Snackbar',
      actionText: 'Ok',
      multiline: multiline,
      actionOnBottom: actionOnBottom,
      actionHandler: () => { console.log('Action button pressed!') }
    }
    this.snack.show(data);
  }
  showMenu() {
    this.menu.open(this.focusedItemIndex);
  }
  handleMenuCancel() {
    console.log('Menu cancel event');
  }
  handleMenuSelect(event: number) {
    this.selectedIndex = event;
    console.log('Menu event: Selected item: ' + event);
  }
}
