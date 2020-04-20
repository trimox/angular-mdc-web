import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcDrawer',
          selectors: [
            'mdc-drawer',
          ],
          exportedAs: 'mdcDrawer',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: `drawer: string`, summary: `Set the drawer implementation. Valid values: dismissible | modal | empty`},
                {name: `open: boolean`, summary: `Opens or closes the drawer.`},
                {name: `fixedAdjustElement: any`, summary: `Optional. Reference to a drawer's attached body element.`},
                {name: `dir: string`, summary: `Optional. If value is 'rtl', drawer opens from the right side of the screen.`},
                {name: `autoFocus: boolean`, summary: `Whether the drawer should focus the first focusable element on open. (Default: true)`},
                {name: `restoreFocus: boolean`, summary: `Whether the drawer should restore focus to the previously-focused element, after it's closed. (Default: true)`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: `opened()`, summary: `Event dispatched on drawer open.`},
                {name: `closed()`, summary: `Event dispatched on drawer close.`},
                {name: `openedChange(opened: boolean)`, summary: `Event dispatched on drawer open state changes.`},
                {name: `drawerChange()`, summary: `Event dispatched when the drawer variant changes.`},
              ]
            },
          ]
        },
        {
          header: 'Focus Management',
          summary: `By default, the first element within the drawer will receive focus upon open. This can be configured by setting the cdkFocusInitial attribute on another focusable element or setting autoFocus to false.`,
          summaryCode: `<mdc-list-item cdkFocusInitial>
  <mdc-icon mdcListItemGraphic>star</mdc-icon>
  List item
</mdc-list-item>`
        },
        {
          header: 'MdcDrawerHeader',
          summary: 'Optional. Non-scrollable element that exists at the top of the drawer.',
          selectors: [
            'mdc-drawer-header',
          ],
          exportedAs: 'mdcDrawerHeader',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'title: string', summary: `Optional. Title text element of the drawer.`},
                {name: 'subtitle: string', summary: `Optional. Subtitle text element of the drawer.`},
              ]
            },
          ]
        },
        {
          header: 'MdcDrawerTitle',
          summary: 'Optional. Title text element of the drawer.',
          selectors: [
            'mdcDrawerTitle',
          ],
          exportedAs: 'mdcDrawerTitle',
        },
        {
          header: 'MdcDrawerSubtitle',
          summary: 'Optional. Subtitle text element of the drawer.',
          selectors: [
            'mdcDrawerSubtitle',
          ],
          exportedAs: 'mdcDrawerSubtitle',
        },
        {
          header: 'MdcDrawerContent',
          summary: 'Scrollable content area of the drawer',
          selectors: [
            'mdc-drawer-content',
            'mdcDrawerContent'
          ],
          exportedAs: 'mdcDrawerContent',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'dir: string', summary: `Optional. If value is 'rtl', content is displayed right to left.`},
              ]
            },
          ]
        },
        {
          header: 'MdcDrawerAppContent',
          summary: 'Mandatory for dismissible variant only. Sibling element that is resized when the drawer opens/closes.',
          selectors: [
            'mdcDrawerAppContent',
          ],
          exportedAs: 'mdcDrawerAppContent',
        },
      ]
    };
  }
}

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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-drawer/README.md#sass-mixins'},
      ],
      code: `import {MdcDrawerModule} from '@angular-mdc/web/drawer';`,
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
