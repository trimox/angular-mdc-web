import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcDialogComponent, MdcDialogModule } from '../../../src/lib/public_api';

describe('MdcDialogComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule],
      declarations: [
        SimpleDialog,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let dialogDebugElement: DebugElement;
    let dialogNativeElement: HTMLElement;
    let dialogInstance: MdcDialogComponent;
    let testComponent: SimpleDialog;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleDialog);
      fixture.detectChanges();

      dialogDebugElement = fixture.debugElement.query(By.directive(MdcDialogComponent));
      dialogNativeElement = dialogDebugElement.nativeElement;
      dialogInstance = dialogDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-dialog by default', () => {
      expect(dialogDebugElement.nativeElement.classList)
        .toContain('mdc-dialog', 'Expected to have mdc-dialog');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-dialog>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Use Google's location service?
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </mdc-dialog-body>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="true">Decline</button>
        <button mdc-dialog-button [action]="true" [accept]="true">Accept</button>
      </mdc-dialog-footer>
    </mdc-dialog>
  `,
})
class SimpleDialog {
}
