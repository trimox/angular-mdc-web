import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchMouseEvent, dispatchKeyboardEvent } from '../testing/dispatch-events';

import {
  TAB,
  DOWN_ARROW,
  MdcMenuSurface,
  MdcMenuSurfaceModule,
  MdcMenuSurfaceAnchor,
  MdcImageListModule,
  Platform
} from '@angular-mdc/web';

describe('MdcMenuSurface', () => {
  let fixture: ComponentFixture<any>;
  let platform: { isBrowser: boolean };

  beforeEach(async(() => {
    // Set the default Platform override that can be updated before component creation.
    platform = { isBrowser: true };

    TestBed.configureTestingModule({
      imports: [MdcMenuSurfaceModule, MdcImageListModule],
      declarations: [MenuSurfaceTest],
      providers: [
        { provide: Platform, useFactory: () => platform }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenuSurface;
    let testComponent: MenuSurfaceTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(MenuSurfaceTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenuSurface));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#menu-surface should open', () => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);
    });

    it('#menu-surface should open as non-browser', () => {
      platform.isBrowser = false;

      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);
    });

    it('#menu-surface should quick open', () => {
      testComponent.quickOpen = true;
      fixture.detectChanges();
      expect(testInstance.quickOpen).toBe(true);
    });

    it('#menu-surface should set fixed', () => {
      testComponent.fixed = false;
      fixture.detectChanges();
      expect(testInstance.fixed).toBe(false);
    });

    it('#menu-surface should set hoistToBody', () => {
      testComponent.hoistToBody = true;
      fixture.detectChanges();
      expect(testInstance.hoistToBody).toBe(true);
    });

    it('#menu-surface should set anchor corner', () => {
      testComponent.anchorCorner = 'topEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('topEnd');

      testComponent.anchorCorner = 'bottomEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomEnd');

      testComponent.anchorCorner = 'bottomStart';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomStart');

      expect(testInstance.anchorMargin).toBeDefined();
      expect(testInstance.coordinates).toBeDefined();
      expect(testInstance.anchorElement).toBeDefined();
    });

    it('#should handle click event', () => {
      testDebugElement.nativeElement.click();
      fixture.detectChanges();
    });

    it('#should handle window object click event', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);

      dispatchMouseEvent(document, 'click');
      fixture.detectChanges();
      tick(500);

      expect(testInstance.open).toBe(false);
    }));
  });
});

@Component({
  template: `
  <div mdcMenuSurfaceAnchor #menuSurfaceAnchorTest>
    <button mdc-button raised (click)="menuSurfaceTest.open = !menuSurfaceTest.open">
      Show Menu Surface
    </button>
    <mdc-menu-surface #menuSurfaceTest
     [open]="open"
     [coordinates]="{x: 0, y: 0}"
     [hoistToBody]="hoistToBody"
     [anchorElement]="menuSurfaceAnchorTest"
     [anchorCorner]="anchorCorner"
     [quickOpen]="quickOpen" [fixed]="fixed"
     [anchorMargin]="anchorMargin">
      <mdc-image-list>
        <mdc-image-list-item *ngFor="let i of images">
          <mdc-image-list-image-aspect>
            <img mdcImageListImage src="https://material-components-web.appspot.com/images/photos/3x2/{{i+1}}.jpg" />
          </mdc-image-list-image-aspect>
          <mdc-image-list-supporting>
            <span mdcImageListLabel>Text label</span>
          </mdc-image-list-supporting>
        </mdc-image-list-item>
      </mdc-image-list>
    </mdc-menu-surface>
  </div>
  `,
})
class MenuSurfaceTest {
  open: boolean;
  anchorCorner: string;
  quickOpen: boolean;
  fixed: boolean;
  hoistToBody: boolean;
  anchorMargin = { top: 0, bottom: 0, left: 0, right: 0 };

  images = Array.from(Array(2), (x, i) => i);
}
