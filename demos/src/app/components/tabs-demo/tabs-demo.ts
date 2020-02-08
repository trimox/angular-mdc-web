import {Component, OnInit, ViewChild} from '@angular/core';

import {MdcTabActivatedEvent} from '@angular-mdc/web';
import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class TabsDemo implements OnInit {
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
      code: `import {MdcTabBarModule} from '@angular-mdc/web';`,
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

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

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

  example1 = {
    html: `<mdc-tab-bar #example1 (activated)="logTab($event)" [activeTabIndex]="1" useAutomaticActivation>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>

<p>Activated tab: {{ example1.activeTabIndex }}</p>`,
    ts: this.exampleFullTS
  };

  example2 = {
    html: `<mdc-tab-bar [activeTabIndex]="-1">
  <mdc-tab-scroller>
    <mdc-tab label="Flights"></mdc-tab>
    <mdc-tab label="Hotel"></mdc-tab>
    <mdc-tab label="Favorites"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  example3 = {
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

  example4 = {
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

  example5 = {
    html: `<mdc-tab-bar iconIndicator='star'>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  example6 = {
    html: `<mdc-tab-bar fixed>
  <mdc-tab-scroller>
    <mdc-tab *ngFor="let tab of tabs" [label]="tab.label" [icon]="tab.icon"></mdc-tab>
  </mdc-tab-scroller>
</mdc-tab-bar>`,
    ts: this.exampleTS
  };

  example7 = {
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
}
