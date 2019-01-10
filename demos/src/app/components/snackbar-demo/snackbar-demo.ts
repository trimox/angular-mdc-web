import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

import { MdcSnackbar } from '@angular-mdc/web';

@Component({ template: '<component-viewer></component-viewer>' })
export class SnackbarDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Snackbars',
      `Snackbars provide brief messages about app processes at the bottom of the screen.`,
      "import { MdcSnackbarModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Snackbars',
      url: 'https://material.io/design/components/snackbars.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(private snackbar: MdcSnackbar) { }

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

  openCustom(classes: string | string[]) {
    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {
      classes: classes
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

  exampleSnackbar = {
    html: `<button mdc-button raised (click)="simple()">Simple</button>

<button mdc-button raised (click)="withAction()">With Action</button>

<button mdc-button raised (click)="dismissIcon()">Dismiss Icon</button>

<button mdc-button raised (click)="stacked()">Stacked</button>`,
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
    html: `<button mdc-button raised (click)="openCustom('custom-snackbar--shape-radius')">Shaped</button>

<button mdc-button raised (click)="openCustom('custom-snackbar--elevation')">Elevation</button>

<button mdc-button raised (click)="openCustom('custom-snackbar--viewport-margin')">Viewport Margin</button>`,
    ts: `${this.exampleHeader}
  openCustom(classes: string | string[]) {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      classes: classes
    });
  }
}`,
    sass: `.custom-snackbar--shape-radius {
  @include mdc-snackbar-shape-radius(10px);
}

.custom-snackbar--viewport-margin {
  @include mdc-snackbar-viewport-margin(50px);
}

.custom-snackbar--elevation {
  @include mdc-snackbar-elevation(16);
}`,
  };

  exampleTheme = {
    html: `<button mdc-button raised (click)="openCustom('custom-snackbar--fill-color')">Fill Color</button>

<button mdc-button raised (click)="openCustom('custom-snackbar--label-ink-color')">Ink Color</button>

<button mdc-button raised
  (click)="openCustom([
    'custom-snackbar--fill-color',
    'custom-snackbar--label-ink-color'])">Fill/Ink Color</button>`,
    ts: `${this.exampleHeader}
  openCustom(classes: string | string[]) {
    this.snackbar.open(\`Can't send photo. Retry in 5 seconds.\`, 'Retry', {
      classes: classes
    });
  }
}`,
    sass: `.custom-snackbar--fill-color {
  @include mdc-snackbar-fill-color($material-color-red-500);
}

.custom-snackbar--label-ink-color {
  @include mdc-snackbar-label-ink-color($material-color-yellow-500);
}`
  };
}
