function _defineProperties(l,n){for(var u=0;u<n.length;u++){var e=n[u];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(l,e.key,e)}}function _createClass(l,n,u){return n&&_defineProperties(l.prototype,n),u&&_defineProperties(l,u),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"+9rJ":function(l,n,u){"use strict";u.r(n);var e=u("8Y7J"),a=function l(){_classCallCheck(this,l)},t=u("+ZNK"),i=u("KCvt"),s=u("knxA"),o=u("alYm"),c=u("pMnS"),b=u("IKgy"),m=u("LuDt");u("leug");var r=function(){function l(){_classCallCheck(this,l)}return _createClass(l,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Image List",description:"MDC Image List provides a RTL-aware Material Design image list component. An Image List consists of several items, each containing an image and optionally supporting content (i.e. a text label).",references:[{name:"Material Design guidelines: Image Lists",url:"https://material.io/design/components/image-lists.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-image-list/README.md"}],code:"import {MdcImageListModule} from '@angular-mdc/web';",sass:"@use '@material/image-list/mdc-image-list';\n@use '@material/image-list';"}}}]),l}(),d=function l(){_classCallCheck(this,l)},p=function l(){_classCallCheck(this,l)},g=function l(){_classCallCheck(this,l),this.images=Array.from(Array(15),(function(l,n){return n})),this.masonryImages=[{image:"https://material-components-web.appspot.com/images/photos/3x2/16.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/1.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/1.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/2.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/3.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/2.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/4.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/3.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/5.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/4.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/6.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/5.jpg"},{image:"https://material-components-web.appspot.com/images/photos/2x3/7.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/6.jpg"},{image:"https://material-components-web.appspot.com/images/photos/3x2/7.jpg"}],this.exampleStandard={html:'<mdc-image-list class="standard-image-list image-list--rounded-corners">\n  <mdc-image-list-item *ngFor="let i of images">\n    <mdc-image-list-image-aspect>\n      <img mdcImageListImage src="<image goes here>" />\n    </mdc-image-list-image-aspect>\n    <mdc-image-list-supporting>\n      <span mdcImageListLabel>Text label</span>\n    </mdc-image-list-supporting>\n  </mdc-image-list-item>\n</mdc-image-list>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_image-list.scss"},this.exampleMasonry={html:'<mdc-image-list masonry class="masonry-image-list">\n  <mdc-image-list-item *ngFor="let item of masonryImages">\n    <img mdcImageListImage src="{{item.image}}" />\n    <mdc-image-list-supporting>\n      <span mdcImageListLabel>Text label</span>\n    </mdc-image-list-supporting>\n  </mdc-image-list-item>\n</mdc-image-list>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_image-list.scss"}},h=u("5l+6"),y=u("dEKC"),f=u("nmYj"),x=u("dJsq"),L=u("cUpR"),v=u("//9D"),k=u("+O8G"),w=u("0fpz"),I=u("9UYg"),_=u("SVse"),X=u("XbMX"),S=u("dkiD"),N=u("aXvW"),C=e.wb({encapsulation:2,styles:[],data:{}});function M(l){return e.ac(0,[e.Tb(402653184,1,{_componentViewer:0}),(l()(),e.yb(1,0,null,null,1,"component-viewer",[],null,null,null,b.b,b.a)),e.xb(2,114688,[[1,4]],0,m.a,[],null,null)],(function(l,n){l(n,2,0)}),null)}var j=e.ub("ng-component",r,(function(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,1,"ng-component",[],null,null,null,M,C)),e.xb(1,114688,null,0,r,[],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),R=e.wb({encapsulation:2,styles:[],data:{}});function O(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,31,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(1,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(2,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageList"])),(l()(),e.yb(4,0,null,null,3,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(6,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(9,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageList"])),(l()(),e.yb(11,0,null,null,2,"h4",[["class","mdc-typography--subtitle2"],["mdcSubtitle2",""]],null,null,null,null,null)),e.xb(12,16384,null,0,h.l,[],null,null),(l()(),e.Xb(-1,null,["Properties"])),(l()(),e.yb(14,0,null,null,17,"table",[],null,null,null,null,null)),(l()(),e.yb(15,0,null,null,5,"thead",[],null,null,null,null,null)),(l()(),e.yb(16,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),e.yb(17,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Name"])),(l()(),e.yb(19,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Description"])),(l()(),e.yb(21,0,null,null,10,"tbody",[],null,null,null,null,null)),(l()(),e.yb(22,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),e.yb(23,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["masonry: boolean"])),(l()(),e.yb(25,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Indicates that this Image List should use the Masonry variant."])),(l()(),e.yb(27,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),e.yb(28,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["textProtection: boolean"])),(l()(),e.yb(30,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image)."])),(l()(),e.yb(32,0,null,null,13,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(33,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(34,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageListItem"])),(l()(),e.Xb(-1,null,[" Mandatory. Indicates each item in an Image List. "])),(l()(),e.yb(37,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(39,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list-item"])),(l()(),e.yb(41,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListItem"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(44,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListItem"])),(l()(),e.yb(46,0,null,null,13,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(47,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(48,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageListImageAspect"])),(l()(),e.Xb(-1,null,[" Optional. Parent of each item's image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. "])),(l()(),e.yb(51,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(53,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list-image-aspect"])),(l()(),e.yb(55,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListImageAspect"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(58,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListImageAspect"])),(l()(),e.yb(60,0,null,null,13,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(61,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(62,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageListImage"])),(l()(),e.Xb(-1,null,[" Mandatory. Indicates the image element in each item. "])),(l()(),e.yb(65,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(67,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list-image"])),(l()(),e.yb(69,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListImage"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(72,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListImage"])),(l()(),e.yb(74,0,null,null,13,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(75,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(76,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageListSupporting"])),(l()(),e.Xb(-1,null,[" Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. "])),(l()(),e.yb(79,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(81,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list-supporting"])),(l()(),e.yb(83,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["MdcImageListSupporting"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(86,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListSupporting"])),(l()(),e.yb(88,0,null,null,13,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(89,0,null,null,2,"h3",[["class","mdc-typography--headline6"],["mdcHeadline6",""]],null,null,null,null,null)),e.xb(90,16384,null,0,h.i,[],null,null),(l()(),e.Xb(-1,null,["MdcImageListLabel"])),(l()(),e.Xb(-1,null,[" Optional. Indicates the text label in each item, if the Image List contains text labels. "])),(l()(),e.yb(93,0,null,null,5,"p",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,[" Selector: "])),(l()(),e.yb(95,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdc-image-list-label"])),(l()(),e.yb(97,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListLabel"])),(l()(),e.Xb(-1,null,[" Exported as: "])),(l()(),e.yb(100,0,null,null,1,"span",[["class","markdown-code"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["mdcImageListLabel"]))],null,null)}var D=e.ub("ng-component",d,(function(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,1,"ng-component",[],null,null,null,O,R)),e.xb(1,49152,null,0,d,[],null,null)],null,null)}),{},{},[]),P=e.wb({encapsulation:2,styles:[],data:{}});function T(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,44,"div",[["class","docs-api"]],null,null,null,null,null)),(l()(),e.yb(1,0,null,null,2,"h4",[["class","mdc-typography--subtitle2"],["mdcSubtitle2",""]],null,null,null,null,null)),e.xb(2,16384,null,0,h.l,[],null,null),(l()(),e.Xb(-1,null,["Sass Mixins"])),(l()(),e.yb(4,0,null,null,40,"table",[],null,null,null,null,null)),(l()(),e.yb(5,0,null,null,5,"thead",[],null,null,null,null,null)),(l()(),e.yb(6,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),e.yb(7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Mixin"])),(l()(),e.yb(9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Description"])),(l()(),e.yb(11,0,null,null,33,"tbody",[],null,null,null,null,null)),(l()(),e.yb(12,0,null,null,5,"tr",[],null,null,null,null,null)),(l()(),e.yb(13,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.yb(14,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["aspect($width-height-ratio)"])),(l()(),e.yb(16,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Styles the aspect container elements within an Image List to conform to the given ratio, where 1 is 1:1, greater than 1 is wider, and less than 1 is taller."])),(l()(),e.yb(18,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.yb(19,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.yb(20,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["shape-radius($radius, $rtl-reflexive)"])),(l()(),e.yb(22,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Sets the rounded shape to image list item with given radius size. Set "])),(l()(),e.yb(24,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["$rtl-reflexive"])),(l()(),e.Xb(-1,null,[" to true to flip radius values in RTL context, defaults to false."])),(l()(),e.yb(27,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.yb(28,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.yb(29,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["standard-columns($column-count, $gutter-size)"])),(l()(),e.yb(31,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Styles a Standard Image List to display the given number of columns. "])),(l()(),e.yb(33,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["$gutter-size"])),(l()(),e.Xb(-1,null,[" is optional and overrides the default amount of space between items."])),(l()(),e.yb(36,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.yb(37,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.yb(38,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["masonry-columns($column-count, $gutter-size)"])),(l()(),e.yb(40,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Styles a Masonry Image List to display the given number of columns. "])),(l()(),e.yb(42,0,null,null,1,"code",[],null,null,null,null,null)),(l()(),e.Xb(-1,null,["$gutter-size"])),(l()(),e.Xb(-1,null,[" is optional and overrides the default amount of space between items."]))],null,null)}var F=e.ub("ng-component",p,(function(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,1,"ng-component",[],null,null,null,T,P)),e.xb(1,49152,null,0,p,[],null,null)],null,null)}),{},{},[]),A=e.wb({encapsulation:2,styles:[],data:{}});function B(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,10,"mdc-image-list-item",[["class","mdc-image-list__item"]],null,null,null,null,null)),e.xb(1,16384,null,0,y.d,[e.l],null,null),(l()(),e.yb(2,0,null,null,3,"mdc-image-list-image-aspect",[],null,null,null,f.c,f.b)),e.xb(3,49152,null,0,y.c,[e.l],null,null),(l()(),e.yb(4,0,null,0,1,"img",[["class","mdc-image-list__image"],["mdcImageListImage",""]],[[8,"src",4]],null,null,null,null)),e.xb(5,16384,null,0,y.b,[e.l],null,null),(l()(),e.yb(6,0,null,null,4,"mdc-image-list-supporting",[["class","mdc-image-list__supporting"]],null,null,null,null,null)),e.xb(7,16384,null,0,y.f,[e.l],null,null),(l()(),e.yb(8,0,null,null,2,"span",[["class","mdc-image-list__label"],["mdcImageListLabel",""]],null,null,null,null,null)),e.xb(9,16384,null,0,y.e,[e.l],null,null),(l()(),e.Xb(-1,null,["Text label"]))],null,(function(l,n){l(n,4,0,e.Fb(1,"https://material-components-web.appspot.com/images/photos/3x2/",n.context.$implicit+1,".jpg"))}))}function z(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,8,"mdc-image-list-item",[["class","mdc-image-list__item"]],null,null,null,null,null)),e.xb(1,16384,null,0,y.d,[e.l],null,null),(l()(),e.yb(2,0,null,null,1,"img",[["class","mdc-image-list__image"],["mdcImageListImage",""]],[[8,"src",4]],null,null,null,null)),e.xb(3,16384,null,0,y.b,[e.l],null,null),(l()(),e.yb(4,0,null,null,4,"mdc-image-list-supporting",[["class","mdc-image-list__supporting"]],null,null,null,null,null)),e.xb(5,16384,null,0,y.f,[e.l],null,null),(l()(),e.yb(6,0,null,null,2,"span",[["class","mdc-image-list__label"],["mdcImageListLabel",""]],null,null,null,null,null)),e.xb(7,16384,null,0,y.e,[e.l],null,null),(l()(),e.Xb(-1,null,["Text label"]))],null,(function(l,n){l(n,2,0,e.Fb(1,"",n.context.$implicit.image,""))}))}function E(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,18,"div",[["class","demo-content"]],null,null,null,null,null)),(l()(),e.yb(1,0,null,null,1,"h3",[["class","demo-content__headline"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Standard Image List"])),(l()(),e.Xb(-1,null,[" Images in a Standard Image list are constrained to 1:1 aspect ratio by default this can be overridden using the mdc-image-list-aspect mixin documented below. "])),(l()(),e.yb(4,0,null,null,2,"pre",[],null,null,null,null,null)),(l()(),e.yb(5,0,null,null,1,"code",[["highlight","@use '@material/image-list';\n\n.my-image-list {\n  @include image-list.standard-columns(5);\n}\n\n@media (max-width: 599px) {\n  .my-image-list {\n    @include image-list.standard-columns(3);\n  }\n}"]],[[2,"hljs",null]],null,null,null,null)),e.xb(6,540672,null,0,x.b,[e.l,x.c,L.b,[2,x.a]],{code:[0,"code"]},null),(l()(),e.yb(7,0,null,null,5,"div",[["class","demo-layout__row"]],null,null,null,null,null)),(l()(),e.yb(8,0,null,null,4,"button",[["class","mdc-button"],["mdc-button",""]],[[8,"tabIndex",0],[2,"mdc-button--raised",null],[2,"mdc-button--unelevated",null],[2,"mdc-button--outlined",null],[2,"mdc-button--touch",null]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e.Nb(l,10).onClick(u)&&a),"click"===n&&(a=0!=(e.Nb(l,14).textProtection=!e.Nb(l,14).textProtection)&&a),a}),v.b,v.a)),e.Sb(131584,null,k.a,k.a,[e.l,[2,w.MDCRippleFoundation]]),e.xb(10,245760,null,1,I.a,[e.l,k.a],null,null),e.Tb(335544320,1,{_icon:0}),(l()(),e.Xb(12,0,["Text Protection: ",""])),(l()(),e.yb(13,0,null,null,3,"mdc-image-list",[["class","standard-image-list image-list--rounded-corners mdc-image-list"]],[[2,"mdc-image-list--masonry",null],[2,"mdc-image-list--with-text-protection",null]],null,null,f.d,f.a)),e.xb(14,49152,[["demolist",4]],0,y.a,[e.l],null,null),(l()(),e.hb(16777216,null,0,1,null,B)),e.xb(16,278528,null,0,_.j,[e.P,e.M,e.s],{ngForOf:[0,"ngForOf"]},null),(l()(),e.yb(17,0,null,null,1,"example-viewer",[],null,null,null,X.b,X.a)),e.xb(18,114688,null,0,S.a,[e.h,N.a],{example:[0,"example"]},null),(l()(),e.yb(19,0,null,null,14,"div",[["class","demo-content"]],null,null,null,null,null)),(l()(),e.yb(20,0,null,null,1,"h3",[["class","demo-content__headline"]],null,null,null,null,null)),(l()(),e.Xb(-1,null,["Masonry Image List"])),(l()(),e.yb(22,0,null,null,5,"div",[["class","demo-layout__row"]],null,null,null,null,null)),(l()(),e.yb(23,0,null,null,4,"button",[["class","mdc-button"],["mdc-button",""]],[[8,"tabIndex",0],[2,"mdc-button--raised",null],[2,"mdc-button--unelevated",null],[2,"mdc-button--outlined",null],[2,"mdc-button--touch",null]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e.Nb(l,25).onClick(u)&&a),"click"===n&&(a=0!=(e.Nb(l,29).textProtection=!e.Nb(l,29).textProtection)&&a),a}),v.b,v.a)),e.Sb(131584,null,k.a,k.a,[e.l,[2,w.MDCRippleFoundation]]),e.xb(25,245760,null,1,I.a,[e.l,k.a],null,null),e.Tb(335544320,2,{_icon:0}),(l()(),e.Xb(27,0,["Text Protection: ",""])),(l()(),e.yb(28,0,null,null,3,"mdc-image-list",[["class","masonry-image-list mdc-image-list"],["masonry",""]],[[2,"mdc-image-list--masonry",null],[2,"mdc-image-list--with-text-protection",null]],null,null,f.d,f.a)),e.xb(29,49152,[["demomasonry",4]],0,y.a,[e.l],{masonry:[0,"masonry"]},null),(l()(),e.hb(16777216,null,0,1,null,z)),e.xb(31,278528,null,0,_.j,[e.P,e.M,e.s],{ngForOf:[0,"ngForOf"]},null),(l()(),e.yb(32,0,null,null,1,"example-viewer",[],null,null,null,X.b,X.a)),e.xb(33,114688,null,0,S.a,[e.h,N.a],{example:[0,"example"]},null)],(function(l,n){var u=n.component;l(n,6,0,"@use '@material/image-list';\n\n.my-image-list {\n  @include image-list.standard-columns(5);\n}\n\n@media (max-width: 599px) {\n  .my-image-list {\n    @include image-list.standard-columns(3);\n  }\n}"),l(n,10,0),l(n,16,0,u.images),l(n,18,0,u.exampleStandard),l(n,25,0),l(n,29,0,""),l(n,31,0,u.masonryImages),l(n,33,0,u.exampleMasonry)}),(function(l,n){l(n,5,0,!0),l(n,8,0,e.Nb(n,10).disabled?-1:0,e.Nb(n,10).raised,e.Nb(n,10).unelevated,e.Nb(n,10).outlined,e.Nb(n,10).touch),l(n,12,0,e.Nb(n,14).textProtection?"On":"Off"),l(n,13,0,e.Nb(n,14).masonry,e.Nb(n,14).textProtection),l(n,23,0,e.Nb(n,25).disabled?-1:0,e.Nb(n,25).raised,e.Nb(n,25).unelevated,e.Nb(n,25).outlined,e.Nb(n,25).touch),l(n,27,0,e.Nb(n,29).textProtection?"On":"Off"),l(n,28,0,e.Nb(n,29).masonry,e.Nb(n,29).textProtection)}))}var Y=e.ub("ng-component",g,(function(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,1,"ng-component",[],null,null,null,E,A)),e.xb(1,49152,null,0,g,[],null,null)],null,null)}),{},{},[]),$=u("s7LF"),J=u("D9PZ"),q=u("5WpM"),K=u("d9jQ"),G=u("IheW"),U=u("oGt3"),W=u("tgki"),H=u("eMs3"),Z=u("6u/c"),V=u("OpHd"),Q=u("ADci"),ll=u("pFQC"),nl=u("rhUx"),ul=u("ApBt"),el=u("mOWz"),al=u("oTTF"),tl=u("geka"),il=u("u5GS"),sl=u("kpju"),ol=u("6vCO"),cl=u("2XL4"),bl=u("uDyN"),ml=u("GZ7/"),rl=u("c2eK"),dl=u("D8aA"),pl=u("FT8k"),gl=u("+/+1"),hl=u("B7Vi"),yl=u("szxw"),fl=u("1qdr"),xl=u("7G34"),Ll=u("EIAk"),vl=u("Srdw"),kl=u("jxgt"),wl=u("wfZB"),Il=u("FHdM"),_l=u("Ji/y"),Xl=u("gGLD"),Sl=u("8RQ7"),Nl=u("gYYb"),Cl=u("C5iU"),Ml=u("vvyD"),jl=u("iInd"),Rl=u("Lkda"),Ol=u("qMxp"),Dl=u("d2mR"),Pl=function l(){_classCallCheck(this,l)};u.d(n,"ImageListModuleNgFactory",(function(){return Tl}));var Tl=e.vb(a,[],(function(l){return e.Kb([e.Lb(512,e.j,e.Z,[[8,[t.a,i.a,s.a,o.a,c.a,j,D,F,Y]],[3,e.j],e.x]),e.Lb(4608,_.m,_.l,[e.u]),e.Lb(4608,$.u,$.u,[]),e.Lb(4608,J.a,J.a,[J.f,J.b,e.j,J.e,J.c,e.r,e.z,_.d,q.b,[2,_.h]]),e.Lb(5120,J.g,J.h,[J.a]),e.Lb(135680,K.c,K.c,[J.a,e.r,[2,K.b],[3,K.c]]),e.Lb(4608,$.b,$.b,[]),e.Lb(4608,G.i,G.o,[_.d,e.B,G.m]),e.Lb(4608,G.p,G.p,[G.i,G.n]),e.Lb(5120,G.a,(function(l){return[l]}),[G.p]),e.Lb(4608,G.l,G.l,[]),e.Lb(6144,G.j,null,[G.l]),e.Lb(4608,G.h,G.h,[G.j]),e.Lb(6144,G.b,null,[G.h]),e.Lb(4608,G.f,G.k,[G.b,e.r]),e.Lb(4608,G.c,G.c,[G.f]),e.Lb(1073742336,_.c,_.c,[]),e.Lb(1073742336,$.t,$.t,[]),e.Lb(1073742336,$.h,$.h,[]),e.Lb(1073742336,U.a,U.a,[]),e.Lb(1073742336,W.a,W.a,[]),e.Lb(1073742336,H.a,H.a,[]),e.Lb(1073742336,Z.a,Z.a,[]),e.Lb(1073742336,V.a,V.a,[]),e.Lb(1073742336,Q.a,Q.a,[]),e.Lb(1073742336,ll.a,ll.a,[]),e.Lb(1073742336,q.a,q.a,[]),e.Lb(1073742336,nl.f,nl.f,[]),e.Lb(1073742336,ul.b,ul.b,[]),e.Lb(1073742336,el.b,el.b,[]),e.Lb(1073742336,J.d,J.d,[]),e.Lb(1073742336,al.a,al.a,[]),e.Lb(1073742336,tl.a,tl.a,[]),e.Lb(1073742336,il.a,il.a,[]),e.Lb(1073742336,sl.a,sl.a,[]),e.Lb(1073742336,ol.a,ol.a,[]),e.Lb(1073742336,cl.a,cl.a,[]),e.Lb(1073742336,bl.a,bl.a,[]),e.Lb(1073742336,ml.a,ml.a,[]),e.Lb(1073742336,rl.a,rl.a,[]),e.Lb(1073742336,dl.a,dl.a,[]),e.Lb(1073742336,pl.a,pl.a,[]),e.Lb(1073742336,gl.a,gl.a,[]),e.Lb(1073742336,hl.a,hl.a,[]),e.Lb(1073742336,yl.a,yl.a,[]),e.Lb(1073742336,fl.a,fl.a,[]),e.Lb(1073742336,xl.a,xl.a,[]),e.Lb(1073742336,Ll.a,Ll.a,[]),e.Lb(1073742336,vl.a,vl.a,[]),e.Lb(1073742336,kl.a,kl.a,[]),e.Lb(1073742336,wl.a,wl.a,[]),e.Lb(1073742336,Il.a,Il.a,[]),e.Lb(1073742336,_l.a,_l.a,[]),e.Lb(1073742336,Xl.a,Xl.a,[]),e.Lb(1073742336,Sl.a,Sl.a,[]),e.Lb(1073742336,Nl.a,Nl.a,[]),e.Lb(1073742336,Cl.a,Cl.a,[]),e.Lb(1073742336,Ml.a,Ml.a,[]),e.Lb(1073742336,$.q,$.q,[]),e.Lb(1073742336,jl.p,jl.p,[[2,jl.u],[2,jl.l]]),e.Lb(1073742336,Rl.b,Rl.b,[]),e.Lb(1073742336,x.d,x.d,[]),e.Lb(1073742336,G.e,G.e,[]),e.Lb(1073742336,G.d,G.d,[]),e.Lb(1073742336,Ol.a,Ol.a,[]),e.Lb(1073742336,Dl.a,Dl.a,[]),e.Lb(1073742336,Pl,Pl,[]),e.Lb(1073742336,a,a,[]),e.Lb(256,G.m,"XSRF-TOKEN",[]),e.Lb(256,G.n,"X-XSRF-TOKEN",[]),e.Lb(1024,jl.j,(function(){return[[{path:"",component:r,children:[{path:"",redirectTo:"api"},{path:"api",component:d},{path:"sass",component:p},{path:"examples",component:g}]}]]}),[])])}))},"K4w+":function(l,n,u){"use strict";u.d(n,"a",(function(){return o})),u.d(n,"b",(function(){return b}));var e=u("8Y7J"),a=u("9qfl"),t=u("o085"),i=u("U/DG"),s=u("SVse"),o=(u("s7LF"),u("o/N6"),u("+O8G"),u("0fpz"),e.wb({encapsulation:2,styles:[],data:{}}));function c(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,2,"mdc-icon",[["class","ngx-mdc-icon"]],[[1,"role",0],[1,"tabindex",0],[2,"ngx-mdc-icon--clickable",null],[2,"ngx-mdc-icon--inline",null]],null,null,a.b,a.a)),e.xb(1,9158656,null,0,t.b,[e.l,i.a,[8,null],t.a],null,null),(l()(),e.Xb(2,0,["",""]))],(function(l,n){l(n,1,0)}),(function(l,n){var u=n.component;l(n,0,0,e.Nb(n,1).role,e.Nb(n,1).tabIndex,e.Nb(n,1).clickable,e.Nb(n,1).inline),l(n,2,0,u.icon)}))}function b(l){return e.ac(2,[(l()(),e.hb(16777216,null,null,1,null,c)),e.xb(1,16384,null,0,s.k,[e.P,e.M],{ngIf:[0,"ngIf"]},null),e.Mb(null,0)],(function(l,n){l(n,1,0,n.component.icon)}),null)}},XbMX:function(l,n,u){"use strict";var e=u("8Y7J"),a=u("//9D"),t=u("+O8G"),i=u("0fpz"),s=u("9UYg"),o=u("7pLE"),c=u("+lgO"),b=u("jvbJ"),m=u("vaAN"),r=u("ApBt"),d=u("7F7i"),p=u("NmUe"),g=u("SVse"),h=u("K4w+"),y=u("s7LF"),f=u("o/N6"),x=u("9qfl"),L=u("o085"),v=u("U/DG"),k=u("dJsq"),w=u("cUpR"),I=u("qMxp"),_=u("hSJX"),X=u("RkLD");u("dkiD"),u("aXvW"),u.d(n,"a",(function(){return S})),u.d(n,"b",(function(){return R}));var S=e.wb({encapsulation:2,styles:[[".example-divider{margin-top:5px}.example-opener{display:-webkit-box;display:-ms-flexbox;display:flex;margin-top:20px;background-color:#344955!important}.example-container{position:relative}.example-copy-button{position:absolute;right:0;top:0;color:#fff}"]],data:{}});function N(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,3,"button",[["class","example-opener mdc-button"],["mdc-button",""],["raised",""]],[[8,"tabIndex",0],[2,"mdc-button--raised",null],[2,"mdc-button--unelevated",null],[2,"mdc-button--outlined",null],[2,"mdc-button--touch",null]],[[null,"click"]],(function(l,n,u){var a=!0,t=l.component;return"click"===n&&(a=!1!==e.Nb(l,2).onClick(u)&&a),"click"===n&&(a=0!=(t.open=!t.open)&&a),a}),a.b,a.a)),e.Sb(131584,null,t.a,t.a,[e.l,[2,i.MDCRippleFoundation]]),e.xb(2,245760,null,1,s.a,[e.l,t.a],{raised:[0,"raised"],label:[1,"label"]},null),e.Tb(335544320,1,{_icon:0})],(function(l,n){l(n,2,0,"",n.component.label)}),(function(l,n){l(n,0,0,e.Nb(n,2).disabled?-1:0,e.Nb(n,2).raised,e.Nb(n,2).unelevated,e.Nb(n,2).outlined,e.Nb(n,2).touch)}))}function C(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,2,"mdc-tab",[["class","mdc-tab"],["role","tab"]],[[8,"id",0],[2,"mdc-tab--stacked",null],[2,"mdc-tab--min-width",null],[2,"ngx-mdc-tab--disabled",null]],null,null,o.b,o.a)),e.Sb(131584,null,t.a,t.a,[e.l,[2,i.MDCRippleFoundation]]),e.xb(2,4440064,[[3,4]],0,c.b,[e.z,e.h,t.a,e.l,[2,c.a]],{label:[0,"label"]},null)],(function(l,n){l(n,2,0,n.context.$implicit.label)}),(function(l,n){l(n,0,0,e.Nb(n,2).id,e.Nb(n,2).stacked,e.Nb(n,2).fixed,e.Nb(n,2).disabled)}))}function M(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,8,"mdc-tab-bar",[["class","mdc-tab-bar"],["fixed",""],["role","tablist"]],null,[[null,"activated"],[null,"keydown"]],(function(l,n,u){var a=!0,t=l.component;return"keydown"===n&&(a=!1!==e.Nb(l,2)._onKeydown(u)&&a),"activated"===n&&(a=!1!==t.onActivatedTab(u)&&a),a}),b.b,b.a)),e.Sb(6144,null,c.a,null,[m.a]),e.xb(2,1228800,null,2,m.a,[r.a,e.h,e.l],{fixed:[0,"fixed"],focusOnActivate:[1,"focusOnActivate"]},{activated:"activated"}),e.Tb(335544320,2,{tabScroller:0}),e.Tb(603979776,3,{tabs:1}),(l()(),e.yb(5,0,null,0,3,"mdc-tab-scroller",[["class","mdc-tab-scroller"]],null,null,null,d.b,d.a)),e.xb(6,4374528,[[2,4]],0,p.a,[e.z,r.a,e.l],null,null),(l()(),e.hb(16777216,null,0,1,null,C)),e.xb(8,278528,null,0,g.j,[e.P,e.M,e.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,2,0,"",!1),l(n,8,0,u.tabs)}),null)}function j(l){return e.ac(0,[(l()(),e.yb(0,0,null,null,13,"div",[["class","example-container"]],null,null,null,null,null)),(l()(),e.yb(1,0,null,null,7,"button",[["attr.aria-pressed","false"],["class","example-copy-button mdc-icon-button"],["mdcIconButton",""]],[[8,"id",0],[2,"mdc-icon-button--on",null]],[[null,"click"]],(function(l,n,u){var a=!0,t=l.component;return"click"===n&&(a=!1!==e.Nb(l,4).handleClick()&&a),"click"===n&&(a=!1!==t.copyCode()&&a),a}),h.b,h.a)),e.Sb(5120,null,y.k,(function(l){return[l]}),[f.a]),e.Sb(131584,null,t.a,t.a,[e.l,[2,i.MDCRippleFoundation]]),e.xb(4,1228800,null,1,f.a,[e.h,e.l,t.a],null,null),e.Tb(603979776,4,{icons:1}),(l()(),e.yb(6,0,null,0,2,"mdc-icon",[["class","ngx-mdc-icon"]],[[1,"role",0],[1,"tabindex",0],[2,"ngx-mdc-icon--clickable",null],[2,"ngx-mdc-icon--inline",null]],null,null,x.b,x.a)),e.xb(7,9158656,[[4,4]],0,L.b,[e.l,v.a,[8,null],L.a],null,null),(l()(),e.Xb(-1,0,["file_copy"])),(l()(),e.yb(9,0,null,null,4,"pre",[],null,null,null,null,null)),(l()(),e.yb(10,0,null,null,3,"code",[],[[2,"hljs",null]],null,null,null,null)),e.xb(11,540672,null,0,k.b,[e.l,k.c,w.b,[2,k.a]],{code:[0,"code"]},null),e.Rb(12,1),e.Pb(131072,g.b,[e.h])],(function(l,n){var u=n.component;l(n,7,0);var a=u.config.url?e.Yb(n,11,0,e.Nb(n,13).transform(e.Yb(n,11,0,l(n,12,0,e.Nb(n.parent,0),null==u.config?null:u.config.code)))):null==u.config?null:u.config.code;l(n,11,0,a)}),(function(l,n){l(n,1,0,e.Nb(n,4).id,e.Nb(n,4).on),l(n,6,0,e.Nb(n,7).role,e.Nb(n,7).tabIndex,e.Nb(n,7).clickable,e.Nb(n,7).inline),l(n,10,0,!0)}))}function R(l){return e.ac(2,[e.Pb(0,I.c,[I.b]),(l()(),e.yb(1,0,null,null,1,"mdc-list-divider",[["class","example-divider mdc-list-divider"],["role","separator"]],[[2,"mdc-list-divider--inset",null],[2,"mdc-list-divider--padded",null]],null,null,_.b,_.a)),e.xb(2,49152,null,0,X.a,[e.l],null,null),(l()(),e.hb(16777216,null,null,1,null,N)),e.xb(4,16384,null,0,g.k,[e.P,e.M],{ngIf:[0,"ngIf"]},null),(l()(),e.hb(16777216,null,null,1,null,M)),e.xb(6,16384,null,0,g.k,[e.P,e.M],{ngIf:[0,"ngIf"]},null),(l()(),e.hb(16777216,null,null,1,null,j)),e.xb(8,16384,null,0,g.k,[e.P,e.M],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,4,0,!u.open),l(n,6,0,u.open),l(n,8,0,u.open)}),(function(l,n){l(n,1,0,e.Nb(n,2).inset,e.Nb(n,2).padded)}))}},aXvW:function(l,n,u){"use strict";u.d(n,"a",(function(){return r}));var e=u("8Y7J"),a=u("rhUx"),t=u("Dpui"),i=u("I7Yq"),s=u("8mAZ"),o=u("htsC"),c=u("D9PZ"),b=u("Srdw"),m=new e.q("mdc-snackbar-default-options",{providedIn:"root",factory:function(){return new s.b}}),r=function(){var l=function(){function l(n,u,e,a){_classCallCheck(this,l),this._overlay=n,this._injector=u,this._parentSnackBar=e,this._defaultConfig=a,this._snackBarRefAtThisLevel=null}return _createClass(l,[{key:"openFromComponent",value:function(l,n){return this._attach(l,n)}},{key:"open",value:function(l){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",u=arguments.length>2?arguments[2]:void 0,e=Object.assign(Object.assign({},this._defaultConfig),u);return e.data={message:l,action:n},this.openFromComponent(i.a,e)}},{key:"dismiss",value:function(){this._openedSnackbarRef&&(this._openedSnackbarRef.instance instanceof i.a&&this._openedSnackbarRef.instance.close(),this._openedSnackbarRef.dismiss())}},{key:"ngOnDestroy",value:function(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}},{key:"_attachSnackbarContainer",value:function(l,n){var u=new a.e(n&&n.viewContainerRef&&n.viewContainerRef.injector||this._injector,new WeakMap([[s.b,n]])),e=new a.c(o.a,n.viewContainerRef,u),t=l.attach(e);return t.instance.snackbarConfig=n,t.instance}},{key:"_attach",value:function(l,n){var u=Object.assign(Object.assign(Object.assign({},new s.b),this._defaultConfig),n),e=this._createOverlay(),o=this._attachSnackbarContainer(e,u),c=new t.a(o,e),b=this._createInjector(u,c),m=new a.c(l,void 0,b),r=o.attachComponentPortal(m);return c.instance=r.instance,this._loadListeners(c),this._openedSnackbarRef=c,c.instance instanceof i.a&&c.instance.open(),this._openedSnackbarRef}},{key:"_loadListeners",value:function(l){var n=this;l.afterDismiss().subscribe((function(){n._openedSnackbarRef===l&&(n._openedSnackbarRef=null)})),this._openedSnackbarRef&&this._openedSnackbarRef.dismiss()}},{key:"_createOverlay",value:function(){return this._overlay.create()}},{key:"_createInjector",value:function(l,n){return new a.e(l&&l.viewContainerRef&&l.viewContainerRef.injector||this._injector,new WeakMap([[t.a,n],[s.a,l.data]]))}},{key:"_openedSnackbarRef",get:function(){var l=this._parentSnackBar;return l?l._openedSnackbarRef:this._snackBarRefAtThisLevel},set:function(l){this._parentSnackBar?this._parentSnackBar._openedSnackbarRef=l:this._snackBarRefAtThisLevel=l}}]),l}();return l.\u0275prov=e.bc({factory:function(){return new l(e.cc(c.a),e.cc(e.o),e.cc(l,12),e.cc(m))},token:l,providedIn:b.a}),l}()}}]);