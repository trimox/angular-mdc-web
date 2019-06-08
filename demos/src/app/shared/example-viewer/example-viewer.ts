import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {MdcTabActivatedEvent} from '@angular-mdc/web';
import {MdcSnackbar} from '@angular-mdc/web/snackbar';

interface Example {
  label?: string;
  source?: any;
}

export class ExampleTab {
  constructor(public label: string, public source: any) { }
}

@Component({
  selector: 'example-viewer',
  templateUrl: './example-viewer.html',
  styleUrls: ['./example-viewer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ExampleViewer implements OnInit {
  currentExample: any;
  tabs: ExampleTab[] = [];

  @Input() open: boolean = false;

  @Input()
  get example(): Example { return this._example; }
  set example(value: Example) {
    if (value !== this._example) {
      this._example = value;

      if (Object.entries(value).length) {
         Object.entries(value).forEach(([key, source]) => {
          this.tabs.push(new ExampleTab(key, source));
        });
      }
    }
  }
  private _example: Example;

  constructor(private snackbar: MdcSnackbar) {}

  ngOnInit(): void {
    this.currentExample = this.tabs[0].source;
  }

  onActivatedTab(event: MdcTabActivatedEvent): void {
    this.currentExample = this.tabs[event.index].source;
  }

  copyCode(): void {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.id = 'txt';
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.top = '0';
    tempTextarea.style.left = '0';
    tempTextarea.style.opacity = '0';
    tempTextarea.value = this.currentExample;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    try {
      const returnValue = document.execCommand('copy');
      if (returnValue) {
        this.snackbar.open('Code copied');
      }
    } catch (err) {
      this.snackbar.open('Unable to copy.');
    } finally {
      document.body.removeChild(tempTextarea);
    }
  }
}
