import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({template: '<component-viewer></component-viewer>'})
export class Drawer implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Drawers',
      description: 'The MDC Navigation Drawer is used to organize access to destinations and other functionality on an app.',
      references: [{
        name: 'Material Design guidelines: Navigation Drawer',
        url: 'https://material.io/design/components/navigation-drawer.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-drawer/README.md'
      }],
      code: `import {MdcDrawerModule} from '@angular-mdc/web';`,
      sass: `@use '@material/drawer/mdc-drawer';
@use '@material/drawer';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  destinations = [
    {label: 'Inbox', icon: 'inbox', activated: true},
    {label: 'Star', icon: 'star', activated: false},
    {label: 'Sent Mail', icon: 'send', activated: false},
    {label: 'Drafts', icon: 'drafts', activated: false}
  ];

  alternateColors(input: any, className: string) {
    input.elementRef.nativeElement.classList.contains(className) ?
      input.elementRef.nativeElement.classList.remove(className) :
      input.elementRef.nativeElement.classList.add(className);
  }

  genericTS = `destinations = [
  { label: 'Inbox', icon: 'inbox', activated: true },
  { label: 'Star', icon: 'star', activated: false },
  { label: 'Sent Mail', icon: 'send', activated: false },
  { label: 'Drafts', icon: 'drafts', activated: false }
];`;

  examplePerm = {
    html: `<mdc-drawer>
  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>
  <mdc-drawer-content>
    <mdc-list>
      <a mdc-list-item *ngFor="let item of destinations" href="#/drawer-demo/examples" [activated]="item.activated">
        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}
      </a>
      <mdc-list-divider></mdc-list-divider>
      <h6 mdcListGroupSubheader>Labels</h6>
      <a mdc-list-item href="#/drawer-demo/examples">
        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Family
      </a>
      <a mdc-list-item href="#/drawer-demo/examples">
        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Friends
      </a>
      <a mdc-list-item href="#/drawer-demo/examples">
        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Work
      </a>
      <mdc-list-divider></mdc-list-divider>
      <a mdc-list-item href="#/drawer-demo/examples">
        <mdc-icon mdcListItemGraphic>settings</mdc-icon>Settings
      </a>
      <a mdc-list-item href="#/drawer-demo/examples">
        <mdc-icon mdcListItemGraphic>announcement</mdc-icon>Help & feedback
      </a>
    </mdc-list>
  </mdc-drawer-content>
</mdc-drawer>`,
    ts: this.genericTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss`
  };

  exampleDismissible = {
    html: `<mdc-drawer drawer="dismissible">
  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>
  <mdc-drawer-content>
    <mdc-list>
      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">
        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}
      </mdc-list-item>
    </mdc-list>
  </mdc-drawer-content>
</mdc-drawer>
<div mdcDrawerAppContent>
  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque
  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.
  legere iriure blandit. Veri iisque accusamus an pri.
</div>`,
    ts: this.genericTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss`
  };

  exampleModal = {
    html: `<mdc-drawer drawer="modal" open>
  <mdc-drawer-header>
    <h3 mdcDrawerTitle>Drawer Title</h3>
    <h6 mdcDrawerSubtitle>Subtitle</h6>
  </mdc-drawer-header>
  <mdc-drawer-content>
    <mdc-list>
      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">
        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}
      </mdc-list-item>
    </mdc-list>
  </mdc-drawer-content>
</mdc-drawer>
<div>
  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque
  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.
  legere iriure blandit. Veri iisque accusamus an pri.
</div>`,
    ts: this.genericTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss`
  };

  exampleRtl = {
    html: `<mdc-drawer drawer="modal" dir="rtl">
  <mdc-drawer-header>
    <h3 mdcDrawerTitle>Drawer Title</h3>
    <h6 mdcDrawerSubtitle>Subtitle</h6>
  </mdc-drawer-header>
  <mdc-drawer-content dir="rtl">
    <mdc-list>
      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">
        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}
      </mdc-list-item>
    </mdc-list>
  </mdc-drawer-content>
</mdc-drawer>
<div>
  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque
  efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere
  Veri iisque accusamus an pri.
</div>`,
    ts: this.genericTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss`
  };

  exampleShaped = {
    html: `<mdc-drawer>
  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>
  <mdc-drawer-content>
    <mdc-list class="demo-list--shaped">
      <a mdc-list-item *ngFor="let item of destinations" href="#/drawer-demo/examples" [activated]="item.activated">
        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}
      </a>
    </mdc-list>
  </mdc-drawer-content>
</mdc-drawer>
<div>
  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea,
  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.
  legere iriure blandit. Veri iisque accusamus an pri.
</div>`,
    ts: this.genericTS,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss`
  };
}
