import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcTabBarScroller,
  MdcTabModule,
  MdcIconModule,
} from '@angular-mdc/web';

describe('MdcTabBarScroller', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTabModule, MdcIconModule],
      declarations: [ScrollingTabs]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcTabBarScroller;
    let testComponent: ScrollingTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(ScrollingTabs);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTabBarScroller));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-tab-bar-scroller by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-tab-bar-scroller', 'Expected to have mdc-tab-bar-scroller');
    });

    it('#should scrollToTabAtIndex', () => {
      expect(testInstance.scrollToTabAtIndex(2));
    });

    it('#should findTab should return null', () => {
      expect(testInstance.findTab(-1)).toBe(null);
    });

    it('#should scroll forward', () => {
      expect(testInstance.scrollForward());
    });

    it('#should scroll back', () => {
      expect(testInstance.scrollBack());
    });

    it('#should refresh layout', () => {
      expect(testInstance.layout());
    });
  });
});

@Component({
  template: `
    <mdc-tab-bar-scroller>
      <mdc-tab-bar-scroll-back>
        <mdc-icon>
          navigate_before
        </mdc-icon>
      </mdc-tab-bar-scroll-back>
      <mdc-tab-bar-scroll-frame>
        <mdc-tab-bar>
          <mdc-tab>Item One</mdc-tab>
          <mdc-tab>Item Two</mdc-tab>
          <mdc-tab>Item Three</mdc-tab>
          <mdc-tab>Item Four</mdc-tab>
          <mdc-tab>Item Five</mdc-tab>
          <mdc-tab>Item Six</mdc-tab>
        </mdc-tab-bar>
      </mdc-tab-bar-scroll-frame>
      <mdc-tab-bar-scroll-forward>
        <mdc-icon>
          navigate_next
        </mdc-icon>
      </mdc-tab-bar-scroll-forward>
  </mdc-tab-bar-scroller>
`
})
class ScrollingTabs { }
