import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcMenu, MdcMenuModule, MdcListModule } from '@angular-mdc/web';

describe('MdcMenu', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcMenuModule, MdcListModule],
      declarations: [
        MenuTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenu;
    let testComponent: MenuTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(MenuTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenu));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have focus', () => {
      expect(document.activeElement).not.toBe(testDebugElement.nativeElement);
      testInstance.focus();
      fixture.detectChanges();
      expect(document.activeElement).toBe(testDebugElement.nativeElement);
    });

    it('#menu should quick open', () => {
      testComponent.quickOpen = true;
      fixture.detectChanges();
      expect(testInstance.quickOpen).toBe(true);
    });

    it('#menu should set anchor corner', () => {
      testComponent.anchorCorner = 'topEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('topEnd');

      testComponent.anchorCorner = 'bottomEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomEnd');

      testComponent.anchorCorner = 'bottomStart';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomStart');
    });

    it('#should handle click event', () => {
      testDebugElement.nativeElement.click();
    });
  });
});

@Component({
  template: `
    <div mdcMenuSurfaceAnchor #testanchor>
      <mdc-menu [anchorCorner]="anchorCorner" (select)="handleSelect($event)" [anchor]="testanchor" [quickOpen]="quickOpen"
        [absolutePosition]="{ x: 5, y: 2}" fixed="fixed">
        <mdc-list>
          <mdc-list-item>Item 1</mdc-list-item>
          <mdc-list-item>Item 2</mdc-list-item>
        </mdc-list>
      </mdc-menu>
    </div>
  `,
})
class MenuTest {
  anchorCorner: string = 'topStart';
  quickOpen: boolean;
  fixed: boolean;

  handleSelect(event) { }
}
