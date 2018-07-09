import { NgModule, Component, DebugElement } from '@angular/core';
import { inject, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcDialog,
  MdcDialogComponent,
  MdcDialogBody,
  MdcDialogModule,
  MdcDialogRef
} from '@angular-mdc/web';

describe('MdcDialog Service', () => {
  let dialog: MdcDialog;

  let dialogDebugElement: DebugElement;
  let dialogInstance = MdcDialogComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      providers: [MdcDialog]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog], (d: MdcDialog) => {
    dialog = d;
  }));

  it('#should open a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('should close a dialog and get back a result', fakeAsync(() => {
    let afterCloseCallback = jasmine.createSpy('afterClose callback');
    let dialogRef = dialog.open(SimpleDialog);

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    dialogRef.close('Pizza');

    expect(afterCloseCallback).toHaveBeenCalledWith('Pizza');
  }));

  it('#should close a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);

    expect(dialogRef.close('Pizza'));
  });

  it('#should close a service created dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);

    expect(dialog.close());
  });

  it('#should have click outside to close', () => {
    let dialogRef = dialog.open(SimpleDialog, {
      ariaLabel: 'test',
      ariaDescribedBy: 'testing',
      clickOutsideToClose: true,
      id: 'mydialog',
      data: { myData: 'test' }
    });

    expect(dialogRef.data.myData).toBe('test');
    expect(dialogRef.config).toBeDefined();

    dialogRef.close();
  });

  it('#should open dialog with no footer', () => {
    let dialogRef = dialog.open(DialogNoFooter);
    dialogRef.close();
  });

  it('#should not show second dialog', () => {
    let dialogRef = dialog.open(SimpleDialog, { id: 'mydialog' });
    dialog.open(SimpleDialog, { id: 'mydialog' });
    dialogRef.close();
  });

  it('#should handle keydown', () => {
    let dialogRef = dialog.open(DialogNoFooter);
    const event: Event = new KeyboardEvent('keydown', {
      'code': 'Escape'
    });

    // .dispatchEvent(event);
  });
});

describe('MdcDialogComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule],
      declarations: [SimpleDeclarativeDialog]
    });
    TestBed.compileComponents();
  }));

  describe('MdcDialogComponent', () => {
    let dialogDebugElement: DebugElement;
    let dialogNativeElement: HTMLElement;
    let dialogInstance: MdcDialogComponent;
    let testComponent: SimpleDeclarativeDialog;

    let DialogBodyDebugElement: DebugElement;
    let dialogBodyNativeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleDeclarativeDialog);
      fixture.detectChanges();

      dialogDebugElement = fixture.debugElement.query(By.directive(MdcDialogComponent));
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

    it('#should be open', () => {
      dialogInstance.show();
      fixture.detectChanges();
      expect(dialogInstance.isOpen()).toBe(true);
    });

    it('#should be closed', () => {
      dialogInstance.show();
      dialogInstance.close();
      fixture.detectChanges();
      expect(dialogInstance.isOpen()).toBe(false);
    });

    it('#should handle dialog accept', () => {
      dialogInstance.show();
      dialogInstance.accept();
      fixture.detectChanges();
      expect(dialogInstance.isOpen()).toBe(false);
    });

    it('#should handle dialog cancel', () => {
      dialogInstance.show();
      dialogInstance.cancel();
      fixture.detectChanges();
      expect(dialogInstance.isOpen()).toBe(false);
    });

    it('#should check if mdc-dialog is scrollable', () => {
      testComponent.isScrolling = true;
      fixture.detectChanges();
      expect(dialogBodyNativeElement.classList).toContain('mdc-dialog__body--scrollable');
    });
  });
});

@Component({
  template: `
  <mdc-dialog #mydialog>
    <mdc-dialog-surface>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Use Google's location service?
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body [scrollable]="true">
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </mdc-dialog-body>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="isCancel">Decline</button>
        <button mdc-dialog-button [accept]="isAccept" [action]="isAction">Accept</button>
      </mdc-dialog-footer>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
class SimpleDialog {
  constructor(public dialogRef: MdcDialogRef<SimpleDialog>) { }

  isCancel: boolean = true;
  isAction: boolean = true;
  isAccept: boolean = true;
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Use Google's location service?
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </mdc-dialog-body>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
class DialogNoFooter {
  constructor(public dialogRef: MdcDialogRef<DialogNoFooter>) { }
}

/** Simple component for testing. */
@Component({
  template: `
    <mdc-dialog [clickOutsideToClose]="true" [escapeToClose]="true">
      <mdc-dialog-surface>
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
      </mdc-dialog-surface>
    </mdc-dialog>
  `,
})
class SimpleDeclarativeDialog {
  isScrolling: boolean = false;
  isCancel: boolean = true;
  isAction: boolean = true;
  isAccept: boolean = true;
}

const TEST_DIRECTIVES = [
  SimpleDialog,
  DialogNoFooter
];

@NgModule({
  imports: [MdcDialogModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    SimpleDialog,
    DialogNoFooter
  ],
})
class DialogTestModule { }
