import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcLinearProgress} from '@angular-mdc/web/linear-progress';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-linear-progress/README.md#sass-mixins'},
      ],
      code: `import {MdcLinearProgressModule} from '@angular-mdc/web/linear-progress';`,
      sass: `@use '@material/linear-progress/mdc-linear-progress';
@use '@material/linear-progress';`
    };
  }
}

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcLinearProgress',
          selectors: [
            'mdc-linear-progress',
          ],
          exportedAs: 'mdcLinearProgress',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'determinate: boolean', summary: 'Puts the linear progress indicator in an determinate or indeterminate state.'},
                {name: 'reversed: boolean', summary: 'Reverses the direction of the linear progress indicator.'},
                {name: 'progress: number', summary: 'Sets the progress bar to this value. Value should be between [0, 1].'},
                {name: 'buffer: number', summary: 'Sets the buffer bar to this value. Value should be between [0, 1].'},
                {name: 'label: string', summary: 'Label indicating how the progress bar should be announced to the user.'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'open()', summary: 'Puts the component in the open state.'},
                {name: 'close()', summary: 'Puts the component in the closed state.'},
              ]
            },
          ]
        },
      ]
    };
  }
}

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
