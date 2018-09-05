import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcIconModule, MdcMaterialIcons
} from '@angular-mdc/web';

describe('MdcMaterialIcon', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcIconModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMaterialIcons;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMaterialIcons));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have material-icons', () => {
      expect(testDebugElement.nativeElement.classList).toContain('material-icons');
    });
  });
});

@Component({
  template: '<i materialIcons>home</i>',
})
class SimpleTest { }
