import { inject, ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  NgModule,
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ComponentFactoryResolver,
  Optional,
  Injector,
  ApplicationRef,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHostDirective, PortalModule } from '../../../../src/lib/cdk/portal/portal-directives';
import { Portal, ComponentPortal } from '../../../../src/lib/cdk/portal';
import { DomPortalHost } from '../../../../src/lib/cdk/portal/dom-portal-host';

describe('Portals', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule, PortalTestModule],
    });

    TestBed.compileComponents();
  }));

  describe('PortalHostDirective', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
      fixture = TestBed.createComponent(PortalTestApp);
    });

    it('should load a component into the portal', () => {
      // Set the selectedHost to be a ComponentPortal.
      let testAppComponent = fixture.debugElement.componentInstance;
      testAppComponent.selectedPortal = new ComponentPortal(PizzaMsg);
      fixture.detectChanges();

      // Expect that the content of the attached portal is present.
      let hostContainer = fixture.nativeElement.querySelector('.portal-container');
      expect(hostContainer.textContent).toContain('Pizza');
    });

    it('should dispose the host when destroyed', () => {
      // Set the selectedHost to be a ComponentPortal.
      let testAppComponent = fixture.debugElement.componentInstance;
      testAppComponent.selectedPortal = new ComponentPortal(PizzaMsg);

      fixture.detectChanges();
      expect(testAppComponent.selectedPortal.isAttached).toBe(true);

      fixture.destroy();
      expect(testAppComponent.selectedPortal.isAttached).toBe(false);
    });

    it('should load a component into the portal with a given injector', () => {
      // Create a custom injector for the component.
      let chocolateInjector = new ChocolateInjector(fixture.componentInstance.injector);

      // Set the selectedHost to be a ComponentPortal.
      let testAppComponent = fixture.debugElement.componentInstance;
      testAppComponent.selectedPortal = new ComponentPortal(PizzaMsg, undefined, chocolateInjector);
      fixture.detectChanges();

      // Expect that the content of the attached portal is present.
      let hostContainer = fixture.nativeElement.querySelector('.portal-container');
      expect(hostContainer.textContent).toContain('Pizza');
      expect(hostContainer.textContent).toContain('Chocolate');
    });

    it('should detach the portal when it is set to null', () => {
      let testAppComponent = fixture.debugElement.componentInstance;
      testAppComponent.selectedPortal = new ComponentPortal(PizzaMsg);

      fixture.detectChanges();
      expect(testAppComponent.portalHost.hasAttached()).toBe(true);
      expect(testAppComponent.portalHost.portal).toBe(testAppComponent.selectedPortal);

      testAppComponent.selectedPortal = null;
      fixture.detectChanges();

      expect(testAppComponent.portalHost.hasAttached()).toBe(false);
      expect(testAppComponent.portalHost.portal).toBeNull();
    });

    it('should set the `portal` when attaching a component portal programmatically', () => {
      let testAppComponent = fixture.debugElement.componentInstance;
      let portal = new ComponentPortal(PizzaMsg);

      testAppComponent.portalHost.attachComponentPortal(portal);

      expect(testAppComponent.portalHost.portal).toBe(portal);
    });

    it('should clear the portal reference on destroy', () => {
      let testAppComponent = fixture.debugElement.componentInstance;

      testAppComponent.selectedPortal = new ComponentPortal(PizzaMsg);
      fixture.detectChanges();

      expect(testAppComponent.portalHost.portal).toBeTruthy();

      fixture.destroy();

      expect(testAppComponent.portalHost.portal).toBeNull();
    });
  });

  describe('DomPortalHost', () => {
    let componentFactoryResolver: ComponentFactoryResolver;
    let someViewContainerRef: ViewContainerRef;
    let someInjector: Injector;
    let someFixture: ComponentFixture<any>;
    let someDomElement: HTMLElement;
    let host: DomPortalHost;
    let injector: Injector;
    let appRef: ApplicationRef;

    let deps = [ComponentFactoryResolver, Injector, ApplicationRef];
    beforeEach(inject(deps, (dcl: ComponentFactoryResolver, i: Injector, ar: ApplicationRef) => {
      componentFactoryResolver = dcl;
      injector = i;
      appRef = ar;
    }));

    beforeEach(() => {
      someDomElement = document.createElement('div');
      host = new DomPortalHost(someDomElement, componentFactoryResolver, appRef, injector);

      someFixture = TestBed.createComponent(ArbitraryViewContainerRefComponent);
      someViewContainerRef = someFixture.componentInstance.viewContainerRef;
      someInjector = someFixture.componentInstance.injector;
    });

    it('should attach and detach a component portal', () => {
      let portal = new ComponentPortal(PizzaMsg, someViewContainerRef);

      let componentInstance: PizzaMsg = portal.attach(host).instance;

      expect(componentInstance instanceof PizzaMsg).toBe(true);
      expect(someDomElement.textContent).toContain('Pizza');

      host.detach();

      expect(someDomElement.innerHTML).toBe('');
    });

    it('should attach and detach a component portal with a given injector', () => {
      let fixture = TestBed.createComponent(ArbitraryViewContainerRefComponent);
      someViewContainerRef = fixture.componentInstance.viewContainerRef;
      someInjector = fixture.componentInstance.injector;

      let chocolateInjector = new ChocolateInjector(someInjector);
      let portal = new ComponentPortal(PizzaMsg, someViewContainerRef, chocolateInjector);

      let componentInstance: PizzaMsg = portal.attach(host).instance;
      fixture.detectChanges();

      expect(componentInstance instanceof PizzaMsg).toBe(true);
      expect(someDomElement.textContent).toContain('Pizza');
      expect(someDomElement.textContent).toContain('Chocolate');

      host.detach();

      expect(someDomElement.innerHTML).toBe('');
    });

    it('should attach and detach a component portal without a ViewContainerRef', () => {
      let portal = new ComponentPortal(PizzaMsg);

      let componentInstance: PizzaMsg = portal.attach(host).instance;

      expect(componentInstance instanceof PizzaMsg)
        .toBe(true, 'Expected a PizzaMsg component to be created');
      expect(someDomElement.textContent)
        .toContain('Pizza', 'Expected the static string "Pizza" in the DomPortalHost.');

      componentInstance.snack = new Chocolate();
      someFixture.detectChanges();
      expect(someDomElement.textContent)
        .toContain('Chocolate', 'Expected the bound string "Chocolate" in the DomPortalHost');

      host.detach();

      expect(someDomElement.innerHTML)
        .toBe('', 'Expected the DomPortalHost to be empty after detach');
    });

    it('should call the dispose function even if the host has no attached content', () => {
      let spy = jasmine.createSpy('host dispose spy');

      expect(host.hasAttached()).toBe(false, 'Expected host not to have attached content.');

      host.setDisposeFn(spy);
      host.dispose();

      expect(spy).toHaveBeenCalled();
    });
  });
});

class Chocolate {
  toString() {
    return 'Chocolate';
  }
}

class ChocolateInjector {
  constructor(public parentInjector: Injector) { }

  get(token: any) {
    return token === Chocolate ? new Chocolate() : this.parentInjector.get<any>(token);
  }
}

/** Simple component for testing ComponentPortal. */
@Component({
  selector: 'pizza-msg',
  template: '<p>Pizza</p><p>{{snack}}</p>',
})
class PizzaMsg {
  constructor( @Optional() public snack: Chocolate) { }
}

/** Simple component to grab an arbitrary ViewContainerRef */
@Component({
  selector: 'some-placeholder',
  template: '<p>Hello</p>'
})
class ArbitraryViewContainerRefComponent {
  constructor(public viewContainerRef: ViewContainerRef, public injector: Injector) { }
}

/** Test-bed component that contains a portal host and a couple of template portals. */
@Component({
  selector: 'portal-test',
  template: `
  <div class="portal-container">
    <ng-template [cdkPortalHost]="selectedPortal"></ng-template>
  </div>
  <ng-template cdk-portal>Cake</ng-template>
  <div *cdk-portal>Pie</div>
  <ng-template cdk-portal let-data> {{fruit}} - {{ data?.status }} </ng-template>
  <ng-template cdk-portal>
    <ul>
      <li *ngFor="let fruitName of fruits"> {{fruitName}} </li>
    </ul>
  </ng-template>
  <ng-template #templateRef let-data> {{fruit}} - {{ data?.status }}!</ng-template>
  `,
})
class PortalTestApp {
  @ViewChild(PortalHostDirective) portalHost: PortalHostDirective;
  @ViewChild('templateRef', { read: TemplateRef }) templateRef: TemplateRef<any>;

  selectedPortal: Portal<any>;
  fruit: string = 'Banana';
  fruits = ['Apple', 'Pineapple', 'Durian'];

  constructor(public injector: Injector) { }
}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_COMPONENTS = [PortalTestApp, ArbitraryViewContainerRefComponent, PizzaMsg];
@NgModule({
  imports: [CommonModule, PortalModule],
  exports: TEST_COMPONENTS,
  declarations: TEST_COMPONENTS,
  entryComponents: TEST_COMPONENTS,
})
class PortalTestModule { }
