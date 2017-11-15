import { NgModule, Component, Directive, DebugElement, ViewContainerRef, Injector, ViewChild, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { async, inject, tick, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import {
  MDC_DIALOG_DATA,
  MdcDialog,
  MdcDialogComponent,
  MdcDialogBody,
  MdcDialogModule,
  MdcDialogRef,
} from '../../../src/lib/public_api';
import { OverlayContainer } from '../../../src/lib/cdk/overlay/index';

describe('MdcDialog', () => {
  let dialog: MdcDialog;
  let overlayContainerElement: HTMLElement;

  let dialogDebugElement: DebugElement;
  let dialogInstance = MdcDialogComponent;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let mockLocation: SpyLocation;

  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        },
        { provide: Location, useClass: SpyLocation }
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog, Location], (dg: MdcDialog, l: Location) => {
    dialog = dg;
    mockLocation = l as SpyLocation;
  }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('#should open a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();
  });

  it('#should open a dialog with a component and no ViewContainerRef', () => {
    let dialogRef = dialog.open(SimpleDialog);

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance instanceof SimpleDialog).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('#should use injector from viewContainerRef for DialogInjector', () => {
    let dialogRef = dialog.open(SimpleDialog, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    let dialogInjector = dialogRef.componentInstance.dialogInjector;

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    expect(dialogInjector.get<DirectiveWithViewContainer>(DirectiveWithViewContainer)).toBeTruthy(
      'Expected the dialog component to be created with the injector from the viewContainerRef.'
    );
  });

  it('#should close a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.myDialog.close());
  });

  it('#should signal an accept on a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.myDialog.accept());
    expect(dialogRef.componentInstance.myDialog.isOpen()).toBe(false);
  });

  it('#should signal an cancel on a simple dialog', () => {
    let dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.myDialog.cancel());
    expect(dialogRef.componentInstance.myDialog.isOpen()).toBe(false);
  });

  it('#should have click outside to close', () => {
    let dialogRef = dialog.open(SimpleDialog, { clickOutsideToClose: true });
    viewContainerFixture.detectChanges();
    dialogRef.close();
  });

  it('#should open dialog with no footer', () => {
    let dialogRef = dialog.open(DialogNoFooter);
    viewContainerFixture.detectChanges();
    dialogRef.close();
  });
});

describe('MdcDialogComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule],
      declarations: [
        SimpleDeclarativeDialog,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
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

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container *ngIf="childComponentExists"></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  childComponentExists: boolean = true;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

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
  @ViewChild('mydialog') myDialog: MdcDialogComponent;
  constructor(public dialogRef: MdcDialogRef<SimpleDialog>,
    public dialogInjector: Injector) { }

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
  constructor(public dialogRef: MdcDialogRef<SimpleDialog>) { }
}

/** Simple component for testing. */
@Component({
  template: `
    <mdc-dialog [clickOutsideToClose]="true" [escapeToClose]="true">
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
class SimpleDeclarativeDialog {
  isScrolling: boolean = false;
  isCancel: boolean = true;
  isAction: boolean = true;
  isAccept: boolean = true;
}

const TEST_DIRECTIVES = [
  ComponentWithChildViewContainer,
  DirectiveWithViewContainer,
  SimpleDialog,
  DialogNoFooter,
];

@NgModule({
  imports: [CommonModule, MdcDialogModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents:
    [
      ComponentWithChildViewContainer,
      SimpleDialog,
      DialogNoFooter,
    ],
})
class DialogTestModule { }
