import { Component, OnInit, ViewChild } from '@angular/core';

import { MdcListItem } from '@angular-mdc/web';
import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class MenuDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Menus',
      `Menus display a list of choices on temporary surfaces.`,
      "import { MdcMenuModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Menus',
      url: 'https://material.io/design/components/menus.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  corners: string[] = ['topStart', 'topEnd', 'bottomStart', 'bottomEnd'];

  fruits = [
    { label: 'Passionfruit' },
    { label: 'Orange' },
    { label: 'Guava' },
    { label: 'Pitaya' },
    { label: null }, // null label sets a mdc-list-divider
    { label: 'Pinaeapple' },
    { label: 'Mango' },
    { label: 'Papaya' },
    { label: 'Lychee' }
  ];

  lastSelection: number;

  onMenuSelect(event: { index: number, item: MdcListItem }) {
    this.lastSelection = event.index;
  }

  addFruit(): void {
    this.fruits.push({ label: 'New fruit item' });
  }

  exampleMenu = {
    html: `<div mdcMenuSurfaceAnchor #demoAnchor>
  <button mdc-button raised (click)="demo.open = !demo.open">
    Show Menu
  </button>

  <mdc-menu #demo [anchorElement]="demoAnchor" (selected)="onMenuSelect($event)">
    <mdc-list>
      <ng-container *ngFor="let fruit of fruits" [ngSwitch]="!!fruit.label">
        <mdc-list-item *ngSwitchCase="true">{{fruit.label}}</mdc-list-item>
        <mdc-list-divider *ngSwitchCase="false"></mdc-list-divider>
      </ng-container>
    </mdc-list>
  </mdc-menu>
</div>`,
    ts: `import { MdcListItem } from '@angular-mdc/web';

fruits = [
  { label: 'Passionfruit' },
  { label: 'Orange' },
  { label: 'Guava' },
  { label: 'Pitaya'},
  { label: null }, // The html uses ngSwitchCase to check for a null label, and displays mdc-list-divider
  { label: 'Pinaeapple'},
  { label: 'Mango'},
  { label: 'Papaya'},
  { label: 'Lychee'}
];

onMenuSelect(event: { index: number, item: MdcListItem }) {
  console.log(event.index);
}

addFruit() {
  this.fruits.push({ label: 'New fruit item' });
}`
  };

  exampleSelectionGroup = {
    html: `<div mdcMenuSurfaceAnchor #demoSelectionAnchor>
  <button mdc-button raised (click)="demoSelectionGroup.open = !demoSelectionGroup.open">
    Show Selection Group Menu
  </button>
  <mdc-menu #demoSelectionGroup [anchorElement]="demoSelectionAnchor">
    <mdc-list>
      <mdc-menu-selection-group>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
          Single
        </mdc-list-item>
        <mdc-list-item disabled>
          <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
          1.15
        </mdc-list-item>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
          Double
        </mdc-list-item>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
          Custom: 1.2
        </mdc-list-item>
      </mdc-menu-selection-group>
      <mdc-list-divider></mdc-list-divider>
      <mdc-list-item>Add space before paragraph</mdc-list-item>
      <mdc-list-item>Add space after paragraph</mdc-list-item>
      <mdc-list-divider></mdc-list-divider>
      <mdc-list-item>Custom spacing...</mdc-list-item>
    </mdc-list>
  </mdc-menu>
</div>`
  };

  exampleSelectionGroupSvg = {
    html: `<div mdcMenuSurfaceAnchor #demoSimpleAnchor>
  <button mdc-button raised (click)="demoSimple.open = !demoSimple.open">
    Show Selection Group Menu
  </button>
  <mdc-menu #demoSimple [anchorElement]="demoSimpleAnchor">
    <mdc-list>
      <mdc-menu-selection-group>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </mdc-icon>
          Single
        </mdc-list-item>
        <mdc-list-item disabled>
          <mdc-icon mdcMenuSelectionGroupIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </mdc-icon>
          1.15
        </mdc-list-item>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </mdc-icon>
          Double
        </mdc-list-item>
        <mdc-list-item>
          <mdc-icon mdcMenuSelectionGroupIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </mdc-icon>
          Custom: 1.2
        </mdc-list-item>
      </mdc-menu-selection-group>
      <mdc-list-divider></mdc-list-divider>
      <mdc-list-item>Add space before paragraph</mdc-list-item>
      <mdc-list-item>Add space after paragraph</mdc-list-item>
      <mdc-list-divider></mdc-list-divider>
      <mdc-list-item>Custom spacing...</mdc-list-item>
    </mdc-list>
  </mdc-menu>
</div>`
  };

  exampleCard = {
    html: `<div class="demo-content">
<mdc-card class="demo-card">
  <mdc-card-primary-action>
    <div class="demo-card__primary">
      <h2 class="demo-card__title" mdcHeadline6>Our Changing Planet</h2>
      <h3 class="demo-card__subtitle" mdcSubtitle2>by Kurt Wagner</h3>
    </div>
    <div class="demo-card__secondary" mdcBody2>
      Select the vertical menu icon button below.
    </div>
  </mdc-card-primary-action>
  <mdc-card-actions>
    <mdc-card-action-buttons>
      <button mdc-button mdcCardAction="button">Read</button>
    </mdc-card-action-buttons>
    <mdc-card-action-icons>
      <button mdcIconButton mdcCardAction="icon" icon="share"></button>
      <div mdcMenuSurfaceAnchor #cardAnchor>
        <button mdcIconButton mdcCardAction="icon" icon="more_vert"
          (click)="cardMenu.open = !cardMenu.open"></button>
        <mdc-menu #cardMenu [anchorElement]="cardAnchor">
          <mdc-list>
            <mdc-list-item>Open</mdc-list-item>
            <mdc-list-item>Dismiss</mdc-list-item>
          </mdc-list>
        </mdc-menu>
      </div>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`
  };
}
