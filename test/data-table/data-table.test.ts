import {Component, DebugElement, ViewChild} from '@angular/core';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {
  MDCDataTableModule,
  MdcCheckboxModule,
  MDCDataTable,
  MdcCheckbox,
} from '@angular-mdc/web';

describe('MDCDataTable', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MDCDataTableModule, MdcCheckboxModule],
      declarations: [
        SimpleTest,
        TestHeaders
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MDCDataTable;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MDCDataTable));

      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-data-table by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-data-table');
    });

    it('#should return rows', () => {
      expect(testInstance.getRows()).toBeDefined();
    });

    it('#should return no selected rows', () => {
      expect(testInstance.getSelectedRowIds()).toBeDefined(false);
    });

    it('#should return native element', () => {
      expect(testInstance.getRows()[0].getNativeElement()).toBeDefined();
    });
  });

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MDCDataTable;
    let testComponent: TestHeaders;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHeaders);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MDCDataTable));

      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-data-table by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-data-table');
    });

    it('set the checkbox', () => {
      testComponent.checkbox = true;
      fixture.detectChanges();
    });

    it('check the header row checkbox', () => {
      testInstance.getHeaderCheckbox().checked = true;
      fixture.detectChanges();
    });

    it('uncheck the header row checkbox', () => {
      testInstance.getHeaderCheckbox().checked = false;
      fixture.detectChanges();
    });

    it('check the first row checkbox', () => {
      testInstance.getRows()[0].selected = true;
      fixture.detectChanges();
    });

    it('uncheck the first row checkbox', () => {
      testInstance.getRows()[0].selected = true;
      fixture.detectChanges();
    });

    it('call layout()', () => {
      testInstance.layout();
      fixture.detectChanges();
    });

    it('should set selected to first row', () => {
      testInstance.setSelectedRowIds(['mdc-data-table-row-0']);
      fixture.detectChanges();
    });

    it('should emit selectedAll event', () => {
      spyOn(testComponent, 'onSelectedAll');
      fixture.detectChanges();

      testComponent.headerCheckbox._inputElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onSelectedAll).toHaveBeenCalledTimes(1);
    });

    it('should emit unselectedAll event', () => {
      spyOn(testComponent, 'onUnselectedAll');
      fixture.detectChanges();

      testComponent.headerCheckbox._inputElement.nativeElement.click();
      testComponent.headerCheckbox._inputElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onUnselectedAll).toHaveBeenCalledTimes(1);
    });
  });
});

@Component({
  template: `
  <mdc-data-table>
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
        <tr mdcDataTableRow selected>
          <td mdcDataTableCell>Frozen yogurt</td>
          <td mdcDataTableCell numeric>159</td>
          <td mdcDataTableCell numeric>24</td>
          <td mdcDataTableCell numeric>4</td>
          <td mdcDataTableCell>Super tasty</td>
        </tr>
      </tbody>
    </table>
  </mdc-data-table>
  `,
})
class SimpleTest {
  numeric: boolean = true;
}

@Component({
  template: `
  <mdc-data-table (selectionChanged)="onSelectionChanged($event)"
  (selectedAll)="onSelectedAll()" (unselectedAll)="onUnselectedAll()">
    <table mdcDataTableTable>
      <thead>
        <tr mdcDataTableHeaderRow>
          <th mdcDataTableHeaderCell>
            <mdc-checkbox #headerCheckbox></mdc-checkbox>
          </th>
          <th mdcDataTableHeaderCell>Dessert</th>
          <th mdcDataTableHeaderCell numeric>Calories</th>
          <th mdcDataTableHeaderCell numeric>Carbs</th>
          <th mdcDataTableHeaderCell numeric>Protein (g)</th>
          <th mdcDataTableHeaderCell>Comments</th>
        </tr>
      </thead>
      <tbody mdcDataTableContent>
        <tr mdcDataTableRow [selected]="selected">
          <td mdcDataTableCell [checkbox]="checkbox">
            <mdc-checkbox #rowCheckbox></mdc-checkbox>
          </td>
          <td mdcDataTableCell>Frozen yogurt</td>
          <td mdcDataTableCell numeric>159</td>
          <td mdcDataTableCell numeric>24</td>
          <td mdcDataTableCell numeric>4</td>
          <td mdcDataTableCell>Super tasty</td>
        </tr>
      </tbody>
    </table>
  </mdc-data-table>
  `,
})
class TestHeaders {
  numeric: boolean = true;
  checkbox: boolean = false;
  selected: boolean = false;

  @ViewChild('headerCheckbox', {static: false}) headerCheckbox: MdcCheckbox;
  @ViewChild('rowCheckbox', {static: false}) rowCheckbox: MdcCheckbox;

  onSelectionChanged: (event?: any) => void = () => {};
  onSelectedAll: () => void = () => {};
  onUnselectedAll: () => void = () => {};
}
