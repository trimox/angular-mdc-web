import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcLinearProgress} from '@angular-mdc/web/linear-progress';
import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class LinearProgress implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Linear Progress',
      description: 'Progress indicators express an unspecified wait time or display the length of a process.',
      references: [{
        name: 'Material Design guidelines: Progress Activity',
        url: 'https://material.io/components/progress-indicators/'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-linear-progress/README.md'
      }],
      code: `import {MdcLinearProgressModule} from '@angular-mdc/web';`,
      sass: `@use '@material/linear-progress/mdc-linear-progress';
@use '@material/linear-progress';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({templateUrl: './examples.html'})
export class Examples {
  alternateColors(input: MdcLinearProgress) {
    const demoInput = 'demo-linear-progress--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      input.elementRef.nativeElement.classList.remove(demoInput)
      : input.elementRef.nativeElement.classList.add(demoInput);
  }

  exampleIndeterminate = {
    html: `<mdc-linear-progress></mdc-linear-progress>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_linear-progress.scss`
  };

  exampleDeterminate = {
    html: `<mdc-linear-progress determinate [progress]="0.5" [buffer]="0.75"></mdc-linear-progress>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_linear-progress.scss`
  };
}
