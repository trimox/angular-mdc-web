import {
  inject,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import {
  NgModule,
  Component,
  Directive,
  ViewChild,
  ViewContainerRef,
  Inject,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MDC_SNACKBAR_DATA,
  MDC_SNACKBAR_DEFAULT_OPTIONS,
  MdcSnackbar,
  MdcSnackbarContainer,
  MdcSnackbarComponent,
  MdcSnackbarConfig,
  MdcSnackbarModule,
  MdcSnackbarRef,
  OverlayContainer
} from '@angular-mdc/web';

describe('MdcSnackbar', () => {
//   let snackBar: MdcSnackbar;
//   let overlayContainer: OverlayContainer;
//   let overlayContainerElement: HTMLElement;

//   let testViewContainerRef: ViewContainerRef;
//   let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

//   let simpleMessage = 'Burritos are here!';
//   let simpleActionLabel = 'pickup';

//   beforeEach(fakeAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [MdcSnackbarModule, SnackBarTestModule],
//     }).compileComponents();
//   }));

//   beforeEach(inject([MdcSnackbar, OverlayContainer],
//     (sb: MdcSnackbar, oc: OverlayContainer) => {
//       snackBar = sb;
//       overlayContainer = oc;
//       overlayContainerElement = oc.getContainerElement();
//     }));

//   afterEach(() => {
//     overlayContainer.ngOnDestroy();
//   });

//   beforeEach(() => {
//     viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

//     viewContainerFixture.detectChanges();
//     testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
//   });

//   it('should have the role of alert', () => {
//     snackBar.show(simpleMessage, simpleActionLabel);

//     let containerElement = overlayContainerElement.querySelector('mdc-snackbar-container')!;
//     expect(containerElement.getAttribute('role'))
//       .toBe('alert', 'Expected snack bar container to have role="alert"');
//   });

//   it('should open a simple message with a button', () => {
//     let config: MdcSnackbarConfig = { viewContainerRef: testViewContainerRef };
//     let snackBarRef = snackBar.show(simpleMessage, simpleActionLabel, config);

//     viewContainerFixture.detectChanges();

//     expect(snackBarRef.instance instanceof MdcSnackbarComponent)
//       .toBe(true, 'Expected the snack bar content component to be MdcSnackbarComponent');
//     expect(snackBarRef.instance.snackbarRef)
//       .toBe(snackBarRef,
//         'Expected the snack bar reference to be placed in the component instance');
//   });

//   it('should open a simple message with no button', () => {
//     let config: MdcSnackbarConfig = { viewContainerRef: testViewContainerRef, align: 'start' };
//     let snackBarRef = snackBar.show(simpleMessage, undefined, config);

//     viewContainerFixture.detectChanges();

//     expect(snackBarRef.instance instanceof MdcSnackbarComponent)
//       .toBe(true, 'Expected the snack bar content component to be MdcSnackbarComponent');
//     expect(snackBarRef.instance.snackbarRef)
//       .toBe(snackBarRef, 'Expected the snack bar reference to be placed in the component instance');
//   });

//   it('should dismiss the snack bar and remove itself from the view', fakeAsync(() => {
//     let config: MdcSnackbarConfig = { viewContainerRef: testViewContainerRef, align: 'end' };
//     let dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');

//     let snackBarRef = snackBar.show(simpleMessage, undefined, config);
//     viewContainerFixture.detectChanges();
//     expect(overlayContainerElement.childElementCount)
//       .toBeGreaterThan(0, 'Expected overlay container element to have at least one child');

//     snackBarRef.afterDismiss().subscribe(undefined, undefined, dismissCompleteSpy);

//     snackBarRef.dismiss();
//     viewContainerFixture.detectChanges();  // Run through animations for dismissal
//     flush();

//     expect(dismissCompleteSpy).toHaveBeenCalled();
//     expect(overlayContainerElement.childElementCount)
//       .toBe(0, 'Expected the overlay container element to have no child elements');
//   }));

//   it('should be able to get dismissed through the service', fakeAsync(() => {
//     snackBar.show(simpleMessage);
//     viewContainerFixture.detectChanges();
//     expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

//     snackBar.dismiss();
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.childElementCount).toBe(0);
//   }));

//   it('should remove past snackbars when opening new snackbars', fakeAsync(() => {
//     snackBar.show('First snackbar');
//     viewContainerFixture.detectChanges();

//     snackBar.show('Second snackbar');
//     viewContainerFixture.detectChanges();
//     flush();

//     snackBar.show('Third snackbar');
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.textContent!.trim()).toBe('Third snackbar');
//   }));

//   it('should remove snackbar if another is shown while its still animating open', fakeAsync(() => {
//     snackBar.show('First snackbar');
//     viewContainerFixture.detectChanges();

//     snackBar.show('Second snackbar');
//     viewContainerFixture.detectChanges();

//     flush();
//     expect(overlayContainerElement.textContent!.trim()).toBe('Second snackbar');
//   }));

//   it('should allow manually dismissing with an action', fakeAsync(() => {
//     const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
//     const actionCompleteSpy = jasmine.createSpy('action complete spy');
//     const snackBarRef = snackBar.show('Some content');
//     viewContainerFixture.detectChanges();

//     snackBarRef.afterDismiss().subscribe(undefined, undefined, dismissCompleteSpy);
//     snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);

//     snackBarRef.dismissWithAction();
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(dismissCompleteSpy).toHaveBeenCalled();
//     expect(actionCompleteSpy).toHaveBeenCalled();

//     tick(500);
//   }));

//   it('should indicate in `afterClosed` whether it was dismissed by an action', fakeAsync(() => {
//     const dismissSpy = jasmine.createSpy('dismiss spy');
//     const snackBarRef = snackBar.show('Some content');
//     viewContainerFixture.detectChanges();

//     snackBarRef.afterDismiss().subscribe(dismissSpy);

//     snackBarRef.dismissWithAction();
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(dismissSpy).toHaveBeenCalledWith(jasmine.objectContaining({ dismissedByAction: true }));
//     tick(500);
//   }));

//   it('should complete the onAction stream when not closing via an action', fakeAsync(() => {
//     const actionCompleteSpy = jasmine.createSpy('action complete spy');
//     const snackBarRef = snackBar.show('Some content');
//     viewContainerFixture.detectChanges();

//     snackBarRef.onAction().subscribe(undefined, undefined, actionCompleteSpy);
//     snackBarRef.dismiss();
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(actionCompleteSpy).toHaveBeenCalled();

//     tick(500);
//   }));

//   it('should clear the dismiss timeout when dismissed before timeout expiration', fakeAsync(() => {
//     let config = new MdcSnackbarConfig();
//     config.timeout = 1000;
//     snackBar.show('content', 'test', config);

//     setTimeout(() => snackBar.dismiss(), 500);

//     tick(600);
//     viewContainerFixture.detectChanges();
//     tick();

//     expect(viewContainerFixture.isStable()).toBe(true);
//   }));

//   it('should dismiss the open snack bar on destroy', fakeAsync(() => {
//     snackBar.show(simpleMessage);
//     viewContainerFixture.detectChanges();
//     expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

//     snackBar.ngOnDestroy();
//     viewContainerFixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.childElementCount).toBe(0);
//   }));
// });

// describe('MdcSnackbar with parent MdcSnackbar', () => {
//   let parentSnackBar: MdcSnackbar;
//   let childSnackBar: MdcSnackbar;
//   let overlayContainer: OverlayContainer;
//   let overlayContainerElement: HTMLElement;
//   let fixture: ComponentFixture<ComponentThatProvidesMdcSnackBar>;

//   beforeEach(fakeAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [MdcSnackbarModule, SnackBarTestModule],
//       declarations: [ComponentThatProvidesMdcSnackBar],
//     }).compileComponents();
//   }));

//   beforeEach(inject([MdcSnackbar, OverlayContainer],
//     (sb: MdcSnackbar, oc: OverlayContainer) => {
//       parentSnackBar = sb;
//       overlayContainer = oc;
//       overlayContainerElement = oc.getContainerElement();

//       fixture = TestBed.createComponent(ComponentThatProvidesMdcSnackBar);
//       childSnackBar = fixture.componentInstance.snackBar;
//       fixture.detectChanges();
//     }));

//   afterEach(() => {
//     overlayContainer.ngOnDestroy();
//   });

//   it('should close snackBars opened by parent when opening from child', fakeAsync(() => {
//     parentSnackBar.show('Pizza');
//     fixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.textContent)
//       .toContain('Pizza', 'Expected a snackBar to be opened');

//     childSnackBar.show('Taco');
//     fixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.textContent)
//       .toContain('Taco', 'Expected parent snackbar msg to be dismissed by opening from child');
//   }));

//   it('should close snackBars opened by child when opening from parent', fakeAsync(() => {
//     childSnackBar.show('Pizza');
//     fixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.textContent)
//       .toContain('Pizza', 'Expected a snackBar to be opened');

//     parentSnackBar.show('Taco');
//     fixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.textContent)
//       .toContain('Taco', 'Expected child snackbar msg to be dismissed by opening from parent');
//   }));

//   it('should not dismiss parent snack bar if child is destroyed', fakeAsync(() => {
//     parentSnackBar.show('Pizza');
//     fixture.detectChanges();
//     expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

//     childSnackBar.ngOnDestroy();
//     fixture.detectChanges();
//     flush();

//     expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
//   }));
});

// @Directive({ selector: 'dir-with-view-container' })
// class DirectiveWithViewContainer {
//   constructor(public viewContainerRef: ViewContainerRef) { }
// }

// @Component({
//   selector: 'arbitrary-component',
//   template: `<dir-with-view-container *ngIf="childComponentExists"></dir-with-view-container>`,
// })
// class ComponentWithChildViewContainer {
//   @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

//   childComponentExists: boolean = true;

//   get childViewContainer() {
//     return this.childWithViewContainer.viewContainerRef;
//   }
// }

// @Component({
//   selector: 'arbitrary-component-with-template-ref',
//   template: `
//     <ng-template let-data>
//       Fries {{localValue}} {{data?.value}}
//     </ng-template>
//   `,
// })
// class ComponentWithTemplateRef {
//   @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
//   localValue: string;
// }

// /** Simple component for testing ComponentPortal. */
// @Component({ template: '<p>Burritos are on the way.</p>' })
// class BurritosNotification {
//   constructor(
//     public snackBarRef: MdcSnackbarRef<BurritosNotification>,
//     @Inject(MDC_SNACKBAR_DATA) public data: any) { }
// }

// @Component({
//   template: '',
//   providers: [MdcSnackbar]
// })
// class ComponentThatProvidesMdcSnackBar {
//   constructor(public snackBar: MdcSnackbar) { }
// }

// /**
//  * Simple component to open snack bars from.
//  * Create a real (non-test) NgModule as a workaround forRoot
//  * https://github.com/angular/angular/issues/10760
//  */
// const TEST_DIRECTIVES = [ComponentWithChildViewContainer,
//   BurritosNotification,
//   DirectiveWithViewContainer,
//   ComponentWithTemplateRef];
// @NgModule({
//   imports: [CommonModule, MdcSnackbarModule],
//   exports: TEST_DIRECTIVES,
//   declarations: TEST_DIRECTIVES,
//   entryComponents: [ComponentWithChildViewContainer, BurritosNotification],
// })
// class SnackBarTestModule { }
