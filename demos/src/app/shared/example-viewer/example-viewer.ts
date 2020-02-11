import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';

import {MdcTabActivatedEvent} from '@angular-mdc/web';
import {MdcSnackbar} from '@angular-mdc/web/snackbar';

interface HighlightConfig {
  label?: string;
  code?: any;
  url?: boolean;
}

@Component({
  selector: 'example-viewer',
  templateUrl: './example-viewer.html',
  styleUrls: ['./example-viewer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ExampleViewer implements OnInit {
  tabs: HighlightConfig[] = [];
  config: HighlightConfig = {};

  open: boolean = false;

  @Input() label?: string = 'View Source';

  @Input()
  get example(): HighlightConfig {
    return this._example;
  }
  set example(value: HighlightConfig) {
    if (value !== this._example) {
      this._example = value;

      if (Object.entries(value).length) {
        Object.entries(value).forEach(([key, source]) =>
          this.tabs.push({label: key, code: source, url: this.isUrl(source)}));
      }
    }
  }
  private _example: HighlightConfig;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private snackbar: MdcSnackbar) {}

  ngOnInit(): void {
    this.config = this.tabs[0];
  }

  onActivatedTab(event: MdcTabActivatedEvent): void {
    this.config = this.tabs[event.index];
  }

  isUrl(url: string): boolean {
    const regExp = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regExp.test(url);
  }

  copyCode(): void {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.id = 'txt';
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.top = '0';
    tempTextarea.style.left = '0';
    tempTextarea.style.opacity = '0';
    tempTextarea.textContent = this.config.code;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    try {
      const returnValue = document.execCommand('copy');
      if (returnValue) {
        this.snackbar.open('Code copied');
      }
    } catch (err) {
      this.snackbar.open('Unable to copy');
    } finally {
      document.body.removeChild(tempTextarea);
    }
  }
}
