import { Component, ViewChild } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: './home.component.html'
})
export class Home {
	username = null;
	password = null;
	comments = null;
	subject = null;
	message = null;
	submitEventText = null;
	inputHasFocus = false;
	inputKeysPressed = 0;
	inputCount = 0;
	@ViewChild('snackdemo') snack;

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
}
