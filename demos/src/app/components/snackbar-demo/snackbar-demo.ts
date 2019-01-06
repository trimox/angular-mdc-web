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
  multiline = false;
  dismissOnAction = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  constructor(private snackbar: MdcSnackbar) { }

  show() {
    const snackbarRef = this.snackbar.show('Message sent', 'Undo', {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  //
  // Examples
  //

  exampleSnackbar = {
    html: `<button mdc-button raised (click)="show()">Show Snackbar</button>`,
    ts: `import { MdcSnackbar } from '@angular-mdc/web';

@Component({ templateUrl: './examples.html' })
export class Examples {
  constructor(private snackbar: MdcSnackbar) { }

  show() {
    const snackbarRef = this.snackbar.show('Message sent', 'Undo', {
      align: 'center',
      timeout: 2750,
      multiline: false,
      dismissOnAction: true,
      focusAction: true,
      actionOnBottom: false
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }
}`
  };
}
