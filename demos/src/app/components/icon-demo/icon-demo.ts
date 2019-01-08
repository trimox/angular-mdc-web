import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';
import { environment } from '../../../environments/environment';
import { MdcIcon, MdcIconRegistry } from '@angular-mdc/web';

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
    iconRegistry.addSvgIcon(
      'thumbup', sanitizer.bypassSecurityTrustResourceUrl(environment.production ?
        'https://trimox.github.io/angular-mdc-web/assets/thumbup-icon.svg' : '/assets/thumbup-icon.svg'));
  }

  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      icon.elementRef.nativeElement.classList.remove(demoIcon)
      : icon.elementRef.nativeElement.classList.add(demoIcon);
  }

  customSass = `.demo-icon-custom-colors {
  $color: $material-color-orange-500;

  @include mdc-theme-prop(color, $color);
}`;

  example1 = {
    html: `<mdc-icon>home</mdc-icon>`
  };

  exampleThemed = {
    html: `<mdc-icon class="demo-icon-custom-colors">home</mdc-icon>`,
    sass: this.customSass
  };

  example2 = {
    html: `<mdc-icon fontSet="fa" fontIcon="fa-camera"></mdc-icon>`,
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

  example4 = {
    html: `<mdc-text-field outlined label="Svg icon">
  <mdc-icon mdcTextFieldIcon leading svgIcon="thumbup" class="temporary-workaround-for-text-field-svg"></mdc-icon>
</mdc-text-field>`,
    ts: `import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';

constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry.addSvgIcon(
    'thumbup', sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'));
}`,
    sass: `.temporary-workaround-for-text-field-svg {
  top: .90em
}

.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon {
  fill: rgba(0, 0, 0, .54);
}`
  };
}
