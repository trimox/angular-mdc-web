import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../shared/component-viewer';

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ templateUrl: './usage.html' })
export class Usage {
  exampleUsage = `$mdc-theme-primary: #fcb8ab;
$mdc-theme-secondary: #feeae6;
$mdc-theme-on-primary: #442b2d;
$mdc-theme-on-secondary: #442b2d;`;
}

@Component({ template: '<component-viewer></component-viewer>' })
export class Theme implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Theme',
      'The Material Design color system can be used to create a color scheme that reflects your brand or style.');

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Color',
      url: 'https://material.io/design/material-theming/overview.html#material-theming'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme'
    }];

    this._componentViewer.componentView.tabs = [{
      label: 'Usage',
      route: './usage'
    }, {
      label: 'Sass',
      route: './sass'
    }, {
      label: 'Color Palette',
      route: './color-palette'
    }];
  }
}

@Component({ template: '<pre><code [highlight]="colorPalette"></code></pre>' })
export class ColorPalette {
  colorPalette = `
  $material-color-red-50: #ffebee;
  $material-color-red-100: #ffcdd2;
  $material-color-red-200: #ef9a9a;
  $material-color-red-300: #e57373;
  $material-color-red-400: #ef5350;
  $material-color-red-500: #f44336;
  $material-color-red-600: #e53935;
  $material-color-red-700: #d32f2f;
  $material-color-red-800: #c62828;
  $material-color-red-900: #b71c1c;
  $material-color-red-a100: #ff8a80;
  $material-color-red-a200: #ff5252;
  $material-color-red-a400: #ff1744;
  $material-color-red-a700: #d50000;

  $material-color-pink-50: #fce4ec;
  $material-color-pink-100: #f8bbd0;
  $material-color-pink-200: #f48fb1;
  $material-color-pink-300: #f06292;
  $material-color-pink-400: #ec407a;
  $material-color-pink-500: #e91e63;
  $material-color-pink-600: #d81b60;
  $material-color-pink-700: #c2185b;
  $material-color-pink-800: #ad1457;
  $material-color-pink-900: #880e4f;
  $material-color-pink-a100: #ff80ab;
  $material-color-pink-a200: #ff4081;
  $material-color-pink-a400: #f50057;
  $material-color-pink-a700: #c51162;

  $material-color-purple-50: #f3e5f5;
  $material-color-purple-100: #e1bee7;
  $material-color-purple-200: #ce93d8;
  $material-color-purple-300: #ba68c8;
  $material-color-purple-400: #ab47bc;
  $material-color-purple-500: #9c27b0;
  $material-color-purple-600: #8e24aa;
  $material-color-purple-700: #7b1fa2;
  $material-color-purple-800: #6a1b9a;
  $material-color-purple-900: #4a148c;
  $material-color-purple-a100: #ea80fc;
  $material-color-purple-a200: #e040fb;
  $material-color-purple-a400: #d500f9;
  $material-color-purple-a700: #a0f;

  $material-color-deep-purple-50: #ede7f6;
  $material-color-deep-purple-100: #d1c4e9;
  $material-color-deep-purple-200: #b39ddb;
  $material-color-deep-purple-300: #9575cd;
  $material-color-deep-purple-400: #7e57c2;
  $material-color-deep-purple-500: #673ab7;
  $material-color-deep-purple-600: #5e35b1;
  $material-color-deep-purple-700: #512da8;
  $material-color-deep-purple-800: #4527a0;
  $material-color-deep-purple-900: #311b92;
  $material-color-deep-purple-a100: #b388ff;
  $material-color-deep-purple-a200: #7c4dff;
  $material-color-deep-purple-a400: #651fff;
  $material-color-deep-purple-a700: #6200ea;

  $material-color-indigo-50: #e8eaf6;
  $material-color-indigo-100: #c5cae9;
  $material-color-indigo-200: #9fa8da;
  $material-color-indigo-300: #7986cb;
  $material-color-indigo-400: #5c6bc0;
  $material-color-indigo-500: #3f51b5;
  $material-color-indigo-600: #3949ab;
  $material-color-indigo-700: #303f9f;
  $material-color-indigo-800: #283593;
  $material-color-indigo-900: #1a237e;
  $material-color-indigo-a100: #8c9eff;
  $material-color-indigo-a200: #536dfe;
  $material-color-indigo-a400: #3d5afe;
  $material-color-indigo-a700: #304ffe;

  $material-color-blue-50: #e3f2fd;
  $material-color-blue-100: #bbdefb;
  $material-color-blue-200: #90caf9;
  $material-color-blue-300: #64b5f6;
  $material-color-blue-400: #42a5f5;
  $material-color-blue-500: #2196f3;
  $material-color-blue-600: #1e88e5;
  $material-color-blue-700: #1976d2;
  $material-color-blue-800: #1565c0;
  $material-color-blue-900: #0d47a1;
  $material-color-blue-a100: #82b1ff;
  $material-color-blue-a200: #448aff;
  $material-color-blue-a400: #2979ff;
  $material-color-blue-a700: #2962ff;

  $material-color-light-blue-50: #e1f5fe;
  $material-color-light-blue-100: #b3e5fc;
  $material-color-light-blue-200: #81d4fa;
  $material-color-light-blue-300: #4fc3f7;
  $material-color-light-blue-400: #29b6f6;
  $material-color-light-blue-500: #03a9f4;
  $material-color-light-blue-600: #039be5;
  $material-color-light-blue-700: #0288d1;
  $material-color-light-blue-800: #0277bd;
  $material-color-light-blue-900: #01579b;
  $material-color-light-blue-a100: #80d8ff;
  $material-color-light-blue-a200: #40c4ff;
  $material-color-light-blue-a400: #00b0ff;
  $material-color-light-blue-a700: #0091ea;

  $material-color-cyan-50: #e0f7fa;
  $material-color-cyan-100: #b2ebf2;
  $material-color-cyan-200: #80deea;
  $material-color-cyan-300: #4dd0e1;
  $material-color-cyan-400: #26c6da;
  $material-color-cyan-500: #00bcd4;
  $material-color-cyan-600: #00acc1;
  $material-color-cyan-700: #0097a7;
  $material-color-cyan-800: #00838f;
  $material-color-cyan-900: #006064;
  $material-color-cyan-a100: #84ffff;
  $material-color-cyan-a200: #18ffff;
  $material-color-cyan-a400: #00e5ff;
  $material-color-cyan-a700: #00b8d4;

  $material-color-teal-50: #e0f2f1;
  $material-color-teal-100: #b2dfdb;
  $material-color-teal-200: #80cbc4;
  $material-color-teal-300: #4db6ac;
  $material-color-teal-400: #26a69a;
  $material-color-teal-500: #009688;
  $material-color-teal-600: #00897b;
  $material-color-teal-700: #00796b;
  $material-color-teal-800: #00695c;
  $material-color-teal-900: #004d40;
  $material-color-teal-a100: #a7ffeb;
  $material-color-teal-a200: #64ffda;
  $material-color-teal-a400: #1de9b6;
  $material-color-teal-a700: #00bfa5;

  $material-color-green-50: #e8f5e9;
  $material-color-green-100: #c8e6c9;
  $material-color-green-200: #a5d6a7;
  $material-color-green-300: #81c784;
  $material-color-green-400: #66bb6a;
  $material-color-green-500: #4caf50;
  $material-color-green-600: #43a047;
  $material-color-green-700: #388e3c;
  $material-color-green-800: #2e7d32;
  $material-color-green-900: #1b5e20;
  $material-color-green-a100: #b9f6ca;
  $material-color-green-a200: #69f0ae;
  $material-color-green-a400: #00e676;
  $material-color-green-a700: #00c853;

  $material-color-light-green-50: #f1f8e9;
  $material-color-light-green-100: #dcedc8;
  $material-color-light-green-200: #c5e1a5;
  $material-color-light-green-300: #aed581;
  $material-color-light-green-400: #9ccc65;
  $material-color-light-green-500: #8bc34a;
  $material-color-light-green-600: #7cb342;
  $material-color-light-green-700: #689f38;
  $material-color-light-green-800: #558b2f;
  $material-color-light-green-900: #33691e;
  $material-color-light-green-a100: #ccff90;
  $material-color-light-green-a200: #b2ff59;
  $material-color-light-green-a400: #76ff03;
  $material-color-light-green-a700: #64dd17;

  $material-color-lime-50: #f9fbe7;
  $material-color-lime-100: #f0f4c3;
  $material-color-lime-200: #e6ee9c;
  $material-color-lime-300: #dce775;
  $material-color-lime-400: #d4e157;
  $material-color-lime-500: #cddc39;
  $material-color-lime-600: #c0ca33;
  $material-color-lime-700: #afb42b;
  $material-color-lime-800: #9e9d24;
  $material-color-lime-900: #827717;
  $material-color-lime-a100: #f4ff81;
  $material-color-lime-a200: #eeff41;
  $material-color-lime-a400: #c6ff00;
  $material-color-lime-a700: #aeea00;

  $material-color-yellow-50: #fffde7;
  $material-color-yellow-100: #fff9c4;
  $material-color-yellow-200: #fff59d;
  $material-color-yellow-300: #fff176;
  $material-color-yellow-400: #ffee58;
  $material-color-yellow-500: #ffeb3b;
  $material-color-yellow-600: #fdd835;
  $material-color-yellow-700: #fbc02d;
  $material-color-yellow-800: #f9a825;
  $material-color-yellow-900: #f57f17;
  $material-color-yellow-a100: #ffff8d;
  $material-color-yellow-a200: #ff0;
  $material-color-yellow-a400: #ffea00;
  $material-color-yellow-a700: #ffd600;

  $material-color-amber-50: #fff8e1;
  $material-color-amber-100: #ffecb3;
  $material-color-amber-200: #ffe082;
  $material-color-amber-300: #ffd54f;
  $material-color-amber-400: #ffca28;
  $material-color-amber-500: #ffc107;
  $material-color-amber-600: #ffb300;
  $material-color-amber-700: #ffa000;
  $material-color-amber-800: #ff8f00;
  $material-color-amber-900: #ff6f00;
  $material-color-amber-a100: #ffe57f;
  $material-color-amber-a200: #ffd740;
  $material-color-amber-a400: #ffc400;
  $material-color-amber-a700: #ffab00;

  $material-color-orange-50: #fff3e0;
  $material-color-orange-100: #ffe0b2;
  $material-color-orange-200: #ffcc80;
  $material-color-orange-300: #ffb74d;
  $material-color-orange-400: #ffa726;
  $material-color-orange-500: #ff9800;
  $material-color-orange-600: #fb8c00;
  $material-color-orange-700: #f57c00;
  $material-color-orange-800: #ef6c00;
  $material-color-orange-900: #e65100;
  $material-color-orange-a100: #ffd180;
  $material-color-orange-a200: #ffab40;
  $material-color-orange-a400: #ff9100;
  $material-color-orange-a700: #ff6d00;

  $material-color-deep-orange-50: #fbe9e7;
  $material-color-deep-orange-100: #ffccbc;
  $material-color-deep-orange-200: #ffab91;
  $material-color-deep-orange-300: #ff8a65;
  $material-color-deep-orange-400: #ff7043;
  $material-color-deep-orange-500: #ff5722;
  $material-color-deep-orange-600: #f4511e;
  $material-color-deep-orange-700: #e64a19;
  $material-color-deep-orange-800: #d84315;
  $material-color-deep-orange-900: #bf360c;
  $material-color-deep-orange-a100: #ff9e80;
  $material-color-deep-orange-a200: #ff6e40;
  $material-color-deep-orange-a400: #ff3d00;
  $material-color-deep-orange-a700: #dd2c00;

  $material-color-brown-50: #efebe9;
  $material-color-brown-100: #d7ccc8;
  $material-color-brown-200: #bcaaa4;
  $material-color-brown-300: #a1887f;
  $material-color-brown-400: #8d6e63;
  $material-color-brown-500: #795548;
  $material-color-brown-600: #6d4c41;
  $material-color-brown-700: #5d4037;
  $material-color-brown-800: #4e342e;
  $material-color-brown-900: #3e2723;

  $material-color-grey-50: #fafafa;
  $material-color-grey-100: #f5f5f5;
  $material-color-grey-200: #eee;
  $material-color-grey-300: #e0e0e0;
  $material-color-grey-400: #bdbdbd;
  $material-color-grey-500: #9e9e9e;
  $material-color-grey-600: #757575;
  $material-color-grey-700: #616161;
  $material-color-grey-800: #424242;
  $material-color-grey-900: #212121;

  $material-color-blue-grey-50: #eceff1;
  $material-color-blue-grey-100: #cfd8dc;
  $material-color-blue-grey-200: #b0bec5;
  $material-color-blue-grey-300: #90a4ae;
  $material-color-blue-grey-400: #78909c;
  $material-color-blue-grey-500: #607d8b;
  $material-color-blue-grey-600: #546e7a;
  $material-color-blue-grey-700: #455a64;
  $material-color-blue-grey-800: #37474f;
  $material-color-blue-grey-900: #263238;
`;
}
