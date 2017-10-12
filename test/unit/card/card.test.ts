import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcCardModule,
  MdcCardComponent,
} from '../../../src/lib/public_api';

describe('MdcCardComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcCardModule,
      ],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcCardComponent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcCardComponent));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-card by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-card');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-card>
      <mdc-card-horizontal>
        <mdc-card-primary>
          <mdc-card-title>Title</mdc-card-title>
          <h2 mdc-card-subtitle>Subtitle</h2>
        </mdc-card-primary>
        <mdc-card-supporting-text>Test</mdc-card-supporting-text>
        <img mdc-card-media-item [size]="2" />
      </mdc-card-horizontal>
      <mdc-card-actions>
        <button mdc-card-button>Action 1</button>
        <button mdc-card-button>Action 2</button>
      </mdc-card-actions>
    </mdc-card>
  `,
})
class SimpleTest {
}
