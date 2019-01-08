import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcFab, MdcFabModule, MdcIconModule } from '@angular-mdc/web';

describe('MdcFab', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcFabModule, MdcIconModule],
      declarations: [
        SimpleButton,
        SimpleFabButton
      ]
    });
    TestBed.compileComponents();
  }));

  describe('button[mdc-fab]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcFab;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcFab));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-fab by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-fab', 'Expected buttons to have mdc-fab');
    });

    it('#should apply class mini', () => {
      testComponent.mini = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--mini')).toBe(true);
    });

    it('#should apply class extended', () => {
      testComponent.extended = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--extended')).toBe(true);
    });

    it('#should apply style for fluid', () => {
      testComponent.extended = true;
      testComponent.fluid = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--extended')).toBe(true);
      expect(buttonDebugElement.nativeElement.classList.contains('ngx-mdc-fab-extended--fluid')).toBe(true);
      expect(buttonInstance.fluid).toBe(true);
    });

    it('#should apply class `exited`', () => {
      testComponent.isExited = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(true);
    });

    it('#should apply class `exited` after toggleExited(true)', () => {
      buttonInstance.toggleExited(true);
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(true);
      expect(buttonInstance.exited).toBe(true);
    });

    it('#should remove class `exited` after toggleExited(false)', () => {
      buttonInstance.toggleExited();
      buttonInstance.toggleExited();
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--exited')).toBe(false);
    });

    it('#should handle a click on the button', () => {
      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('#should apply class `bottomLeft`', () => {
      testComponent.myPosition = 'bottomLeft';
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('ngx-mdc-fab--bottom-left')).toBe(true);
    });

    it('#should apply class `bottom-right`', () => {
      testComponent.myPosition = 'bottomRight';
      fixture.detectChanges();

      expect(buttonInstance.position).toBe('bottomRight');
      expect(buttonDebugElement.nativeElement.classList.contains('ngx-mdc-fab--bottom-right')).toBe(true);
    });

    it('#should store position but not add class', () => {
      testComponent.myPosition = 'bottom-x';
      fixture.detectChanges();

      expect(buttonInstance.position).toBe('bottom-x');
      expect(buttonDebugElement.nativeElement.classList.contains('ng-mdc-fab--bottom-x')).toBe(false);
    });

    it('#should remove class `bottomRight`', () => {
      testComponent.myPosition = 'bottomRight';
      fixture.detectChanges();

      expect(buttonInstance.position).toBe('bottomRight');

      testComponent.myPosition = '';
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('ng-mdc-fab--bottom-right')).toBe(false);
    });

    it('#should focus on button when focus() is called', () => {
      buttonInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(buttonNativeElement);
    });

    it('#should handle a click on the button', () => {
      let fixture = TestBed.createComponent(SimpleButton);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });
  });

  describe('button[mdc-fab]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcFab;
    let testComponent: SimpleFabButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleFabButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcFab));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-fab by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-fab', 'Expected buttons to have mdc-fab');
    });
  });
});

@Component({
  template: `
    <button mdc-fab
      (click)="increment()"
      [exited]="isExited"
      [position]="myPosition"
      [extended]="extended"
      [fluid]="fluid"
      [mini]="mini">
      <mdc-icon>search</mdc-icon>
    </button>
  `,
})
class SimpleButton {
  mini: boolean = false;
  extended: boolean;
  fluid: boolean;
  isExited: boolean = false;
  clickCount: number = 0;
  myPosition: string = 'bottomLeft';

  increment() {
    this.clickCount++;
  }
}

@Component({
  template: `
    <button mdc-fab [icon]="favorite"></button>
  `,
})
class SimpleFabButton { }
