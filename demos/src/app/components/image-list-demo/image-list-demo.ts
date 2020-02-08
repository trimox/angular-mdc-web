import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class ImageListDemo implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Image List',
      description: 'MDC Image List provides a RTL-aware Material Design image list component. An Image List consists of several items, each containing an image and optionally supporting content (i.e. a text label).',
      references: [{
        name: 'Material Design guidelines: Image Lists',
        url: 'https://material.io/design/components/image-lists.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-image-list/README.md'
      }],
      code: `import {MdcImageListModule} from '@angular-mdc/web';`,
      sass: `@use '@material/image-list/mdc-image-list';
@use '@material/image-list';`
    };
  }
}

@Component({templateUrl: './api.html'})
export class Api {}

@Component({templateUrl: './sass.html'})
export class Sass {}

@Component({templateUrl: './examples.html'})
export class Examples {
  images = Array.from(Array(15), (x, i) => i);

  masonryImages = [
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/16.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/1.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/1.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/2.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/3.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/2.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/4.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/3.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/5.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/4.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/6.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/5.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/2x3/7.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/6.jpg'},
    {image: 'https://material-components-web.appspot.com/images/photos/3x2/7.jpg'},
  ];

  exampleStandard = {
    html: `<mdc-image-list class="standard-image-list image-list--rounded-corners">
  <mdc-image-list-item *ngFor="let i of images">
    <mdc-image-list-image-aspect>
      <img mdcImageListImage src="<image goes here>" />
    </mdc-image-list-image-aspect>
    <mdc-image-list-supporting>
      <span mdcImageListLabel>Text label</span>
    </mdc-image-list-supporting>
  </mdc-image-list-item>
</mdc-image-list>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_image-list.scss`
  };

  exampleMasonry = {
    html: `<mdc-image-list masonry class="masonry-image-list">
  <mdc-image-list-item *ngFor="let item of masonryImages">
    <img mdcImageListImage src="{{item.image}}" />
    <mdc-image-list-supporting>
      <span mdcImageListLabel>Text label</span>
    </mdc-image-list-supporting>
  </mdc-image-list-item>
</mdc-image-list>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_image-list.scss`
  };
}
