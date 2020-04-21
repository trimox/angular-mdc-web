import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';
import {environment} from '../../../environments/environment';
import {MdcIcon, MdcIconRegistry} from '@angular-mdc/web/icon';

const BIKE_ICON =
  `<svg xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 ` +
  `5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 ` +
  `1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 ` +
  `0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 ` +
  `1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 ` +
  `5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 ` +
  `3.5-3.5 3.5z"/>
</svg>`;

const INLINE_ICON_SET =
  `<svg>
  <defs>
  <svg id="account-balance">
    <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-` +
  `7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
  </svg>
  <svg id="account-balance-wallet">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-` +
  `2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9` +
  `-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
    />
  </svg>
  <svg id="account-box">
    <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H` +
  `5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-` +
  `3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
  </svg>
  </defs>
</svg>`;

@Component({template: '<component-viewer></component-viewer>'})
export class Icon implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Icons',
      description: 'Material icons use geometric shapes to visually represent core ideas, capabilities, or topics.',
      references: [{
        name: 'Material Design guidelines: Icons',
        url: 'https://material.io/guidelines/style/icons.html'
      }],
      code: `import {MdcIconModule} from '@angular-mdc/web/icon';`,
      tabs: [{
        label: 'Api',
        route: './api'
      },
      {
        label: 'Examples',
        route: './examples'
      }]
    };
  }
}

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcIconRegistry (Service)',
          summary: `Service to register and display icons used by the <mdc-icon> component.

          - Registers icon URLs by namespace and name.
          - Registers icon set URLs by namespace.
          - Registers aliases for CSS classes, for use with icon fonts.
          - Loads icons from URLs and extracts individual icons from icon sets.`,
          categories: [
            {
              name: 'Methods',
              items: [
                {name: 'addSvgIcon(iconName: string, url: SafeResourceUrl, options?: IconOptions)', summary: `Registers an icon by URL in the default namespace.`},
                {name: 'addSvgIconInNamespace(namespace: string, iconName: string, url: SafeResourceUrl, options?: IconOptions)', summary: `Registers an icon by URL in the specified namespace.`},
                {name: 'addSvgIconLiteral(iconName: string, literal: SafeHtml, options?: IconOptions)', summary: `Registers an icon using an HTML string in the default namespace.`},
                {name: 'addSvgIconLiteralInNamespace(namespace: string, iconName: string, literal: SafeHtml, options?: IconOptions)', summary: `Registers an icon using an HTML string in the specified namespace.`},
                {name: 'addSvgIconSet(url: SafeResourceUrl, options?: IconOptions)', summary: `Registers an icon set by URL in the default namespace.`},
                {name: 'addSvgIconSetInNamespace(namespace: string, url: SafeResourceUrl, options?: IconOptions)', summary: `Registers an icon set by URL in the specified namespace.`},
                {name: 'addSvgIconSetLiteral(literal: SafeHtml, options?: IconOptions)', summary: `Registers an icon set using an HTML string in the default namespace.`},
                {name: 'addSvgIconSetLiteralInNamespace(namespace: string, literal: SafeHtml, options?: IconOptions)', summary: `Registers an icon set using an HTML string in the specified namespace.`},
                {name: 'classNameForFontAlias(alias: string)', summary: `Returns the CSS class name associated with the alias by a previous call to registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.`},
                {name: 'getDefaultFontSetClass()', summary: `Returns the CSS class name to be used for icon fonts when an <mdc-icon> component does not have a fontSet input value, and is not loading an icon by name or URL.`},
                {name: 'getNamedSvgIcon(name: string, namespace: string)', summary: `Returns an Observable that produces the icon (as an <svg> DOM element) with the given name and namespace. The icon must have been previously registered with addIcon or addIconSet; if not, the Observable will throw an error.`},
                {name: 'getSvgIconFromUrl(safeUrl: SafeResourceUrl)', summary: `Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL. The response from the URL may be cached so this will not always cause an HTTP request, but the produced element will always be a new copy of the originally fetched icon. (That is, it will not contain any modifications made to elements previously returned).`},
                {name: 'registerFontClassAlias(alias: string, className: string = alias)', summary: `Defines an alias for a CSS class name to be used for icon fonts. Creating an mdcIcon component with the alias as the fontSet input will cause the class name to be applied to the <mdc-icon> element.`},
                {name: 'setDefaultFontSetClass(className: string)', summary: `Sets the CSS class name to be used for icon fonts when an <mdc-icon> component does not have a fontSet input value, and is not loading an icon by name or URL.`},
              ]
            },
          ]
        },
        {
          header: 'MdcIcon (Directive)',
          selectors: [
            'mdc-icon',
            'mdcIcon',
            'a[mdc-icon]',
          ],
          exportedAs: 'mdcIcon',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'fontSet: string', summary: `Font set that the icon is a part of.`},
                {name: 'fontIcon: string', summary: `Name of an icon within a font set.`},
                {name: 'svgIcon: string', summary: `Name of the icon in the SVG icon set.`},
                {name: 'inline: boolean', summary: `Whether the icon should be inlined, automatically sizing the icon to match the font size of the element the icon is contained in.`},
              ]
            },
            {
              name: 'Interfaces',
              summary: 'Options that can be used to configure how an icon or the icons in an icon set are presented.',
              items: [
                {name: 'viewBox: string', summary: `View box to set on the icon.`},
              ]
            },
          ]
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon('thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl(environment.production ?
          'https://trimox.github.io/angular-mdc-web/assets/thumbup-icon.svg' : '/assets/thumbup-icon.svg'))
      .addSvgIconLiteral('bike',
        sanitizer.bypassSecurityTrustHtml(BIKE_ICON))
      .addSvgIconSetInNamespace('core',
        sanitizer.bypassSecurityTrustResourceUrl(environment.production ?
          'https://trimox.github.io/angular-mdc-web/assets/core-icon-set.svg' : '/assets/core-icon-set.svg'))
      .addSvgIconSetLiteralInNamespace('core-inline',
        sanitizer.bypassSecurityTrustHtml(INLINE_ICON_SET))
      .registerFontClassAlias('fontawesome', 'fa');

    console.log(iconRegistry);
  }

  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      icon.elementRef.nativeElement.classList.remove(demoIcon)
      : icon.elementRef.nativeElement.classList.add(demoIcon);
  }

  customHeader = `import { DomSanitizer } from '@angular/platform-browser';
import {MdcIconRegistry} from '@angular-mdc/web';

constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry`;

  customSass = `.demo-icon-custom-colors {
  $color: $material-color-orange-500;

  @include mdc-theme-prop(color, $color);
}`;

  exampleMaterial = {
    html: `<mdc-icon>home</mdc-icon>`
  };

  exampleTheme = {
    html: `<mdc-icon class="demo-icon-custom-colors">home</mdc-icon>`,
    sass: this.customSass
  };

  exampleFa = {
    html: `<mdc-icon fontSet="fa" fontIcon="fa-camera"></mdc-icon>

<mdc-icon fontSet="fa" fontIcon="fa-camera" class="demo-icon-custom-colors"></mdc-icon>`,
    ts: `${this.customHeader}
    .registerFontClassAlias('fontawesome', 'fa');`,
    sass: this.customSass
  };

  exampleSvg = {
    html: `<mdc-icon>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
  </svg>
</mdc-icon>`
  };

  exampleInline = {
    html: `<p>
  My <span>dog</span>
  <mdc-icon inline>pets</mdc-icon> is my
  <span>favorite</span>
  <mdc-icon inline>favorite</mdc-icon>,
  he loves to go on <span>walks</span>
  <mdc-icon inline>directions_walk</mdc-icon>
</p>`
  };

  exampleAddSvgIcon = {
    html: `<mdc-icon svgIcon="thumbs-up"></mdc-icon>`,
    ts: `${this.customHeader}
    .addSvgIcon('thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'));`
  };

  exampleSvgIconLiteral = {
    html: `<mdc-icon svgIcon="bike"></mdc-icon>
<mdc-icon svgIcon="bike" class="demo-svg-custom-color"></mdc-icon>`,
    ts: `${this.customHeader}
    .addSvgIconLiteral('bike',
      sanitizer.bypassSecurityTrustHtml(BIKE_ICON));`,
    svg: `const BIKE_ICON =
\`${BIKE_ICON}\`;`,
    sass: `.demo-svg-custom-color {
  $color: $material-color-orange-500;

  @include mdc-theme-prop(fill, $color);
}`
  };

  exampleSvgIconSetInNamespace = {
    html: `<mdc-icon svgIcon="core:alarm"></mdc-icon>

<mdc-icon svgIcon="core:accessibility"></mdc-icon>

<mdc-icon svgIcon="core:alarm"></mdc-icon>`,
    ts: `${this.customHeader}
    .addSvgIconSetInNamespace('core',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/core-icon-set.svg'));`
  };

  exampleSvgIconSetLiteralInNamespace = {
    html: `<mdc-icon svgIcon="core-inline:account-balance"></mdc-icon>

<mdc-icon svgIcon="core-inline:account-balance-wallet"></mdc-icon>

<mdc-icon svgIcon="core-inline:account-box"></mdc-icon>`,
    ts: `${this.customHeader}
    .addSvgIconSetLiteralInNamespace('core-inline',
      sanitizer.bypassSecurityTrustHtml(INLINE_ICON_SET));`,
    svg: `const INLINE_ICON_SET =
\`${INLINE_ICON_SET}\`;`
  };
}
