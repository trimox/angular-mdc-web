import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class TypographyDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Typography',
      description: 'Use typography to present your design and content as clearly and efficiently as possible.',
      references: [{
        name: 'Material Design guidelines: Typography',
        url: 'https://material.io/design/typography/#type-scale'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-typography/README.md'
      }],
      code: `import {MdcTypographyModule} from '@angular-mdc/web';`,
      sass: `@use '@material/typography';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {
  exampleOverrideButton = {
    sass: `$mdc-typography-styles-button: (
  font-size: 16px,
  text-transform: none
);`
  };

  exampleOverrideGlobalFontFamily = {
    sass: `$mdc-typography-font-family: "Arial, Helvetica, sans-serif";`
  };
  exampleOverrideFontFamily = {
    sass: `$mdc-typography-styles-headline1: (
  font-family: unquote("Arial, Helvetica, sans-serif")
);
$mdc-typography-styles-headline2: (
  font-family: unquote("Arial, Helvetica, sans-serif"),
  font-size: 3.25rem
);`
  };
}

@Component({templateUrl: './examples.html'})
export class Examples {
  exampleRoboto = {
    html: `<body class="mdc-typography">
  <app-root></app-root>
</body>`
  };

  exampleHeadline = {
    html: `<div mdcHeadline1>Headline 1</div>
<div mdcHeadline2>Headline 2</div>
<div mdcHeadline3>Headline 3</div>
<div mdcHeadline4>Headline 4</div>
<div mdcHeadline5>Headline 5</div>
<div mdcHeadline6>Headline 6</div>`
  };

  exampleSubtitle = {
    html: `<div mdcSubtitle1>Subtitle 1</div>
<div mdcSubtitle2>Subtitle 2</div>`
  };

  exampleBody = {
    html: `<div mdcBody1>Body 1</div>
<div mdcBody2>Body 2</div>`
  };

  exampleMisc = {
    html: `<div mdcButton>Button text</div>
<div mdcCaption>Caption text</div>
<div mdcOverline>Overline text</div>`
  };
}
