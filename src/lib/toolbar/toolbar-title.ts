import {
	Directive,
	Input,
	HostBinding
} from '@angular/core';

@Directive({
	selector: '[mdc-toolbar-title]'
})
export class ToolbarTitleDirective {
	@Input() id: string;
	@HostBinding('class') className: string = 'mdc-toolbar__title';
}