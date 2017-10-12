import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcList,
  MdcListItem,
  MdcListDivider,
  MdcListModule,
  MdcIconModule,
} from '../../../src/lib/public_api';

describe('MdcListItemDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcListModule, MdcIconModule],
      declarations: [
        SimpleList,
        TestDivider,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let testDebugElement: DebugElement[];
    let testItemEl: DebugElement;
    let testInstance: MdcListItem;
    let testComponent: SimpleList;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleList);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.queryAll(By.directive(MdcListItem));
      testItemEl = fixture.debugElement.query(By.css('.mdc-list-item'));
      testInstance = testDebugElement[0].componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-list-item class', () => {
      expect(testItemEl.nativeElement.classList)
        .toContain('mdc-list-item', 'Expected to have mdc-list-item css class');
    });
  });

  describe('MdcListDivider', () => {
    let testDebugElement: DebugElement[];
    let testItemEl: DebugElement;
    let testInstance: MdcListDivider;
    let testComponent: TestDivider;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDivider);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.queryAll(By.directive(MdcListDivider));
      testItemEl = fixture.debugElement.query(By.css('.mdc-list-divider'));
      testInstance = testDebugElement[0].componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-list-divider class', () => {
      expect(testItemEl.nativeElement.classList)
        .toContain('mdc-list-divider', 'Expected to have mdc-list-divider css class');
    });

    it('#should have mdc-list-divider--inset class', () => {
      testComponent.isInset = true;
      fixture.detectChanges();
      expect(testInstance.inset).toBe(true);

      expect(testItemEl.nativeElement.classList).toContain('mdc-list-divider--inset');
    });
  });
});

@Component({
  template:
  `
    <mdc-list-group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list [dense]="isDense">
        <a mdc-list-item mdc-list-item-start [disableRipple]="isRippleDisabled">Single-line item</a>
        <mdc-icon mdc-list-item-end>home</mdc-icon>
      </mdc-list>
    </mdc-list-group>
`
})
class SimpleList {
  isRippleDisabled: boolean = false;
  isDense: boolean = false;
}

@Component({
  template:
  `
  <mdc-list-divider [inset]="isInset"></mdc-list-divider>
  `
})
class TestDivider {
  isInset: boolean = false;
}
