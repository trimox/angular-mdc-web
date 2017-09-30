import { async, inject, TestBed } from '@angular/core/testing';
import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalModule, PortalHostDirective } from '../../../../src/lib/cdk/portal';
import { Overlay, OverlayContainer, OverlayModule } from '../../../../src/lib/cdk/overlay';

describe('OverlayContainer', () => {
  let overlay: Overlay;
  let overlayContainer: OverlayContainer;

  beforeAll(() => {
    // Remove any stale overlay containers from previous tests that didn't clean up correctly.
    const staleContainers = document.querySelectorAll('.cdk-overlay-container');
    for (let i = staleContainers.length - 1; i >= 0; i--) {
      staleContainers[i].parentNode!.removeChild(staleContainers[i]);
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OverlayTestModule]
    }).compileComponents();
  }));

  beforeEach(inject([Overlay, OverlayContainer], (o: Overlay, oc: OverlayContainer) => {
    overlay = o;
    overlayContainer = oc;
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should remove the overlay container element from the DOM on destruction', () => {
    const fixture = TestBed.createComponent(TestComponentWithTemplatePortals);

    const overlayRef = overlay.create();
    fixture.detectChanges();

    expect(document.querySelectorAll('.cdk-overlay-container'))
      .not.toBeNull('Expected the overlay container to be in the DOM after opening an overlay');

    // Manually call `ngOnDestroy` because there is no way to force Angular to destroy an
    // injectable in a unit test.
    overlayContainer.ngOnDestroy();

    expect(document.querySelector('.cdk-overlay-container'))
      .toBeNull('Expected the overlay container *not* to be in the DOM after destruction');
  });
});

/** Test-bed component that contains a TempatePortal and an ElementRef. */
@Component({
  template: `<ng-template cdk-portal>Cake</ng-template>`,
  providers: [Overlay],
})
class TestComponentWithTemplatePortals {
  @ViewChild(PortalHostDirective) templatePortal: PortalHostDirective;

  constructor(public viewContainerRef: ViewContainerRef) { }
}

@NgModule({
  imports: [OverlayModule, PortalModule],
  declarations: [TestComponentWithTemplatePortals]
})
class OverlayTestModule { }
