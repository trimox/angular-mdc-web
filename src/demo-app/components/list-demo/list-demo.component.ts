import {
	Component,
} from '@angular/core';

@Component({
	selector: 'list-demo',
	templateUrl: './list-demo.component.html'
})
export class ListDemoComponent {
	isSinglelineDense: boolean;
	isSingleDarkTheme: boolean;
	isTwolineDense: boolean;
	isTwoDarkTheme: boolean;
	isStartDetailDarkTheme: boolean;
	isStartEndDetailDarkTheme: boolean;
	isAvatarDense: boolean;
	isAvatarDarkTheme: boolean;
}
