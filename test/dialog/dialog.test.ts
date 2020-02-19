import {
  NgModule, Directive, Component, Inject,
  Injector, TemplateRef, ViewContainerRef, ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import {async, inject, flush, fakeAsync, flushMicrotasks, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {DOWN_ARROW, ESCAPE, TAB} from '@angular/cdk/keycodes';
import {Platform} from '@angular/cdk/platform';

import {dispatchKeyboardEvent, dispatchFakeEvent} from '../testing/dispatch-events';

import {
  MdcDialog,
  MDC_DIALOG_DATA,
  MdcDialogModule,
  MdcDialogComponent,
  MdcDialogRef,
  MdcDialogButton,
  MdcDialogAction,
  MdcListModule,
  MdcIconModule
} from '@angular-mdc/web';
import {OverlayContainer} from '@angular/cdk/overlay';

describe('MdcDialog Service', () => {
  let dialog: MdcDialog;
  let platform: {isBrowser: boolean};
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = {isBrowser: true};

    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      providers: [
        {provide: Platform, useFactory: () => platform}
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog, OverlayContainer],
    (d: MdcDialog, oc: OverlayContainer) => {
      dialog = d;
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

    const data = {value: 'Knees'};

    const dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, {data});

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
    expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();

    dialogRef.close();
  });

  it('#should open a simple dialog', () => {
    const dialogRef = dialog.open(SimpleDialog);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    viewContainerFixture.detectChanges();

    const actionButtonDebugElement = overlayContainerElement.querySelector('button');
    dispatchFakeEvent(actionButtonDebugElement, 'click');
    viewContainerFixture.detectChanges();
  });

  it('#should close using escape key', () => {
    dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    viewContainerFixture.detectChanges();
  });

  it('#should have "close" for button action', () => {
    const dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.buttonAction).toBe('close');
  });

  it('#should handle layout()', () => {
    const dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    dialogRef.componentInstance.dialogComponent.layout();
  });

  it('#should handle click event', () => {
    const dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    dialogRef.componentInstance.dialogComponent.elementRef.nativeElement.click();
    viewContainerFixture.detectChanges();
  });

  it('#should handle keydown event', () => {
    const dialogRef = dialog.open(SimpleDialog);
    viewContainerFixture.detectChanges();

    dispatchKeyboardEvent(dialogRef.componentInstance.dialogComponent.elementRef.nativeElement, 'keydown', TAB);
    viewContainerFixture.detectChanges();
  });

  it('#should have null for button action', () => {
    const dialogRef = dialog.open(SimpleDialog);
    dialogRef.componentInstance.buttonAction = null;
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.buttonAction).toBe(null);
  });

  it('#should handle default button click', () => {
    dialog.open(DialogWithDefaultButton);
    viewContainerFixture.detectChanges();

    const actionButtonDebugElement = overlayContainerElement.querySelector('button');
    dispatchFakeEvent(actionButtonDebugElement, 'click');

    viewContainerFixture.detectChanges();
  });

  it('#should have button with accept action', () => {
    const dialogRef = dialog.open(DialogWithDefaultButton);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.dialogActionButton.action).toBe('accept');
  });

  it('#should open a dialog with no buttons', () => {
    dialog.open(DialogWithNoButtons);
    viewContainerFixture.detectChanges();
  });

  it('#should open a simple dialog with options', () => {
    const dialogRef = dialog.open(SimpleDialog, {
      clickOutsideToClose: false,
      escapeToClose: false,
      buttonsStacked: false,
      autoFocus: false
    });
    viewContainerFixture.detectChanges();

    dispatchKeyboardEvent(overlayContainerElement, 'keydown', DOWN_ARROW);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
  });

  it('should restore `aria-hidden` to the overlay container siblings on close', fakeAsync(() => {
    const sibling = document.createElement('div');

    sibling.setAttribute('aria-hidden', 'true');
    overlayContainerElement.parentNode!.appendChild(sibling);

    const dialogRef = dialog.open(PizzaMsg, {viewContainerRef: testViewContainerRef});
    viewContainerFixture.detectChanges();
    flush();

    expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to be hidden.');

    dialogRef.close();
    viewContainerFixture.detectChanges();
    flush();

    expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to remain hidden.');
    sibling.parentNode!.removeChild(sibling);
  }));

  it('should not set `aria-hidden` on `aria-live` elements', fakeAsync(() => {
    const sibling = document.createElement('div');

    sibling.setAttribute('aria-live', 'polite');
    overlayContainerElement.parentNode!.appendChild(sibling);

    dialog.open(PizzaMsg, {viewContainerRef: testViewContainerRef});
    viewContainerFixture.detectChanges();
    flush();

    expect(sibling.hasAttribute('aria-hidden'))
      .toBe(false, 'Expected live element not to be hidden.');
    sibling.parentNode!.removeChild(sibling);
  }));

  it('should be able to pass in an alternate ComponentFactoryResolver',
    inject([ComponentFactoryResolver], (resolver: ComponentFactoryResolver) => {
      spyOn(resolver, 'resolveComponentFactory').and.callThrough();

      dialog.open(PizzaMsg, {
        viewContainerRef: testViewContainerRef,
        componentFactoryResolver: resolver
      });
      viewContainerFixture.detectChanges();

      expect(resolver.resolveComponentFactory).toHaveBeenCalled();
    }));

  it('should notify the observers if all open dialogs have finished closing', fakeAsync(() => {
    const ref1 = dialog.open(PizzaMsg, {viewContainerRef: testViewContainerRef});
    const ref2 = dialog.open(SimpleDialog, {viewContainerRef: testViewContainerRef});
    const spy = jasmine.createSpy('afterAllClosed spy');

    dialog.afterAllClosed.subscribe(spy);

    ref1.close();
    viewContainerFixture.detectChanges();
    flush();

    expect(spy).not.toHaveBeenCalled();

    ref2.close();
    viewContainerFixture.detectChanges();
    flush();
    expect(spy).toHaveBeenCalled();
  }));

  it('should close a dialog and get back a result', () => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');
    const dialogRef = dialog.open(SimpleDialog);

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    dialogRef.afterOpened().subscribe(afterCloseCallback);
    dialogRef.beforeClosed().subscribe(afterCloseCallback);
    dialogRef.close('Pizza');

    expect(afterCloseCallback).toHaveBeenCalledWith('Pizza');
  });

  it('should emit the afterAllClosed stream on subscribe if there are no open dialogs', () => {
    const spy = jasmine.createSpy('afterAllClosed spy');

    dialog.afterAllClosed.subscribe(spy);

    expect(spy).toHaveBeenCalled();
  });

  it('should complete open and close streams when the injectable is destroyed', () => {
    const afterOpenedSpy = jasmine.createSpy('after opened spy');
    const afterAllClosedSpy = jasmine.createSpy('after all closed spy');
    const afterOpenedSubscription = dialog.afterOpened.subscribe({complete: afterOpenedSpy});
    const afterAllClosedSubscription = dialog.afterAllClosed.subscribe({
      complete: afterAllClosedSpy
    });

    dialog.ngOnDestroy();

    expect(afterOpenedSpy).toHaveBeenCalled();
    expect(afterAllClosedSpy).toHaveBeenCalled();

    afterOpenedSubscription.unsubscribe();
    afterAllClosedSubscription.unsubscribe();
  });

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

  it('should close all of the dialogs', () => {
    dialog.open(PizzaMsg);
    dialog.open(PizzaMsg);
    dialog.open(PizzaMsg);

    expect(overlayContainerElement.querySelectorAll('mdc-dialog-portal').length).toBe(3);

    dialog.closeAll();
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('mdc-dialog-portal').length).toBe(0);
  });

  it('should have the componentInstance available in the afterClosed callback', fakeAsync(() => {
    const dialogRef = dialog.open(PizzaMsg);
    const spy = jasmine.createSpy('afterClosed spy');

    flushMicrotasks();
    viewContainerFixture.detectChanges();
    flushMicrotasks();

    dialogRef.afterClosed().subscribe(() => {
      spy();
      expect(dialogRef.componentInstance).toBeTruthy('Expected component instance to be defined.');
    });

    dialogRef.close();

    flushMicrotasks();
    viewContainerFixture.detectChanges();
    tick(500);

    // Ensure that the callback actually fires.
    expect(spy).toHaveBeenCalled();
  }));

  describe('passing in data', () => {
    it('should be able to pass in data', () => {
      const config = {
        data: {
          stringParam: 'hello',
          dateParam: new Date()
        }
      };

      const instance = dialog.open(DialogWithInjectedData, config).componentInstance;

      expect(instance.data.stringParam).toBe(config.data.stringParam);
      expect(instance.data.dateParam).toBe(config.data.dateParam);
    });

    it('should default to null if no data is passed', () => {
      expect(() => {
        const dialogRef = dialog.open(DialogWithInjectedData);
        expect(dialogRef.componentInstance.data).toBeNull();
      }).not.toThrow();
    });
  });
});

describe('Tests for SSR', () => {
  let platform: {isBrowser: boolean};

  let dialog: MdcDialog;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  beforeEach(fakeAsync(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = {isBrowser: false};

    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      providers: [
        {provide: Platform, useFactory: () => platform}
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog, OverlayContainer],
    (d: MdcDialog, oc: OverlayContainer) => {
      dialog = d;
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

  it('should default to null if no data is passed', () => {
    const dialogRef = dialog.open(SimpleDialog, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    viewContainerFixture.detectChanges();

    const actionButtonDebugElement = overlayContainerElement.querySelector('button');
    dispatchFakeEvent(actionButtonDebugElement, 'click');
    viewContainerFixture.detectChanges();
  });
});

describe('MdcDialog with a parent MdcDialog', () => {
  let parentDialog: MdcDialog;
  let childDialog: MdcDialog;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<ComponentThatProvidesMdcDialog>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcDialogModule, DialogTestModule],
      declarations: [ComponentThatProvidesMdcDialog],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return {getContainerElement: () => overlayContainerElement};
          }
        }
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcDialog], (d: MdcDialog) => {
    parentDialog = d;

    fixture = TestBed.createComponent(ComponentThatProvidesMdcDialog);
    childDialog = fixture.componentInstance.dialog;
    fixture.detectChanges();
  }));

  afterEach(() => {
    overlayContainerElement.innerHTML = '';
  });

  it('should close dialogs opened by a parent when calling closeAll on a child MdcDialog',
    fakeAsync(() => {
      parentDialog.open(PizzaMsg);
      fixture.detectChanges();
      flush();

      expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a dialog to be opened');

      childDialog.closeAll();
      fixture.detectChanges();
      flush();

      expect(overlayContainerElement.textContent!.trim())
        .toBe('', 'Expected closeAll on child MdcDialog to close dialog opened by parent');
    }));

  it('should close dialogs opened by a child when calling closeAll on a parent MdcDialog',
    fakeAsync(() => {
      childDialog.open(PizzaMsg);
      fixture.detectChanges();

      expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a dialog to be opened');

      parentDialog.closeAll();
      fixture.detectChanges();
      flush();

      expect(overlayContainerElement.textContent!.trim())
        .toBe('', 'Expected closeAll on parent MdcDialog to close dialog opened by child');
    }));

  it('should not close the parent dialogs when a child is destroyed', fakeAsync(() => {
    parentDialog.open(PizzaMsg);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent)
      .toContain('Pizza', 'Expected a dialog to be opened');

    childDialog.ngOnDestroy();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent)
      .toContain('Pizza', 'Expected a dialog to be opened');
  }));
});

@Directive({selector: 'dir-with-view-container'})
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer, {static: false}) childWithViewContainer!: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer!.viewContainerRef;
  }
}

@Component({
  selector: 'arbitrary-component-with-template-ref',
  template: `<ng-template let-data let-dialogRef="dialogRef">
      Cheese {{localValue}} {{data?.value}}{{setDialogRef(dialogRef)}}</ng-template>`,
})
class ComponentWithTemplateRef {
  localValue?: string;
  dialogRef?: MdcDialogRef<any>;

  @ViewChild(TemplateRef, {static: false}) templateRef!: TemplateRef<any>;

  setDialogRef(dialogRef: MdcDialogRef<any>): string {
    this.dialogRef = dialogRef;
    return '';
  }
}

/** Simple component for testing ComponentPortal. */
@Component({template: '<p>Pizza</p> <input> <button>Close</button>'})
class PizzaMsg {
  constructor(public dialogRef: MdcDialogRef<PizzaMsg>,
    public dialogInjector: Injector) {}
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
          <button mdcDialogButton #decline [mdcDialogAction]="buttonAction">Decline</button>
          <button mdcDialogButton mdcDialogAction>Do Nothing</button>
          <button mdcDialogButton default mdcDialogAction="accept">Accept</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>`,
})
class SimpleDialog {
  @ViewChild(MdcDialogComponent, {static: true}) dialogComponent!: MdcDialogComponent;

  constructor(public dialogRef: MdcDialogRef<SimpleDialog>) {}

  buttonAction: string = 'close';
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
          <button mdcDialogButton default mdcDialogAction="accept">Accept</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>`,
})
class DialogWithDefaultButton {
  @ViewChild(MdcDialogComponent, {static: true}) dialogComponent!: MdcDialogComponent;
  @ViewChild(MdcDialogButton, {static: true}) dialogButton!: MdcDialogButton;
  @ViewChild(MdcDialogAction, {static: true}) dialogActionButton!: MdcDialogAction;

  constructor(public dialogRef: MdcDialogRef<DialogWithDefaultButton>) {}
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
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>`,
})
class DialogWithNoButtons {
  @ViewChild(MdcDialogComponent, {static: true}) dialogComponent!: MdcDialogComponent;

  constructor(public dialogRef: MdcDialogRef<DialogWithNoButtons>) {}
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Select an account</mdc-dialog-title>
        <mdc-dialog-content>
          <mdc-list avatar>
            <mdc-list-item mdcDialogAction="close" [tabIndex]="0">
              <mdc-icon mdcListItemGraphic>person</mdc-icon>username@gmail.com
            </mdc-list-item>
            <mdc-list-item>
              <mdc-icon mdcListItemGraphic>person</mdc-icon>user02@gmail.com
            </mdc-list-item>
          </mdc-list>
        </mdc-dialog-content>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogWithList {
  @ViewChild(MdcDialogComponent, {static: true}) dialogComponent!: MdcDialogComponent;

  constructor(public dialogRef: MdcDialogRef<DialogWithList>) {}
}

/** Simple component for testing ComponentPortal. */
@Component({template: ''})
class DialogWithInjectedData {
  constructor(@Inject(MDC_DIALOG_DATA) public data: any) {}
}

@Component({
  template: '',
  providers: [MdcDialog]
})
class ComponentThatProvidesMdcDialog {
  constructor(public dialog: MdcDialog) {}
}

const TEST_DIRECTIVES = [
  SimpleDialog,
  DialogWithDefaultButton,
  DialogWithNoButtons,
  DialogWithInjectedData,
  DialogWithList,
  PizzaMsg,
  ComponentWithTemplateRef,
  ComponentWithChildViewContainer,
  DirectiveWithViewContainer
];

@NgModule({
  imports: [
    MdcDialogModule,
    MdcListModule,
    MdcIconModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    SimpleDialog,
    DialogWithDefaultButton,
    DialogWithNoButtons,
    DialogWithInjectedData,
    DialogWithList,
    ComponentWithTemplateRef,
    PizzaMsg,
    ComponentWithChildViewContainer
  ],
})
class DialogTestModule {}
