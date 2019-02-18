import { Directive } from '@angular/core';

@Directive({
  selector: 'markdown',
  host: { 'class': 'markdown-code' }
})
export class Markdown { }
