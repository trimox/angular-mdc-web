import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcListComponent,
  MdcListItemDirective,
  MdcListDividerComponent,
  MdcListModule,
} from '../../../src/lib/public_api';

describe('MdcListItemDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcListModule],
      declarations: [
        SimpleList,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let listDebugElement: DebugElement[];
    let listItemEl: DebugElement;
    let listInstance: MdcListItemDirective;
    let testComponent: SimpleList;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleList);
      fixture.detectChanges();

      listDebugElement = fixture.debugElement.queryAll(By.directive(MdcListItemDirective));
      listItemEl = fixture.debugElement.query(By.css('.mdc-list-item'));
      listInstance = listDebugElement[0].componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-list-item class', () => {
      expect(listItemEl.nativeElement.classList)
        .toContain('mdc-list-item', 'Expected to have mdc-list-item css class');
    });

    // it('#should disable ripple', () => {
    //   testComponent.isRippleDisabled = true;
    //   fixture.detectChanges();
    //   expect(listInstance.disableRipple).toBeTruthy('Expected list item ripple to be disabled');
    // });
  });
});

@Component({
  template:
  `
    <mdc-list-group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list
       [dense]="isDense">
        <a mdc-list-item [disableRipple]="isRippleDisabled">Single-line item</a>
        <mdc-list-divider [inset]="isInset"></mdc-list-divider>
      </mdc-list>
    </mdc-list-group>
`
})
class SimpleList {
  isRippleDisabled: boolean = false;
  isDense: boolean = false;
  isInset: boolean = false;
}
