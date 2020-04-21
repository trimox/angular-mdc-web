import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

import {MdcSnackbar} from '@angular-mdc/web/snackbar';

interface CustomClasses {
  classes?: string | string[];
  actionClasses?: string | string[];
  dismissClasses?: string | string[];
}

@Component({template: '<component-viewer></component-viewer>'})
export class Snackbar implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Snackbars',
      description: 'Snackbars provide brief messages about app processes at the bottom of the screen.',
      references: [{
        name: 'Material Design guidelines: Snackbars',
        url: 'https://material.io/design/components/snackbars.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md#sass-mixins'},
      ],
      code: `import {MdcSnackbarModule} from '@angular-mdc/web/snackbar';`,
      sass: `@use '@material/snackbar/mdc-snackbar';
@use '@material/snackbar';`
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
          header: 'MdcSnackbar (Service)',
          summary: 'Service to open MDC snackbars.',
          categories: [
            {
              name: 'Properties',
              items: [
                {
                  name: `afterDismiss: Observable<MdcSnackbarDismissReason>`,
                  summary: `Gets an observable that is notified when the snackbar is finished closing.`,
                  summaryCode: `/** Event that is emitted when a snackbar is dismissed. */
export interface MdcSnackbarDismissReason {
  /** Whether the snackbar was dismissed using the action button. */
  action: boolean;

  /** Whether the snackbar was dismissed using the dismiss icon button. */
  dismiss: boolean;
}`
                },
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'open(message: string)', summary: `Open snackbar with message.`},
                {name: 'open(message: string, action: string)', summary: `Opens snackbar message and action.`},
                {name: 'open(message: string, action: string, config?: MdcSnackbarConfig)', summary: `Opens the snackbar with optional configuration.`},
              ]
            },
            {
              name: 'MdcSnackbarConfig',
              items: [
                {name: 'timeoutMs?: number', summary: `Value must be between 4000 and 10000 or an error will be thrown. Defaults to 5000 (5 seconds).`},
                {name: 'stacked?: boolean', summary: `Positions the action button/icon below the label instead of alongside it. Defaults to false.`},
                {name: 'leading?: boolean', summary: `Positions the snackbar on the leading edge of the screen.`},
                {name: 'trailing?: boolean', summary: `Positions the snackbar on the trailing (right) edge of the screen.`},
                {name: 'direction?: string', summary: `The layout direction of the snackbar content. Default is 'ltr'.`},
                {name: 'dismiss?: boolean', summary: `Show dismiss ("X") icon. Default is false.`},
                {name: 'closeOnEscape?: boolean', summary: `Whether the snackbar closes when it is focused and the user presses the ESC key. Default is true.`},
                {name: 'classes?: string | string[]', summary: `Add a CSS class or an array of classes.`},
                {name: 'actionClasses?: string | string[]', summary: `Add a CSS class or an array of classes to the action button.`},
                {name: 'dismissClasses?: string | string[]', summary: `Add a CSS class or an array of classes to the action icon.`},
                {name: 'politeness?: AriaLivePoliteness', summary: `The politeness level for the screen reader announcement. Default is 'polite'`},
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
  constructor(private snackbar: MdcSnackbar) {}

  simple() {
    const snackbarRef = this.snackbar.open('Marked as favorite.');
    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(`The snack-bar was dismissed: ${reason}`);
    });
  }

  withAction() {
    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry');
    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(`The snack-bar was dismissed: ${reason}`);
    });
  }

  dismissIcon() {
    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {
      dismiss: true
    });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(`The snack-bar was dismissed: ${reason}`);
    });
  }

  dismissIconOnly() {
    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, undefined, {
      dismiss: true
    });
  }

  stacked() {
    const snackbarRef = this.snackbar.open(
      `This item already has the label "travel". You can add a new label.`,
      'Add a new label', {
      stacked: true,
      dismiss: true
    });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(`The snack-bar was dismissed: ${reason}`);
    });
  }

  maxTimeout() {
    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 10 seconds.`, 'Retry', {
      timeoutMs: 10000
    });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(`The snack-bar was dismissed: ${reason}`);
    });
  }

  openLeading(): void {
    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {
      leading: true
    });
  }

  openTrailing(): void {
    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {
      trailing: true
    });
  }

  openRtl(): void {
    this.snackbar.open(`My content is right to left`, 'Ok', {
      direction: 'rtl'
    });
  }

  openCustom(customClasses: CustomClasses) {
    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {
      dismiss: true,
      classes: customClasses.classes,
      actionClasses: customClasses.actionClasses,
      dismissClasses: customClasses.dismissClasses
    });
  }

  //
  // Examples
  //

  exampleHeader = `import { MdcSnackbar } from '@angular-mdc/web';

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(private snackbar: MdcSnackbar) { }
`;

  exampleCustomTS = `import { MdcSnackbar } from '@angular-mdc/web';

interface CustomClasses {
  classes: string | string[];
  actionClasses: string | string[];
  dismissClasses: string | string[];
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(private snackbar: MdcSnackbar) { }

  openCustom(customClasses: CustomClasses) {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      dismiss: true,
      classes: customClasses.classes,
      actionClasses: customClasses.actionClasses,
      dismissClasses: customClasses.dismissClasses
    });
  }
}`;

  exampleSnackbar = {
    html: `<button mdc-button raised (click)="simple()">Simple</button>

<button mdc-button raised (click)="withAction()">With Action</button>

<button mdc-button raised (click)="dismissIcon()">Dismiss Icon</button>

<button mdc-button raised (click)="dismissIconOnly()">Icon Only</button>

<button mdc-button raised (click)="stacked()">Stacked</button>

<button mdc-button raised (click)="maxTimeout()">Max Timeout</button>`,
    ts: `${this.exampleHeader}
  simple() {
    const snackbarRef = this.snackbar.open('Marked as favorite.');
    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(reason);
    });
  }

  withAction() {
    const snackbarRef = this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry');
    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(reason);
    });
  }

  dismissIcon() {
    const snackbarRef = this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      dismiss: true
    });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(reason);
    });
  }

  dismissIconOnly() {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, undefined, {
      dismiss: true
    });
  }

  stacked() {
    const snackbarRef = this.snackbar.open(
      \`This item already has the label "travel". You can add a new label.\`,
      'Add a new label', {
        stacked: true,
        dismiss: true
      });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(reason);
    });
  }

  maxTimeout() {
    const snackbarRef = this.snackbar.open(\`Can't send photo. Retry in 10 seconds.\`, 'Retry', {
      timeoutMs: 10000
    });

    snackbarRef.afterDismiss().subscribe(reason => {
      console.log(reason);
    });
  }
}`
  };

  exampleAlign = {
    html: `<button mdc-button raised (click)="openLeading()">Leading</button>

<button mdc-button raised (click)="openTrailing()">Trailing</button>

<button mdc-button raised (click)="openRtl()">RTL</button>`,
    ts: `${this.exampleHeader}
  openLeading(): void {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      leading: true
    });
  }

  openTrailing(): void {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      trailing: true
    });
  }

  openRtl(): void {
    this.snackbar.open('My content is right to left', 'Ok', {
      direction: 'rtl'
    });
  }
}`
  };

  exampleCustom = {
    html: `<button mdc-button raised (click)="openCustom({classes: 'custom-snackbar--shape-radius'})">Shaped</button>

<button mdc-button raised (click)="openCustom({classes: 'custom-snackbar--elevation'})">Elevation</button>

<button mdc-button raised (click)="openCustom({classes: 'custom-snackbar--viewport-margin'})">Viewport Margin</button>

<button mdc-button raised (click)="openCustom({classes: 'custom-snackbar--max-width'})">Max-Width</button>

<button mdc-button raised (click)="openCustom({classes: 'custom-snackbar--min-width'})">Min-Width</button>`,
    ts: `import { MdcSnackbar } from '@angular-mdc/web';

interface CustomClasses {
  classes: string | string[];
  actionClasses: string | string[];
  dismissClasses: string | string[];
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(private snackbar: MdcSnackbar) { }

  openCustom(customClasses: CustomClasses) {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      dismiss: true,
      classes: customClasses.classes
    });
  }
}`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_snackbar.scss`
  };

  exampleTheme = {
    html: `<button mdc-button raised
  (click)="openCustom({classes: 'custom-snackbar--fill-color'})">Fill Color</button>

<button mdc-button raised
  (click)="openCustom({classes: 'custom-snackbar--label-ink-color'})">Ink Color</button>

<button mdc-button raised
  (click)="openCustom({classes: ['custom-snackbar--fill-color', 'custom-snackbar--label-ink-color']})">Fill/Ink Color</button>

<button mdc-button raised
  (click)="openCustom({actionClasses: 'mdc-button--outlined'})">Action Outlined</button>

<button mdc-button raised
  (click)="openCustom({dismissClasses: 'demo-icon-button-custom'})">Custom Dismiss Icon</button>`,
    ts: this.exampleCustomTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_snackbar.scss`
  };
}
