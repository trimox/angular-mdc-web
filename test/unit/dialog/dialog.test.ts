import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcDialog, MdcDialogBody, MdcDialogModule } from '../../../src/lib/public_api';

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
    let dialogInstance: MdcDialog;
    let testComponent: SimpleDialog;

    let DialogBodyDebugElement: DebugElement;
    let dialogBodyNativeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleDialog);
      fixture.detectChanges();

      dialogDebugElement = fixture.debugElement.query(By.directive(MdcDialog));
      dialogNativeElement = dialogDebugElement.nativeElement;
      dialogInstance = dialogDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;

      DialogBodyDebugElement = fixture.debugElement.query(By.directive(MdcDialogBody));
      dialogBodyNativeElement = DialogBodyDebugElement.nativeElement;
    });

    it('#should have mdc-dialog by default', () => {
      expect(dialogDebugElement.nativeElement.classList)
        .toContain('mdc-dialog', 'Expected to have mdc-dialog');
    });

    it('#should check if mdc-dialog isOpen', () => {
      dialogInstance.isOpen();
      fixture.detectChanges();
    });

    it('#should check if mdc-dialog is scrollable', () => {
      testComponent.isScrolling = true;
      fixture.detectChanges();
      expect(dialogBodyNativeElement.classList).toContain('mdc-dialog__body--scrollable');
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
      <mdc-dialog-body [scrollable]="isScrolling">
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </mdc-dialog-body>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="isCancel">Decline</button>
        <button mdc-dialog-button [action]="isAction" [accept]="isAccept">Accept</button>
      </mdc-dialog-footer>
    </mdc-dialog>
  `,
})
class SimpleDialog {
  isScrolling: boolean = false;
  isCancel: boolean = true;
  isAction: boolean = true;
  isAccept: boolean = true;
}
