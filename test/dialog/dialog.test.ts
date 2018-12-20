import { NgModule, Directive, Component, Injector, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { inject, ComponentFixture, fakeAsync, TestBed, flush } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

import { dispatchKeyboardEvent, dispatchFakeEvent } from '../testing/dispatch-events';

import {
  ESCAPE,
  DOWN_ARROW,
  MdcDialog,
  MdcDialogModule,
  MdcDialogRef,
  OverlayContainer
} from '@angular-mdc/web';

describe('MdcDialog Service', () => {
  let dialog: MdcDialog;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let mockLocation: SpyLocation;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      providers: [{ provide: Location, useClass: SpyLocation }]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog, Location, OverlayContainer],
    (d: MdcDialog, l: Location, oc: OverlayContainer) => {
      dialog = d;
      mockLocation = l as SpyLocation;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('should open a dialog with a component', () => {
    const dialogRef = dialog.open(SimpleDialog, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance instanceof SimpleDialog).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();
    const dialogContainerElement = overlayContainerElement.querySelector('mdc-dialog')!;
    expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
  });

  it('should open a dialog with a template', () => {
    const templateRefFixture = TestBed.createComponent(ComponentWithTemplateRef);
    templateRefFixture.componentInstance.localValue = 'Bees';
    templateRefFixture.detectChanges();

    const data = { value: 'Knees' };

    const dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, { data });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
    expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();

    dialogRef.close();
  });

  it('#should open a simple dialog', fakeAsync(() => {
    const dialogRef = dialog.open(SimpleDialog);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    viewContainerFixture.detectChanges();
    flush();

    const actionButtonDebugElement = overlayContainerElement.querySelector('button');
    dispatchFakeEvent(actionButtonDebugElement, 'click');
    viewContainerFixture.detectChanges();
    flush();
  }));

  it('#should close using escape key', fakeAsync(() => {
    const dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();
    flush();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    viewContainerFixture.detectChanges();
    flush();
  }));

  it('#should open a simple dialog with options', fakeAsync(() => {
    const dialogRef = dialog.open(SimpleDialog, {
      clickOutsideToClose: false,
      escapeToClose: false,
      buttonsStacked: false
    });
    viewContainerFixture.detectChanges();
    flush();

    dispatchKeyboardEvent(overlayContainerElement, 'keydown', DOWN_ARROW);

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  }));

  it('should close a dialog and get back a result', fakeAsync(() => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');
    const dialogRef = dialog.open(SimpleDialog);

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    dialogRef.afterOpened().subscribe(afterCloseCallback);
    dialogRef.beforeClosed().subscribe(afterCloseCallback);
    dialogRef.close('Pizza');

    expect(afterCloseCallback).toHaveBeenCalledWith('Pizza');
  }));

  it('should complete open and close streams when the injectable is destroyed', fakeAsync(() => {
    const afterOpenedSpy = jasmine.createSpy('after opened spy');
    const afterAllClosedSpy = jasmine.createSpy('after all closed spy');
    const afterOpenedSubscription = dialog.afterOpened.subscribe({ complete: afterOpenedSpy });
    const afterAllClosedSubscription = dialog.afterAllClosed.subscribe({
      complete: afterAllClosedSpy
    });

    dialog.ngOnDestroy();

    expect(afterOpenedSpy).toHaveBeenCalled();
    expect(afterAllClosedSpy).toHaveBeenCalled();

    afterOpenedSubscription.unsubscribe();
    afterAllClosedSubscription.unsubscribe();
  }));

  it('#should close a simple dialog', () => {
    const dialogRef = dialog.open(SimpleDialog);
    expect(dialogRef.close('Pizza'));
  });

  it('#should throw error', () => {
    let dialogRef = dialog.open(SimpleDialog, {
      id: 'mydialog'
    });

    expect(() => {
      dialogRef = dialog.open(SimpleDialog, {
        id: 'mydialog'
      });
    }).toThrow();
  });

  it('should close all of the dialogs', fakeAsync(() => {
    dialog.open(PizzaMsg);
    dialog.open(PizzaMsg);
    dialog.open(PizzaMsg);

    expect(overlayContainerElement.querySelectorAll('mdc-dialog-portal').length).toBe(3);

    dialog.closeAll();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('mdc-dialog-portal').length).toBe(0);
  }));
});

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  selector: 'arbitrary-component-with-template-ref',
  template: `<ng-template let-data let-dialogRef="dialogRef">
      Cheese {{localValue}} {{data?.value}}{{setDialogRef(dialogRef)}}</ng-template>`,
})
class ComponentWithTemplateRef {
  localValue: string;
  dialogRef: MdcDialogRef<any>;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  setDialogRef(dialogRef: MdcDialogRef<any>): string {
    this.dialogRef = dialogRef;
    return '';
  }
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '<p>Pizza</p> <input> <button>Close</button>' })
class PizzaMsg {
  constructor(public dialogRef: MdcDialogRef<PizzaMsg>,
    public dialogInjector: Injector) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Use Google's location service?</mdc-dialog-title>
        <mdc-dialog-content>
          Let Google help apps determine location.
        </mdc-dialog-content>
        <mdc-dialog-actions stacked>
          <button mdcDialogButton mdcDialogAction="close">Decline</button>
          <button mdcDialogButton mdcDialogAction>Do Nothing</button>
          <button mdcDialogButton default mdcDialogAction="accept">Accept</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
class SimpleDialog {
  constructor(public dialogRef: MdcDialogRef<SimpleDialog>) { }
}

const TEST_DIRECTIVES = [
  SimpleDialog,
  PizzaMsg,
  ComponentWithTemplateRef,
  ComponentWithChildViewContainer,
  DirectiveWithViewContainer
];

@NgModule({
  imports: [MdcDialogModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    SimpleDialog,
    ComponentWithTemplateRef,
    PizzaMsg,
    ComponentWithChildViewContainer
  ],
})
class DialogTestModule { }
