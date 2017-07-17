import {
	Component,
	ViewChild
} from '@angular/core';

import { SnackbarMessage, SnackbarComponent } from '@angular-mdc/web';

@Component({
	selector: 'button-demo',
	templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
	message: SnackbarMessage;
	@ViewChild('snack') snack: SnackbarComponent;

	handleClick() {
		this.message = {
			message: 'Sample text',
			actionText: 'Ok',
		};
		this.snack.show(this.message);
	}
}
