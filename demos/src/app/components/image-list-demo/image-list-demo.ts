import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ template: '<component-viewer></component-viewer>' })
export class ImageListDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Image List',
      `Image lists display a collection of images in an organized grid.`,
      "import { MdcImageListModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Image Lists',
      url: 'https://material.io/design/components/image-lists.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-image-list/README.md'
    }];
  }
}

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './examples.html' })
export class Examples {
  images = Array.from(Array(15), (x, i) => i);

  masonryImages = [
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/16.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/1.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/1.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/2.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/3.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/2.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/4.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/3.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/5.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/4.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/6.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/5.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/2x3/7.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/6.jpg'},
    { image: 'https://material-components-web.appspot.com/images/photos/3x2/7.jpg'},
  ];

  example1 = {
    html: `<mdc-image-list class="standard-image-list image-list--rounded-corners">
  <mdc-image-list-item *ngFor="let i of images">
    <mdc-image-list-image-aspect>
      <img mdcImageListImage src="https://material-components-web.appspot.com/images/photos/3x2/{{i+1}}.jpg" />
    </mdc-image-list-image-aspect>
    <mdc-image-list-supporting>
      <span mdcImageListLabel>Text label</span>
    </mdc-image-list-supporting>
  </mdc-image-list-item>
</mdc-image-list>`,
sass: `.standard-image-list {
  @include mdc-image-list-aspect(1.5); // Images are 3:2
  @include mdc-image-list-standard-columns(5);
}

@media (max-width: 599px) {
  .standard-image-list {
    @include mdc-image-list-standard-columns(3);
  }
}

.image-list--rounded-corners {
  @include mdc-image-list-shape-radius(8px);
}`
  };

  example2 = {
    html: `<mdc-image-list masonry class="masonry-image-list">
  <mdc-image-list-item *ngFor="let item of masonryImages">
    <img mdcImageListImage src="{{item.image}}" />
    <mdc-image-list-supporting>
      <span mdcImageListLabel>Text label</span>
    </mdc-image-list-supporting>
  </mdc-image-list-item>
</mdc-image-list>`,
sass: `.masonry-image-list {
  @include mdc-image-list-masonry-columns(5);
}

@media (max-width: 599px) {
  .masonry-image-list {
    @include mdc-image-list-masonry-columns(3);
  }
}`
  };
}
