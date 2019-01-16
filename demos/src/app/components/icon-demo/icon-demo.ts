import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';
import { environment } from '../../../environments/environment';
import { MdcIcon, MdcIconRegistry } from '@angular-mdc/web';

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

@Component({ template: '<component-viewer></component-viewer>' })
export class IconDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Icons',
      `Material icons use geometric shapes to visually represent core ideas, capabilities, or topics.`,
      "import { MdcIconModule } from '@angular-mdc/web';",
      [{
        label: 'Api',
        route: './api'
      }, {
        label: 'Examples',
        route: './examples'
      }]);

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Icons',
      url: 'https://material.io/guidelines/style/icons.html'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './examples.html' })
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
          'https://trimox.github.io/angular-mdc-web/assets/thumbup-icon.svg' : '/assets/core-icon-set.svg'))
      .addSvgIconSetLiteralInNamespace('core-inline',
        sanitizer.bypassSecurityTrustHtml(INLINE_ICON_SET))
      .registerFontClassAlias('fontawesome', 'fa');

    console.log(iconRegistry)
  }

  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      icon.elementRef.nativeElement.classList.remove(demoIcon)
      : icon.elementRef.nativeElement.classList.add(demoIcon);
  }

  customHeader = `import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';

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
