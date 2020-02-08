import {OnInit, Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

interface Reference {
  name: string;
  url: string;
}

interface Tab {
  label?: string;
  route: string;
}

interface ComponentTemplate {
  title?: string;
  description?: string;
  references?: Reference[];
  code?: string;
  sass?: string;
  tabs?: Tab[];
}

@Component({
  selector: 'component-viewer',
  templateUrl: './component-viewer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ComponentViewer implements OnInit {
  defaultTabs = [{
    label: 'Api',
    route: './api'
  }, {
    label: 'Style Customization',
    route: './sass'
  }, {
    label: 'Examples',
    route: './examples'
  }];

  template: ComponentTemplate;

  ngOnInit() {
    if (!this.template.tabs) {
      this.template.tabs = this.defaultTabs;
    }
  }
}
