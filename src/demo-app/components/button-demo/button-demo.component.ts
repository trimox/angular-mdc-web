import {
	Component,
	ViewChild
} from '@angular/core';

import { SnackbarMessage, MdcSnackbarComponent } from '../../../lib/public_api';

@Component({
	selector: 'button-demo',
	templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent {
	message: SnackbarMessage;
	@ViewChild('snack') snack: MdcSnackbarComponent;

	handleClick() {
		this.message = {
			message: 'Sample text',
			actionText: 'Ok',
		};
		this.snack.show(this.message);
	}
}
