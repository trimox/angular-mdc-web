import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class ImageList implements OnInit {
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
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-image-list/README.md#sass-mixins'},
      ],
      code: `import {MdcImageListModule} from '@angular-mdc/web/image-list';`,
      sass: `@use '@material/image-list/mdc-image-list';
@use '@material/image-list';`
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
          header: 'MdcImageList',
          selectors: [
            'mdc-image-list',
          ],
          exportedAs: 'mdcImageList',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'masonry: boolean', summary: `Indicates that this Image List should use the Masonry variant.`},
                {name: 'textProtection: boolean', summary: 'Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image).'},
              ]
            },
          ]
        },
        {
          header: 'MdcImageListItem',
          summary: 'Mandatory. Indicates each item in an Image List.',
          selectors: [
            'mdc-image-list-item',
            'mdcImageListItem'
          ],
          exportedAs: 'mdcImageListItem',
        },
        {
          header: 'MdcImageListImageAspect',
          summary: `Optional. Parent of each item's image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio.`,
          selectors: [
            'mdc-image-list-image-aspect',
            'mdcImageListImageAspect',
          ],
          exportedAs: 'mdcImageListImageAspect',
        },
        {
          header: 'MdcImageListImage',
          summary: 'Mandatory. Indicates the image element in each item.',
          selectors: [
            'mdc-image-list-image',
            'mdcImageListImage',
          ],
          exportedAs: 'mdcImageListImage',
        },
        {
          header: 'MdcImageListSupporting',
          summary: 'Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels.',
          selectors: [
            'mdc-image-list-supporting',
            'mdcImageListSupporting'
          ],
          exportedAs: 'mdcImageListSupporting',
        },
        {
          header: 'MdcImageListLabel',
          summary: 'Optional. Indicates the text label in each item, if the Image List contains text labels.',
          selectors: [
            'mdc-image-list-label',
            'mdcImageListLabel'
          ],
          exportedAs: 'mdcImageListLabel',
        },
      ]
    };
  }
}

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
