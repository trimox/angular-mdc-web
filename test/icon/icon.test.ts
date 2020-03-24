import {inject, async, fakeAsync, tick, TestBed} from '@angular/core/testing';
import {SafeResourceUrl, DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Component} from '@angular/core';

import {wrappedErrorMessage} from '../testing/wrapped-error-message';
import {FAKE_SVGS} from '../testing/fake-svgs';

import {MdcIconModule, MDC_ICON_LOCATION, MdcIconRegistry, getMdcIconNoHttpProviderError} from '@angular-mdc/web/icon';

/** Returns the CSS classes assigned to an element as a sorted array. */
function sortedClassNames(element: Element): string[] {
  return element.className.split(' ').sort();
}

/**
 * Verifies that an element contains a single `<svg>` child element, and returns that child.
 */
function verifyAndGetSingleSvgChild(element: SVGElement): SVGElement {
  expect(element.id).toBeFalsy();
  expect(element.childNodes.length).toBe(1);
  const svgChild = element.childNodes[0] as SVGElement;
  expect(svgChild.tagName.toLowerCase()).toBe('svg');
  return svgChild;
}

/**
 * Verifies that an element contains a single `<path>` child element whose "id" attribute has
 * the specified value.
 */
function verifyPathChildElement(element: Element, attributeValue: string): void {
  expect(element.childNodes.length).toBe(1);
  const pathElement = element.childNodes[0] as SVGPathElement;
  expect(pathElement.tagName.toLowerCase()).toBe('path');

  // The testing data SVGs have the name attribute set for verification.
  expect(pathElement.getAttribute('name')).toBe(attributeValue);
}

describe('MdcIcon', () => {
  let fakePath: string;

  beforeEach(async(() => {
    fakePath = '/fake-path';

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MdcIconModule],
      declarations: [
        IconWithLigature,
        IconWithCustomFontCss,
        IconFromSvgName,
        IconWithAriaHiddenFalse,
        IconWithBindingAndNgIf,
        InlineIcon,
        SvgIconWithUserContent,
        IconWithLigatureAndSvgBinding,
      ],
      providers: [{
        provide: MDC_ICON_LOCATION,
        useValue: {getPathname: () => fakePath}
      }]
    });

    TestBed.compileComponents();
  }));

  let iconRegistry: MdcIconRegistry;
  let http: HttpTestingController;
  let sanitizer: DomSanitizer;

  beforeEach(inject([MdcIconRegistry, HttpTestingController, DomSanitizer],
    (mir: MdcIconRegistry, h: HttpTestingController, ds: DomSanitizer) => {
      iconRegistry = mir;
      http = h;
      sanitizer = ds;
    }));

  afterEach(() => {
    iconRegistry.ngOnDestroy();
  });

  it('should mark mdc-icon as aria-hidden by default', () => {
    const fixture = TestBed.createComponent(IconWithLigature);
    const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
    expect(iconElement.getAttribute('aria-hidden'))
      .toBe('true', 'Expected the mdc-icon element has aria-hidden="true" by default');
  });

  it('should not override a user-provided aria-hidden attribute', () => {
    const fixture = TestBed.createComponent(IconWithAriaHiddenFalse);
    const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
    expect(iconElement.getAttribute('aria-hidden'))
      .toBe('false', 'Expected the mdc-icon element has the user-provided aria-hidden value');
  });

  it('should apply inline styling', () => {
    const fixture = TestBed.createComponent(InlineIcon);
    const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
    expect(iconElement.classList.contains('ngx-mdc-icon--inline'))
      .toBeFalsy('Expected the mdc-icon element to not include the inline styling class');

    fixture.debugElement.componentInstance.inline = true;
    fixture.detectChanges();
    expect(iconElement.classList.contains('ngx-mdc-icon--inline'))
      .toBeTruthy('Expected the mdc-icon element to include the inline styling class');
  });

  describe('Ligature icons', () => {
    it('should add material-icons class by default', () => {
      const fixture = TestBed.createComponent(IconWithLigature);

      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      testComponent.iconName = 'home';
      fixture.detectChanges();
      expect(sortedClassNames(iconElement)).toEqual(['material-icons', 'ngx-mdc-icon']);
    });

    it('should not clear the text of a ligature icon if the svgIcon is bound to something falsy',
      () => {
        const fixture = TestBed.createComponent(IconWithLigatureAndSvgBinding);

        const testComponent = fixture.componentInstance;
        const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
        testComponent.iconName = undefined;
        fixture.detectChanges();

        expect(iconElement.textContent.trim()).toBe('house');
      });

    it('should use alternate icon font if set', () => {
      iconRegistry.setDefaultFontSetClass('myfont');

      const fixture = TestBed.createComponent(IconWithLigature);

      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      testComponent.iconName = 'home';
      fixture.detectChanges();
      expect(sortedClassNames(iconElement)).toEqual(['myfont', 'ngx-mdc-icon']);
    });
  });

  describe('Icons from URLs', () => {
    it('should register icon URLs by name', fakeAsync(() => {
      iconRegistry.addSvgIcon('fluffy', trustUrl('cat.svg'));
      iconRegistry.addSvgIcon('fido', trustUrl('dog.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      let svgElement: SVGElement;
      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'fido';
      fixture.detectChanges();
      http.expectOne('dog.svg').flush(FAKE_SVGS.dog);
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      verifyPathChildElement(svgElement, 'woof');

      // Change the icon, and the SVG element should be replaced.
      testComponent.iconName = 'fluffy';
      fixture.detectChanges();
      http.expectOne('cat.svg').flush(FAKE_SVGS.cat);
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      verifyPathChildElement(svgElement, 'meow');

      // Using an icon from a previously loaded URL should not cause another HTTP request.
      testComponent.iconName = 'fido';
      fixture.detectChanges();
      http.expectNone('dog.svg');
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      verifyPathChildElement(svgElement, 'woof');

      // Assert that a registered icon can be looked-up by url.
      iconRegistry.getSvgIconFromUrl(trustUrl('cat.svg')).subscribe(element => {
        verifyPathChildElement(element, 'meow');
      });

      tick();
    }));

    it('should be able to provide multiple alternate icon set classes', () => {
      iconRegistry.setDefaultFontSetClass('myfont', 'myfont-48x48');
      const fixture = TestBed.createComponent(IconWithLigature);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      testComponent.iconName = 'home';
      fixture.detectChanges();
      expect(sortedClassNames(mdcIconElement)).toEqual(['myfont', 'myfont-48x48', 'ngx-mdc-icon']);
    });

    it('should throw an error when using an untrusted icon url', () => {
      iconRegistry.addSvgIcon('fluffy', 'farm-set-1.svg');

      expect(() => {
        const fixture = TestBed.createComponent(IconFromSvgName);
        fixture.componentInstance.iconName = 'fluffy';
        fixture.detectChanges();
      }).toThrowError(/unsafe value used in a resource URL context/);
    });

    it('should throw an error when using an untrusted icon set url', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-1.svg');

      expect(() => {
        const fixture = TestBed.createComponent(IconFromSvgName);
        fixture.componentInstance.iconName = 'farm:pig';
        fixture.detectChanges();
      }).toThrowError(/unsafe value used in a resource URL context/);
    });

    it('should extract icon from SVG icon set', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;
      let svgChild: any;

      testComponent.iconName = 'farm:pig';
      fixture.detectChanges();
      http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);

      expect(mdcIconElement.childNodes.length).toBe(1);
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.childNodes.length).toBe(1);
      svgChild = svgElement.childNodes[0];
      // The first <svg> child should be the <g id="pig"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('pig');
      verifyPathChildElement(svgChild, 'oink');

      // Change the icon, and the SVG element should be replaced.
      testComponent.iconName = 'farm:cow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      svgChild = svgElement.childNodes[0];
      // The first <svg> child should be the <g id="cow"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('cow');
      verifyPathChildElement(svgChild, 'moo');
    });

    it('should handle unescape characters in icon names', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-4.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;
      let svgChild: any;

      testComponent.iconName = 'farm:pig with spaces';
      fixture.detectChanges();
      http.expectOne('farm-set-4.svg').flush(FAKE_SVGS.farmSet4);

      expect(mdcIconElement.childNodes.length).toBe(1);
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.childNodes.length).toBe(1);
      svgChild = svgElement.childNodes[0];
      // The first <svg> child should be the <g id="pig"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('pig');
      verifyPathChildElement(svgChild, 'oink');
    });

    it('should be able to set the viewBox when registering a single SVG icon', fakeAsync(() => {
      iconRegistry.addSvgIcon('fluffy', trustUrl('cat.svg'), {viewBox: '0 0 27 27'});
      iconRegistry.addSvgIcon('fido', trustUrl('dog.svg'), {viewBox: '0 0 43 43'});

      let fixture = TestBed.createComponent(IconFromSvgName);
      let svgElement: SVGElement;
      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'fido';
      fixture.detectChanges();
      http.expectOne('dog.svg').flush(FAKE_SVGS.dog);
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 43 43');

      // Change the icon, and the SVG element should be replaced.
      testComponent.iconName = 'fluffy';
      fixture.detectChanges();
      http.expectOne('cat.svg').flush(FAKE_SVGS.cat);
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 27 27');
    }));

    it('should be able to configure the icon viewBox', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fluffy', trustHtml(FAKE_SVGS.cat), {viewBox: '0 0 43 43'});
      iconRegistry.addSvgIconLiteral('fido', trustHtml(FAKE_SVGS.dog), {viewBox: '0 0 27 27'});

      let fixture = TestBed.createComponent(IconFromSvgName);
      let svgElement: SVGElement;
      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'fido';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 27 27');

      testComponent.iconName = 'fluffy';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 43 43');
    }));

    it('should be able to configure the viewBox for the icon set', () => {
      iconRegistry.addSvgIconSetLiteral(trustHtml(FAKE_SVGS.arrows), {viewBox: '0 0 43 43'});

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);

      expect(svgElement.getAttribute('viewBox')).toBe('0 0 43 43');
    });

    it('should never parse the same icon set multiple times', () => {
      // Normally we avoid spying on private methods like this, but the parsing is a private
      // implementation detail that should not be exposed to the public API. This test, though,
      // is important enough to warrant the brittle-ness that results.
      spyOn(iconRegistry, '_svgElementFromString' as any).and.callThrough();

      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));

      // Requests for icons must be subscribed to in order for requests to be made.
      iconRegistry.getNamedSvgIcon('pig', 'farm').subscribe(() => {});
      iconRegistry.getNamedSvgIcon('cow', 'farm').subscribe(() => {});

      http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);

      // _svgElementFromString is called once for each icon to create an empty SVG element
      // and once to parse the full icon set.
      expect((iconRegistry as any)._svgElementFromString).toHaveBeenCalledTimes(3);
    });

    it('should allow multiple icon sets in a namespace', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-2.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;
      let svgChild: any;

      testComponent.iconName = 'farm:pig';
      fixture.detectChanges();
      http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);
      http.expectOne('farm-set-2.svg').flush(FAKE_SVGS.farmSet2);

      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.childNodes.length).toBe(1);
      svgChild = svgElement.childNodes[0];
      // The <svg> child should be the <g id="pig"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('pig');
      expect(svgChild.getAttribute('id')).toBeFalsy();
      expect(svgChild.childNodes.length).toBe(1);
      verifyPathChildElement(svgChild, 'oink');

      // Change the icon name to one that appears in both icon sets. The icon from the set that
      // was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
      // and no additional HTTP request should be made.
      testComponent.iconName = 'farm:cow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      svgChild = svgElement.childNodes[0];
      // The first <svg> child should be the <g id="cow"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('cow');
      expect(svgChild.childNodes.length).toBe(1);
      verifyPathChildElement(svgChild, 'moo moo');
    });

    it('should clear the id attribute from the svg node', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);

      fixture.componentInstance.iconName = 'farm:pig';
      fixture.detectChanges();
      http.expectOne('farm-set-1.svg').flush(FAKE_SVGS.farmSet1);

      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      const svgElement = verifyAndGetSingleSvgChild(mdcIconElement);

      expect(svgElement.hasAttribute('id')).toBe(false);
    });

    it('should unwrap <symbol> nodes', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-3.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'farm:duck';
      fixture.detectChanges();
      http.expectOne('farm-set-3.svg').flush(FAKE_SVGS.farmSet3);

      const svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      const firstChild = svgElement.childNodes[0];

      expect(svgElement.querySelector('symbol')).toBeFalsy();
      expect(svgElement.childNodes.length).toBe(1);
      expect(firstChild.nodeName.toLowerCase()).toBe('path');
      expect((firstChild as HTMLElement).getAttribute('name')).toBe('quack');
    });

    it('should copy over the attributes when unwrapping <symbol> nodes', () => {
      iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-5.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'farm:duck';
      fixture.detectChanges();
      http.expectOne('farm-set-5.svg').flush(FAKE_SVGS.farmSet5);

      const svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 13 37');
      expect(svgElement.getAttribute('id')).toBeFalsy();
      expect(svgElement.querySelector('symbol')).toBeFalsy();
    });

    it('should not wrap <svg> elements in icon sets in another svg tag', () => {
      iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);

      // arrow-set.svg stores its icons as nested <svg> elements, so they should be used
      // directly and not wrapped in an outer <svg> tag like the <g> elements in other sets.
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'left');
    });

    it('should return unmodified copies of icons from icon sets', () => {
      iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'left');
      // Modify the SVG element by setting a viewBox attribute.
      svgElement.setAttribute('viewBox', '0 0 100 100');

      // Switch to a different icon.
      testComponent.iconName = 'right-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'right');

      // Switch back to the first icon. The viewBox attribute should not be present.
      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'left');
      expect(svgElement.getAttribute('viewBox')).toBeTruthy();
    });

    it('should be able to configure the viewBox for the icon set', () => {
      iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'), {viewBox: '0 0 43 43'});

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);

      expect(svgElement.getAttribute('viewBox')).toBe('0 0 43 43');
    });

    it('should not throw when toggling an icon that has a binding in IE11', () => {
      iconRegistry.addSvgIcon('fluffy', trustUrl('cat.svg'));

      const fixture = TestBed.createComponent(IconWithBindingAndNgIf);

      fixture.detectChanges();
      http.expectOne('cat.svg').flush(FAKE_SVGS.cat);

      expect(() => {
        fixture.componentInstance.showIcon = false;
        fixture.detectChanges();

        fixture.componentInstance.showIcon = true;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should remove the SVG element from the DOM when the binding is cleared', () => {
      iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);

      const testComponent = fixture.componentInstance;
      const icon = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      http.expectOne('arrow-set.svg').flush(FAKE_SVGS.arrows);

      expect(icon.querySelector('svg')).toBeTruthy();

      testComponent.iconName = undefined;
      fixture.detectChanges();

      expect(icon.querySelector('svg')).toBeFalsy();
    });

    it('should keep non-SVG user content inside the icon element', fakeAsync(() => {
      iconRegistry.addSvgIcon('fido', trustUrl('dog.svg'));

      const fixture = TestBed.createComponent(SvgIconWithUserContent);
      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'fido';
      fixture.detectChanges();
      http.expectOne('dog.svg').flush(FAKE_SVGS.dog);

      const userDiv = iconElement.querySelector('div');

      expect(userDiv).toBeTruthy();
      expect(iconElement.textContent.trim()).toContain('Hello');

      tick();
    }));
  });

  describe('Icons from HTML string', () => {
    it('should register icon HTML strings by name', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fluffy', trustHtml(FAKE_SVGS.cat));
      iconRegistry.addSvgIconLiteral('fido', trustHtml(FAKE_SVGS.dog));

      const fixture = TestBed.createComponent(IconFromSvgName);
      let svgElement: SVGElement;
      const testComponent = fixture.componentInstance;
      const iconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.iconName = 'fido';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      verifyPathChildElement(svgElement, 'woof');

      testComponent.iconName = 'fluffy';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(iconElement);
      verifyPathChildElement(svgElement, 'meow');

      // Assert that a registered icon can be looked-up by name.
      iconRegistry.getNamedSvgIcon('fluffy').subscribe(element => {
        verifyPathChildElement(element, 'meow');
      });

      tick();
    }));

    it('should throw an error when using untrusted HTML', () => {
      // Stub out console.warn so we don't pollute our logs with Angular's warnings.
      // Jasmine will tear the spy down at the end of the test.
      spyOn(console, 'warn');

      expect(() => {
        iconRegistry.addSvgIconLiteral('circle', '<svg><circle></svg>');
      }).toThrowError(/was not trusted as safe HTML/);
    });

    it('should extract an icon from SVG icon set', () => {
      iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(FAKE_SVGS.farmSet1));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;
      let svgChild: any;

      testComponent.iconName = 'farm:pig';
      fixture.detectChanges();

      expect(mdcIconElement.childNodes.length).toBe(1);
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.childNodes.length).toBe(1);
      svgChild = svgElement.childNodes[0];

      // The first <svg> child should be the <g id="pig"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('pig');
      verifyPathChildElement(svgChild, 'oink');

      // Change the icon, and the SVG element should be replaced.
      testComponent.iconName = 'farm:cow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      svgChild = svgElement.childNodes[0];

      // The first <svg> child should be the <g id="cow"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('cow');
      verifyPathChildElement(svgChild, 'moo');
    });

    it('should allow multiple icon sets in a namespace', () => {
      iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(FAKE_SVGS.farmSet1));
      iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(FAKE_SVGS.farmSet2));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;
      let svgChild: any;

      testComponent.iconName = 'farm:pig';
      fixture.detectChanges();

      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      expect(svgElement.childNodes.length).toBe(1);
      svgChild = svgElement.childNodes[0];

      // The <svg> child should be the <g id="pig"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('pig');
      expect(svgChild.getAttribute('id')).toBeFalsy();
      expect(svgChild.childNodes.length).toBe(1);
      verifyPathChildElement(svgChild, 'oink');

      // Change the icon name to one that appears in both icon sets. The icon from the set that
      // was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
      // and no additional HTTP request should be made.
      testComponent.iconName = 'farm:cow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      svgChild = svgElement.childNodes[0];

      // The first <svg> child should be the <g id="cow"> element.
      expect(svgChild.tagName.toLowerCase()).toBe('g');
      expect(svgChild.getAttribute('name')).toBe('cow');
      expect(svgChild.childNodes.length).toBe(1);
      verifyPathChildElement(svgChild, 'moo moo');
    });

    it('should return unmodified copies of icons from icon sets', () => {
      iconRegistry.addSvgIconSetLiteral(trustHtml(FAKE_SVGS.arrows));

      const fixture = TestBed.createComponent(IconFromSvgName);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');
      let svgElement: any;

      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'left');

      // Modify the SVG element by setting a viewBox attribute.
      svgElement.setAttribute('viewBox', '0 0 100 100');

      // Switch to a different icon.
      testComponent.iconName = 'right-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'right');

      // Switch back to the first icon. The viewBox attribute should not be present.
      testComponent.iconName = 'left-arrow';
      fixture.detectChanges();
      svgElement = verifyAndGetSingleSvgChild(mdcIconElement);
      verifyPathChildElement(svgElement, 'left');
      expect(svgElement.getAttribute('viewBox')).toBeTruthy();
    });

    it('should add an extra string to the end of `style` tags inside SVG', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fido', trustHtml(`
        <svg>
          <style>#woof {color: blue;}</style>
          <path id="woof" name="woof"></path>
        </svg>
      `));

      const fixture = TestBed.createComponent(IconFromSvgName);
      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
      const styleTag = fixture.nativeElement.querySelector('mdc-icon svg style');

      // Note the extra whitespace at the end which is what we're testing for. This is a
      // workaround for IE and Edge ignoring `style` tags in dynamically-created SVGs.
      expect(styleTag.textContent).toBe('#woof {color: blue;} ');

      tick();
    }));

    it('should prepend the current path to attributes with `url()` references', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fido', trustHtml(`
        <svg>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          <circle cx="170" cy="60" r="50" fill="green" filter="url('#blur')" />
        </svg>
      `));

      const fixture = TestBed.createComponent(IconFromSvgName);
      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
      const circle = fixture.nativeElement.querySelector('mdc-icon svg circle');

      // We use a regex to match here, rather than the exact value, because different browsers
      // return different quotes through `getAttribute`, while some even omit the quotes altogether.
      expect(circle.getAttribute('filter')).toMatch(/^url\(['"]?\/fake-path#blur['"]?\)$/);

      tick();
    }));

    it('should use latest path when prefixing the `url()` references', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fido', trustHtml(`
        <svg>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          <circle cx="170" cy="60" r="50" fill="green" filter="url('#blur')" />
        </svg>
      `));

      let fixture = TestBed.createComponent(IconFromSvgName);
      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
      let circle = fixture.nativeElement.querySelector('mdc-icon svg circle');

      expect(circle.getAttribute('filter')).toMatch(/^url\(['"]?\/fake-path#blur['"]?\)$/);
      tick();
      fixture.destroy();

      fakePath = '/another-fake-path';
      fixture = TestBed.createComponent(IconFromSvgName);
      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
      circle = fixture.nativeElement.querySelector('mdc-icon svg circle');

      expect(circle.getAttribute('filter')).toMatch(/^url\(['"]?\/another-fake-path#blur['"]?\)$/);
      tick();
    }));

    it('should update the `url()` references when the path changes', fakeAsync(() => {
      iconRegistry.addSvgIconLiteral('fido', trustHtml(`
        <svg>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
           <circle cx="170" cy="60" r="50" fill="green" filter="url('#blur')" />
        </svg>
      `));
      const fixture = TestBed.createComponent(IconFromSvgName);
      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
      const circle = fixture.nativeElement.querySelector('mdc-icon svg circle');
      // We use a regex to match here, rather than the exact value, because different browsers
      // return different quotes through `getAttribute`, while some even omit the quotes altogether.
      expect(circle.getAttribute('filter')).toMatch(/^url\(['"]?\/fake-path#blur['"]?\)$/);
      tick();
      fakePath = '/different-path';
      fixture.detectChanges();
      expect(circle.getAttribute('filter')).toMatch(/^url\(['"]?\/different-path#blur['"]?\)$/);
    }));
  });

  describe('custom fonts', () => {
    it('should apply CSS classes for custom font and icon', () => {
      iconRegistry.registerFontClassAlias('f1', 'font1');
      iconRegistry.registerFontClassAlias('f2');

      const fixture = TestBed.createComponent(IconWithCustomFontCss);
      const testComponent = fixture.componentInstance;
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      testComponent.fontSet = 'f1';
      testComponent.fontIcon = 'house';
      fixture.detectChanges();
      expect(sortedClassNames(mdcIconElement)).toEqual(['font1', 'house', 'ngx-mdc-icon']);

      testComponent.fontSet = 'f2';
      testComponent.fontIcon = 'igloo';
      fixture.detectChanges();
      expect(sortedClassNames(mdcIconElement)).toEqual(['f2', 'igloo', 'ngx-mdc-icon']);

      testComponent.fontSet = 'f3';
      testComponent.fontIcon = 'tent';
      fixture.detectChanges();
      expect(sortedClassNames(mdcIconElement)).toEqual(['f3', 'ngx-mdc-icon', 'tent']);
    });

    it('should handle values with extraneous spaces being passed in to `fontSet`', () => {
      const fixture = TestBed.createComponent(IconWithCustomFontCss);
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      expect(() => {
        fixture.componentInstance.fontSet = 'font set';
        fixture.detectChanges();
      }).not.toThrow();

      expect(sortedClassNames(mdcIconElement)).toEqual(['font', 'ngx-mdc-icon']);

      expect(() => {
        fixture.componentInstance.fontSet = ' changed';
        fixture.detectChanges();
      }).not.toThrow();

      expect(sortedClassNames(mdcIconElement)).toEqual(['changed', 'ngx-mdc-icon']);
    });

    it('should handle values with extraneous spaces being passed in to `fontIcon`', () => {
      const fixture = TestBed.createComponent(IconWithCustomFontCss);
      const mdcIconElement = fixture.debugElement.nativeElement.querySelector('mdc-icon');

      expect(() => {
        fixture.componentInstance.fontIcon = 'font icon';
        fixture.detectChanges();
      }).not.toThrow();

      expect(sortedClassNames(mdcIconElement)).toEqual(['font', 'material-icons', 'ngx-mdc-icon']);

      expect(() => {
        fixture.componentInstance.fontIcon = ' changed';
        fixture.detectChanges();
      }).not.toThrow();

      expect(sortedClassNames(mdcIconElement)).toEqual(['changed', 'material-icons', 'ngx-mdc-icon']);
    });

  });

  /** Marks an SVG icon url as explicitly trusted. */
  function trustUrl(iconUrl: string): SafeResourceUrl {
    return sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
  }

  /** Marks an SVG icon string as explicitly trusted. */
  function trustHtml(iconHtml: string): SafeHtml {
    return sanitizer.bypassSecurityTrustHtml(iconHtml);
  }
});

describe('MdcIcon without HttpClientModule', () => {
  let iconRegistry: MdcIconRegistry;
  let sanitizer: DomSanitizer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcIconModule],
      declarations: [IconFromSvgName],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdcIconRegistry, DomSanitizer], (mir: MdcIconRegistry, ds: DomSanitizer) => {
    iconRegistry = mir;
    sanitizer = ds;
  }));

  it('should throw an error when trying to load a remote icon', async () => {
    const expectedError = wrappedErrorMessage(getMdcIconNoHttpProviderError());

    expect(() => {
      iconRegistry.addSvgIcon('fido', sanitizer.bypassSecurityTrustResourceUrl('dog.svg'));

      const fixture = TestBed.createComponent(IconFromSvgName);

      fixture.componentInstance.iconName = 'fido';
      fixture.detectChanges();
    }).toThrowError(expectedError);
  });
});

@Component({template: `<mdc-icon>{{iconName}}</mdc-icon>`})
class IconWithLigature {
  iconName = '';
}

@Component({template: `<mdc-icon [clickable]="false" [fontSet]="fontSet" [fontIcon]="fontIcon"></mdc-icon>`})
class IconWithCustomFontCss {
  fontSet = '';
  fontIcon = '';
}

@Component({template: `<mdc-icon [svgIcon]="iconName"></mdc-icon>`})
class IconFromSvgName {
  iconName: string | undefined = '';
}

@Component({template: '<mdc-icon aria-hidden="false">face</mdc-icon>'})
class IconWithAriaHiddenFalse {}

@Component({template: `<mdc-icon [svgIcon]="iconName" *ngIf="showIcon">{{iconName}}</mdc-icon>`})
class IconWithBindingAndNgIf {
  iconName = 'fluffy';
  showIcon = true;
}

@Component({template: `<mdc-icon [inline]="inline">{{iconName}}</mdc-icon>`})
class InlineIcon {
  inline = false;
}

@Component({template: `<mdc-icon clickable [svgIcon]="iconName"><div>Hello</div></mdc-icon>`})
class SvgIconWithUserContent {
  iconName: string | undefined = '';
}

@Component({template: '<mdc-icon [svgIcon]="iconName">house</mdc-icon>'})
class IconWithLigatureAndSvgBinding {
  iconName: string | undefined;
}
