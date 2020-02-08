import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({template: '<component-viewer></component-viewer>'})
export class FabDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Floating Action Button',
      description: 'A floating action button represents the primary action in an application.',
      references: [{
        name: 'Material Design guidelines: Floating Action Button',
        url: 'https://material.io/design/components/buttons-floating-action-button.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-fab/README.md'
      }],
      code: `import {MdcFabModule} from '@angular-mdc/web';`,
      sass: `@use '@material/fab/mdc-fab';
@use '@material/fab';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  example1 = {
    html: `<button mdc-fab>
  <mdc-icon>edit</mdc-icon>
</button>`
  };

  exampleMini = {
    html: `<button mdc-fab mini>
  <mdc-icon>edit</mdc-icon>
</button>`
  };

  exampleFA = {
    html: `<button mdc-fab>
  <mdc-icon fontSet="fa" fontIcon="fa-keyboard-o"></mdc-icon>
</button>`
  };

  exampleShaped = {
    html: `<button mdc-fab class="demo-fab-shaped--one">
  <mdc-icon>favorite_border</mdc-icon>
</button>

<button mdc-fab mini class="demo-fab-shaped--two">
  <mdc-icon>favorite_border</mdc-icon>
</button>

<button mdc-fab class="demo-fab-shape-radius">
  <mdc-icon>favorite_border</mdc-icon>
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss`
  };

  exampleTheme = {
    html: `<button mdc-fab class="red800Fab" icon="edit"></button>

<button mdc-fab class="yellow800Fab" icon="edit"></button>

<button mdc-fab class="purple500Fab" icon="edit"></button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss`
  };

  exampleExtended = {
    html: `<button mdc-fab extended icon="add_shopping_cart" label="Add to cart" class="blackFab"></button>

<button mdc-fab extended label="Create" class="blackFab"></button>

<button mdc-fab extended label="Save Changes" class="purple500Fab">
  <mdc-icon>save</mdc-icon>
</button>

<button mdc-fab extended>
  <mdc-fab-label>Create</mdc-fab-label>
  <mdc-icon>add</mdc-icon>
</button>

<button mdc-fab extended class="demo-fab-extended-shape-radius">
  <mdc-fab-label>Shaped</mdc-fab-label>
  <mdc-icon>add</mdc-icon>
</button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss`
  };

  exampleExtendedFluid = {
    html: `<button mdc-fab extended fluid label="Add to cart">
  <mdc-icon>add_shopping_cart</mdc-icon>
</button>`
  };

  exampleExited = {
    html: `<button mdc-fab #exited (click)="exited.toggleExited()">
  <mdc-icon>save</mdc-icon>
</button>`
  };

  exampleCustom = {
    html: `<button mdc-fab class="demo-fab-icon-size" icon="edit"></button>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss`
  };

  examplePosition = {
    html: `<button mdc-fab position='bottomRight' icon="add"></button>`
  };
}
