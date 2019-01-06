import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ template: '<component-viewer></component-viewer>' })
export class ChipsDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Chips',
      `Chips are compact elements that allow users to enter information,
       select a choice, filter content, or trigger an action.`,
      "import { MdcChipsModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Chips',
      url: 'https://material.io/guidelines/components/chips.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md'
    }];
  }
}

@Component({ templateUrl: './examples.html' })
export class Examples {
  example1 = {
    html: `<mdc-chip-set>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Jane Smith</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  example2 = {
    html: `<mdc-chip-set input>
  <mdc-chip label="Alice">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label="Bob">
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='Charlie'>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
  <mdc-chip label='David'>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
</mdc-chip-set>`
  };

  example3 = {
    html: `<mdc-chip-set choice>
  <mdc-chip>
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Get Weather</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Add to Calendar</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  example4 = {
    html: `<mdc-chip-set filter>
  <mdc-chip>
    <mdc-chip-text>Tops</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Bottoms</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Shoes</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-text>Accessories</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  example5 = {
    html: `<mdc-chip-set filter>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Alice</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Bob</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Charlie</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>face</mdc-chip-icon>
    <mdc-chip-text>David</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  example6 = {
    html: `<mdc-chip-set>
  <mdc-chip>
    <mdc-chip-icon leading>wb_sunny</mdc-chip-icon>
    <mdc-chip-text>Turn on lights</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>bookmark</mdc-chip-icon>
    <mdc-chip-text>Bookmark</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>alarm</mdc-chip-icon>
    <mdc-chip-text>Set alarm</mdc-chip-text>
  </mdc-chip>
  <mdc-chip>
    <mdc-chip-icon leading>directions</mdc-chip-icon>
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
  };

  example7 = {
    html: `<mdc-chip-set>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Turn on lights</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Bookmark</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Set alarm</mdc-chip-text>
  </mdc-chip>
  <mdc-chip class="custom-chip-secondary">
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`,
    sass: `.custom-chip-secondary {
  @include mdc-chip-fill-color(white);
  @include mdc-chip-ink-color($mdc-theme-secondary);
  @include mdc-chip-selected-ink-color($mdc-theme-secondary);
  @include mdc-chip-outline(2px, solid, $mdc-theme-secondary);
}`
  };
}
