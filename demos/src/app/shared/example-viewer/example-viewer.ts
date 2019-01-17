import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

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

  ngOnInit(): void {
    this.showSource(this.tabs[0].source);
  }

  showSource(exampleType: string): void {
    this.currentExample = exampleType;
  }
}
