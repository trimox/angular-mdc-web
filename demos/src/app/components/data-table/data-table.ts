import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';
import {MDCDataTableRowSelectionChangedEvent} from '@angular-mdc/web/data-table';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MDCDataTable',
          selectors: [
            'mdc-data-table'
          ],
          exportedAs: 'mdcDataTable',
          categories: [
            {
              name: 'Methods',
              items: [
                {name: 'layoutAsync(): Promise', summary: `Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table. Use this if registering checkbox is asynchronous.`},
                {name: 'layout()', summary: `Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.`},
                {name: 'getHeaderCheckbox(): MdcCheckbox | undefined', summary: `Retrieve a reference to the header row checkbox.`},
                {name: 'getRows(): MDCDataTableRow[]', summary: `Return an array of all MDCDataTableRow objects.`},
                {
                  name: `getSelectedRowIds():
                Array<string | null>`, summary: `Returns array of selected row ids.`
                },
                {name: 'setSelectedRowIds(rowIds: string[])', summary: `Array of row ids that needs to be selected.`},
                {name: 'showProgress()', summary: `Shows progress indicator when data table is in loading state.`},
                {name: 'hideProgress()', summary: `Hides progress indicator when data table is finished loading.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {
                  name: 'selectionChanged: MDCDataTableRowSelectionChangedEvent', summary: `Event emitted when row checkbox is checked or unchecked.`,
                  summaryCode: `MDCDataTableRowSelectionChangedEvent {
  index: number;
  id: string | null;
  selected: boolean;
}`
                },
                {name: 'selectedAll', summary: `Event emitted when header row checkbox is checked.`},
                {name: 'unselectedAll', summary: `Event emitted when header row checkbox is unchecked.`},
              ]
            },
          ]
        },
        {
          header: 'MDCDataTableTable',
          summary: 'Mandatory. Table element. Added to table HTML tag.',
          selectors: ['mdcDataTableTable'],
          exportedAs: 'mdcDataTableTable',
        },
        {
          header: 'MDCDataTableHeaderRow',
          summary: 'Mandatory. Table header row element. Added to thead > tr HTML tag.',
          selectors: ['mdcDataTableHeaderRow'],
          exportedAs: 'mdcDataTableHeaderRow',
        },
        {
          header: 'MDCDataTableHeaderCell',
          selectors: ['mdcDataTableHeaderCell'],
          exportedAs: 'mdcDataTableHeaderCell',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'numeric: boolean', summary: `Optional. Table header cell element that maps to numeric cells.`},
              ]
            }
          ],
        },
        {
          header: 'MDCDataTableContent',
          summary: 'Mandatory. Table body element. Added to tbody HTML tag.',
          selectors: ['mdcDataTableContent'],
          exportedAs: 'mdcDataTableContent',
        },
        {
          header: 'MDCDataTableRow',
          selectors: ['mdcDataTableRow'],
          exportedAs: 'mdcDataTableRow',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'selected: boolean', summary: `Optional. Modifier class added to mdc-data-table__row when table row is selected.`},
              ]
            }
          ],
        },
        {
          header: 'MDCDataTableCell',
          selectors: ['mdcDataTableCell'],
          exportedAs: 'mdcDataTableCell',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'checkbox: boolean', summary: `Optional. Table cell element that contains mdc-checkbox.`},
                {name: 'numeric: boolean', summary: `Optional. Table cell element that maps to numeric cells.`},
              ]
            }
          ],
        },
      ]
    };
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class DataTable implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Data Table',
      description: `Data tables display information in a grid-like format of rows and columns. 
      They organize information in a way that's easy to scan, so that users can look for patterns and insights.`,
      references: [{
        name: 'Material Design guidelines: Data Tables',
        url: 'https://material.io/design/components/data-tables.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-data-table/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-data-table/README.md#sass-mixins'},
      ],
      code: `import {MDCDataTableModule} from '@angular-mdc/web/data-table';`,
      sass: `@use '@material/data-table/mdc-data-table';
@use '@material/data-table';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  desserts = [
    {checked: false, name: 'Frozen yogurt', calories: 159, carbs: 24, protein: 4, comment: 'Super tasty'},
    {checked: true, name: 'Ice cream sandwich', calories: 237, carbs: 37, protein: 4.3, comment: 'I like ice cream more'},
    {checked: false, name: 'Eclair', calories: 262, carbs: 16, protein: 6, comment: 'New filling flavor'}
  ];

  selectionChangedEvent: MDCDataTableRowSelectionChangedEvent;
  onSelectionChanged(event: MDCDataTableRowSelectionChangedEvent): void {
    this.selectionChangedEvent = event;
    this.desserts[event.index].checked = event.selected;
  }

  onSelectedAll(): void {
    this.desserts.forEach(_ => _.checked = true);
  }

  onUnselectedAll(): void {
    this.desserts.forEach(_ => _.checked = false);
  }

  //
  // Examples
  //

  exampleDessertsArray = `desserts = [
  {checked: false, name: 'Frozen yogurt', calories: 159, carbs: 24, protein: 4, comment: 'Super tasty'},
  {checked: true, name: 'Ice cream sandwich', calories: 237, carbs: 37, protein: 4.3, comment: 'I like ice cream more'},
  {checked: false, name: 'Eclair', calories: 262, carbs: 16, protein: 6, comment: 'New filling flavor'}
];`;

  exampleStandard = {
    html: `<mdc-data-table>
  <table mdcDataTableTable>
    <thead>
      <tr mdcDataTableHeaderRow>
        <th mdcDataTableHeaderCell>Dessert</th>
        <th mdcDataTableHeaderCell numeric>Calories</th>
        <th mdcDataTableHeaderCell numeric>Carbs</th>
        <th mdcDataTableHeaderCell numeric>Protein (g)</th>
        <th mdcDataTableHeaderCell>Comments</th>
      </tr>
    </thead>
    <tbody mdcDataTableContent>
      <tr mdcDataTableRow *ngFor="let dessert of desserts">
        <td mdcDataTableCell>{{dessert.name}}</td>
        <td mdcDataTableCell numeric>{{dessert.calories}}</td>
        <td mdcDataTableCell numeric>{{dessert.carbs}}</td>
        <td mdcDataTableCell numeric>{{dessert.protein}}</td>
        <td mdcDataTableCell>{{dessert.comment}}</td>
      </tr>
    </tbody>
  </table>
</mdc-data-table>`,
    ts: this.exampleDessertsArray
  };

  exampleRowSelection = {
    html: `<mdc-data-table (selectionChanged)="onSelectionChanged($event)"
  (selectedAll)="onSelectedAll()" (unselectedAll)="onUnselectedAll()">
  <table mdcDataTableTable>
    <thead>
      <tr mdcDataTableHeaderRow>
        <th mdcDataTableHeaderCell>
          <mdc-checkbox></mdc-checkbox>
        </th>
        <th mdcDataTableHeaderCell>Dessert</th>
        <th mdcDataTableHeaderCell numeric>Calories</th>
        <th mdcDataTableHeaderCell numeric>Carbs</th>
        <th mdcDataTableHeaderCell numeric>Protein (g)</th>
        <th mdcDataTableHeaderCell>Comments</th>
      </tr>
    </thead>
    <tbody mdcDataTableContent>
      <tr mdcDataTableRow *ngFor="let dessert of desserts" [selected]="dessert.checked">
        <td mdcDataTableCell>
          <mdc-checkbox [checked]="dessert.checked"></mdc-checkbox>
        </td>
        <td mdcDataTableCell>{{dessert.name}}</td>
        <td mdcDataTableCell numeric>{{dessert.calories}}</td>
        <td mdcDataTableCell numeric>{{dessert.carbs}}</td>
        <td mdcDataTableCell numeric>{{dessert.protein}}</td>
        <td mdcDataTableCell>{{dessert.comment}}</td>
      </tr>
    </tbody>
  </table>
</mdc-data-table>`,
    ts: `${this.exampleDessertsArray}

onSelectionChanged(event: MDCDataTableRowSelectionChangedEvent): void {
  this.selectionChangedEvent = event;
  this.desserts[event.index].checked = event.selected;
}

onSelectedAll(): void {
  this.desserts.forEach(_ => _.checked = true);
}

onUnselectedAll(): void {
  this.desserts.forEach(_ => _.checked = false);
}`
  };
}
