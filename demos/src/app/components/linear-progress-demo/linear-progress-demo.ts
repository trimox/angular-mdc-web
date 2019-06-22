import { Component, OnInit, ViewChild } from '@angular/core';

import { MdcLinearProgress } from '@angular-mdc/web';
import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class LinearProgressDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Linear Progress',
      `Progress indicators express an unspecified wait time or display the length of a process.`,
      "import { MdcLinearProgressModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Progress Activity',
      url: 'https://material.io/design/components/progress-activity.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-linear-progress/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  alternateColors(input: MdcLinearProgress) {
    const demoInput = 'demo-linear-progress--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      input.elementRef.nativeElement.classList.remove(demoInput)
      : input.elementRef.nativeElement.classList.add(demoInput);
  }

  customSass = `.demo-linear-progress--custom {
  @include mdc-linear-progress-bar-color($material-color-red-500);
  @include mdc-linear-progress-buffer-color($material-color-red-100);
}`;

  example1 = {
    html: `<mdc-linear-progress></mdc-linear-progress>`,
    sass: this.customSass
  };

  example2 = {
    html: `<mdc-linear-progress determinate [progress]="0.5" [buffer]="0.75" secondary></mdc-linear-progress>`,
    sass: this.customSass
  };
}
