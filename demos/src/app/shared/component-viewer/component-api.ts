import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

interface DocItem {
  name?: string;
  summary?: string;
  summaryCode?: string;
}

interface DocCategory {
  /** Display name (e.g.: Properties, Methods etc..). */
  name?: string;
  summary?: string;
  items?: DocItem[];
}

interface DocSection {
  header?: string;
  summary?: string;
  summaryCode?: string;
  selectors?: string[];
  exportedAs?: string;
  categories?: DocCategory[];
}

interface DocApi {
  sections?: DocSection[];
}

@Component({
  selector: 'component-api',
  templateUrl: './component-api.html',
  styleUrls: ['./component-api.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ComponentApi {
  docApi: DocApi;
}
