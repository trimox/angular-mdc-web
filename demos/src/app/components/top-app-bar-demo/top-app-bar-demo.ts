import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class TopAppBarDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Top App Bar',
      `The top app bar displays information and actions relating to the current screen.`,
      "import { MdcTopAppBarModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: App bars: top',
      url: 'https://material.io/design/components/app-bars-top.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-top-app-bar/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  tabs = [
    { label: 'Flights', icon: 'airplanemode_active' },
    { label: 'Hotel', icon: 'hotel' },
    { label: 'Favorites', icon: 'favorite' }
  ];

  links = [
    { label: 'Inbox', icon: 'inbox' },
    { label: 'Star', icon: 'star' },
    { label: 'Sent Mail', icon: 'send' },
    { label: 'Drafts', icon: 'drafts' }
  ];

  text = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
  repudiandae dignissimos et quam velit autem mollitia tenetur,
  eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
  Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
  consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
  excepturi!`;
  lorems = Array(5).fill(this.text);

  exampleStandard = {
    html: `<mdc-top-app-bar [scrollTarget]="standardContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div class="demo-app-bar-content" #standardContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`
  };

  exampleFixed = {
    html: `<mdc-top-app-bar fixed [scrollTarget]="fixedContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div class="demo-app-bar-content" #fixedContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`
  };

  exampleProminent = {
    html: `<mdc-top-app-bar prominent>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleDense = {
    html: `<mdc-top-app-bar dense>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>print</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>bookmark</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleShort = {
    html: `<mdc-top-app-bar short [scrollTarget]="mainContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div #mainContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`,
    ts: `text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
repudiandae dignissimos et quam velit autem mollitia tenetur,
eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
excepturi!';
lorems = Array(5).fill(this.text);`
  };

  exampleShortCollapsed = {
    html: `<mdc-top-app-bar shortCollapsed>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>`
  };

  exampleTheme = {
    html: `<mdc-top-app-bar fixed class="demo-top-app-bar-themed" [scrollTarget]="themeContent">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon>
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>file_download</mdc-icon>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>
<div #themeContent>
  <p *ngFor="let lorem of lorems">{{lorem}}</p>
</div>`,
    sass: `.demo-top-app-bar-themed {
  @include mdc-top-app-bar-fill-color($material-color-yellow-800);
  @include mdc-top-app-bar-icon-ink-color($material-color-blue-900)
}`
  };

  exampleWithTabsDrawer = {
    html: `<mdc-top-app-bar class="demo-top-app-bar-with-tabs">
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section align="start" title="App">
      <button mdcTopAppBarNavIcon (click)="drawer.open = !drawer.open">
        <mdc-icon>menu</mdc-icon>
      </button>
    </mdc-top-app-bar-section>
    <mdc-top-app-bar-section align="end">
      <mdc-icon mdcTopAppBarActionItem>search</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem>notifications_none</mdc-icon>
      <mdc-icon mdcTopAppBarActionItem (click)="profileMenu.open = !profileMenu.open">more_vert</mdc-icon>
      <div mdcMenuSurfaceAnchor #menuAnchor>
        <mdc-menu #profileMenu [anchorElement]="menuAnchor">
          <mdc-list>
            <mdc-list-item>My Profile</mdc-list-item>
            <mdc-list-divider></mdc-list-divider>
            <mdc-list-item>Sign out</mdc-list-item>
          </mdc-list>
        </mdc-menu>
      </div>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
  <mdc-top-app-bar-row>
    <mdc-top-app-bar-section>
      <mdc-tab-bar>
        <mdc-tab-scroller>
          <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
        </mdc-tab-scroller>
      </mdc-tab-bar>
    </mdc-top-app-bar-section>
  </mdc-top-app-bar-row>
</mdc-top-app-bar>

<div class="demo-drawer-app-content">
  <mdc-drawer drawer="dismissible" #drawer>
    <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>
    <mdc-drawer-content>
      <mdc-list>
        <mdc-list-item *ngFor="let link of links">
          <mdc-icon mdcListItemGraphic>{{link.icon}}</mdc-icon>{{link.label}}
        </mdc-list-item>
      </mdc-list>
    </mdc-drawer-content>
  </mdc-drawer>
  <div mdcDrawerAppContent>
    Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam
    quo et. Diam phaedrum ei mea, quaeque
    voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo
    invidunt mel id, in vim dictas detraxit. Per an
    legere iriure blandit. Veri iisque accusamus an pri.
  </div>
</div>`,
    ts: `tabs = [
  { label: 'Flights', icon: 'airplanemode_active' },
  { label: 'Hotel', icon: 'hotel' },
  { label: 'Favorites', icon: 'favorite' }
];

links = [
  { label: 'Inbox', icon: 'inbox' },
  { label: 'Star', icon: 'star' },
  { label: 'Sent Mail', icon: 'send' },
  { label: 'Drafts', icon: 'drafts' }
];`,
    sass: `.demo-top-app-bar-with-tabs {
  @include mdc-top-app-bar-fill-color(#363640);

  .mdc-tab-bar {
    margin-top: 1em;

    @media (max-width: 599px) {
      margin-top: .5em;
    }

    .mdc-tab {
      @include mdc-tab-text-label-color(on-primary);
      @include mdc-tab-icon-color(on-primary);
    }

    .mdc-tab__ripple {
      @include mdc-states($material-color-blue-700);
    }

    .mdc-tab-indicator {
      @include mdc-tab-indicator-underline-color($material-color-blue-700);
      @include mdc-tab-indicator-underline-height(3px);
    }
  }
}

.demo-drawer-app-content {
  overflow: hidden;
  position: relative;
}`
  };
}
