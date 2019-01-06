import { Component, ViewEncapsulation } from '@angular/core';

interface Reference {
  name: string;
  url: string;
}

interface Tab {
  label: string;
  route: string;
}

const DEFAULT_TABS = [{
  label: 'Api',
  route: './api'
}, {
  label: 'Sass Mixins',
  route: './sass'
}, {
  label: 'Examples',
  route: './examples'
}];

export class ComponentView {
  name: string;
  description: string;
  references?: Reference[];
  importCode: string;
  tabs: Tab[];

  constructor(name: string, description: string, importCode: string, tabs?: Tab[]) {
    this.name = name;
    this.description = description;
    this.importCode = importCode;
    this.tabs = tabs || DEFAULT_TABS;
  }
}

@Component({
  selector: 'component-viewer',
  templateUrl: './component-viewer.html',
  encapsulation: ViewEncapsulation.None
})
export class ComponentViewer {
  componentView: ComponentView;
}
