import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcTabActivatedEvent} from '@angular-mdc/web/tab-bar';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class Tabs implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Tabs',
      description: 'Tabs organize content across different screens, data sets, and other interactions.',
      references: [{
        name: 'Material Design guidelines: Tabs',
        url: 'https://material.io/design/components/tabs.html'
      }, {
        name: 'Material Components Web: Tab Bar',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-bar/README.md'
      }, {
        name: 'Material Components Web: Tab Scroller',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-scroller/README.md'
      }, {
        name: 'Material Components Web: Tab',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab/README.md'
      }, {
        name: 'Material Components Web: Tab Indicator',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-indicator/README.md'
      }],
      mdcUrls: [
        {name: 'Tab Bar Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-bar/README.md#sass-mixins'},
        {name: 'Scroller Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-scroller/README.md#sass-mixins'},
        {name: 'Tab Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab/README.md#sass-mixins'},
        {name: 'Indicator Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-indicator/README.md#sass-mixins'},
      ],
      code: `import {MdcTabBarModule} from '@angular-mdc/web/tab-bar';`,
      sass: `@use '@material/tab-bar/mdc-tab-bar';
@use '@material/tab-bar';
@use '@material/tab-scroller/mdc-tab-scroller';
@use '@material/tab-scroller';
@use '@material/tab-indicator/mdc-tab-indicator';
@use '@material/tab-indicator';
@use '@material/tab/mdc-tab';
@use '@material/tab';`
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
          header: 'MdcTabBar',
          selectors: [
            'mdc-tab-bar',
          ],
          exportedAs: 'mdcTabBar',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'stacked: boolean', summary: `Indicates that the tab icon and label should flow vertically instead of horizontally.`},
                {name: 'fixed: boolean', summary: `Indicates that the tab should shrink in size to be as narrow as possible without causing text to wrap.`},
                {name: 'fade: boolean', summary: `Sets up the tab indicator to fade in on activation and fade out on deactivation. Default is false.`},
                {name: 'activeTabIndex: number', summary: `Set the active tab by index. (Default is 0). Set to -1 for no initially selected tab.`},
                {name: 'iconIndicator: string', summary: `A material icon to display in the center of the tab.`},
                {name: 'useAutomaticActivation: boolean', summary: `If true, permits using movement keys to switch tabs.`},
                {name: 'focusOnActivate: boolean', summary: `Sets whether the tab should focus itself when activated. Defaults to true.`},
                {
                  name: 'align: string', summary: `Sets the elements inside the scroll content element to be aligned to the start, center or end of the scroll content element.
                Valid values: 'start' | 'center' | 'end' * Only for Fixed Tabs.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'activateTab(index: number)', summary: `Activates the Tab at the given index.`},
                {name: 'scrollIntoView(index: number)', summary: `Scrolls the Tab at the given index into view.`},
                {name: 'getActiveTabIndex(): number', summary: `Returns the index of the active Tab.`},
                {name: 'getActiveTab(): MdcTab | undefined', summary: `Returns the MdcTab that is active.`},
                {name: 'getTabIndex(tab: MdcTab): number', summary: `Returns the MdcTab index for given tab.`},
                {name: 'disableTab(index: number, disabled: boolean)', summary: `Control whether or not the tab is in a disable state.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'activated: (source: MdcTabBar, index: number, tab: MdcTab)', summary: `Emitted when a tab is activated.`},
              ]
            },
          ]
        },
        {
          header: 'MdcTabBarScroller',
          selectors: [
            'mdc-tab-scroller',
          ],
          exportedAs: 'mdcTabBarScroller',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'scrollTo(scrollX: number)', summary: `Scrolls to the scrollX value.`},
                {name: 'incrementScroll(scrollXIncrement: number)	', summary: `Increments the current scroll value by the scrollX value.`},
                {name: 'getScrollPosition(): number', summary: `Returns the current visual scroll position.`},
              ]
            },
          ]
        },
        {
          header: 'MdcTab',
          selectors: [
            'mdc-tab',
          ],
          exportedAs: 'mdcTab',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'id: string', summary: `Unique id of the tab (auto generated if not supplied).`},
                {name: 'label: string', summary: `Optional. Adds a label in the tab.`},
                {name: 'icon: string', summary: `Optional. Indicates a leading icon in the tab.`},
                {name: 'disabled: boolean', summary: `Optional. Control the disabled state of the tab.`},
                {name: 'stacked: boolean', summary: `Indicates that the tab icon and label should flow vertically instead of horizontally.`},
                {name: 'fixed: boolean', summary: `Indicates that the tab should shrink in size to be as narrow as possible without causing text to wrap.`},
                {name: 'focusOnActivate: boolean', summary: `Sets whether the tab should focus itself when activated. Defaults to true.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'getTabBarParent(): MdcTabBarParentComponent', summary: `Interface for communicating with ancestor MdcTabBar.`},
                {name: 'focus(): void', summary: `Sets focus to the tab.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'interacted: (detail: MdcTab)', summary: `Emitted when a tab is interacted with.`},
              ]
            },
          ]
        },
        {
          header: 'MdcTabLabel',
          summary: 'Optional. Allows customizing a label in the tab.',
          selectors: [
            'mdc-tab-label',
            'mdcTabLabel'
          ],
          exportedAs: 'mdcTabLabel',
        },
        {
          header: 'MdcTabIcon',
          summary: 'Optional. Allows customizing a leading icon in the tab.',
          selectors: [
            'mdc-icon[mdcTabIcon]',
          ],
          exportedAs: 'mdcTabIcon',
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  tabs = [
    {label: 'Flights', icon: 'airplanemode_active'},
    {label: 'Hotel', icon: 'hotel'},
    {label: 'Favorites', icon: 'favorite'}
  ];

  scrollingTabs = [
    {label: 'Person', icon: 'person'},
    {label: 'Explore', icon: 'explore'},
    {label: 'Build', icon: 'build'},
    {label: 'Accessibility', icon: 'accessibility'},
    {label: 'Flights', icon: 'airplanemode_active'},
    {label: 'Hotel', icon: 'hotel'},
    {label: 'Favorites', icon: 'favorite'}
  ];

  logTab(event: MdcTabActivatedEvent): void {
    console.log(event.index);
  }

  addTab(): void {
    this.tabs.push({
      label: 'New Tab',
      icon: 'hotel'
    });
  }

  //
  // Examples
  //

  exampleTS = `tabs = [
  { label: 'Flights', icon: 'airplanemode_active' },
  { label: 'Hotel', icon: 'hotel' },
  { label: 'Favorites', icon: 'favorite' }
];`;

  exampleFullTS = `import { MdcTabActivatedEvent } from '@angular-mdc/web';

tabs = [
  { label: 'Flights', icon: 'airplanemode_active' },
  { label: 'Hotel', icon: 'hotel' },
  { label: 'Favorites', icon: 'favorite' }
];

logTab(event: MdcTabActivatedEvent): void {
  console.log(event.index);
}

addTab(): void {
  this.tabs.push({
    label: 'New Tab',
    icon: 'hotel'
  });
}`;

  exampleDynamicTabs = {
    html: `<mdc-tab-bar #example1 (activated)="logTab($event)" [activeTabIndex]="1" useAutomaticActivation>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>

<p>Activated tab: {{ example1.activeTabIndex }}</p>`,
    ts: this.exampleFullTS
  };

  exampleTabNoSelection = {
    html: `<mdc-tab-bar [activeTabIndex]="-1">
  <mdc-tab-scroller>
    <mdc-tab label="Flights"></mdc-tab>
    <mdc-tab label="Hotel"></mdc-tab>
    <mdc-tab label="Favorites"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  exampleIconOnLeft = {
    html: `<mdc-tab-bar>
  <mdc-tab-scroller>
    <mdc-tab>
      <mdc-icon mdcTabIcon>favorite</mdc-icon>
      <mdc-tab-label>Favorites</mdc-tab-label>
    </mdc-tab>
    <mdc-tab label="Flights" icon="airplanemode_active"></mdc-tab>
    <mdc-tab label="Hotel" icon="hotel"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`
  };

  exampleStacked = {
    html: `<mdc-tab-bar stacked>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  exampleTabFade = {
    html: `<mdc-tab-bar fade>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  exampleIconIndicatorLabels = {
    html: `<mdc-tab-bar iconIndicator='star'>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  exampleIconIndicator = {
    html: `<mdc-tab-bar iconIndicator='donut_large'>
  <mdc-tab-scroller>
    <mdc-tab icon="camera"></mdc-tab>
    <mdc-tab icon="accessibility"></mdc-tab>
    <mdc-tab icon="exit_to_app"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`
  };

  exampleFixedTabs = {
    html: `<mdc-tab-bar fixed>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  exampleScrollingTabs = {
    html: `<mdc-tab-bar>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of scrollingTabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: `scrollingTabs = [
  { label: 'Person', icon: 'person'},
  { label: 'Explore', icon: 'explore'},
  { label: 'Build', icon: 'build'},
  { label: 'Accessibility', icon: 'accessibility'},
  { label: 'Flights', icon: 'airplanemode_active' },
  { label: 'Hotel', icon: 'hotel' },
  { label: 'Favorites', icon: 'favorite' }
];`
  };

  exampleTabNoLabels = {
    html: `<mdc-tab-bar>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };
}
