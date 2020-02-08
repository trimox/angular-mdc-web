import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';
import {MDCDataTableRowSelectionChangedEvent} from '@angular-mdc/web';

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({template: '<component-viewer></component-viewer>'})
export class DataTableDemo implements OnInit {
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
      code: `import {MDCDataTableModule} from '@angular-mdc/web';`,
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
