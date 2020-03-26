function _defineProperties(e,t){for(var i=0;i<t.length;i++){var c=t[i];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"ZOW/":function(e,t,i){"use strict";i.r(t),i.d(t,"DrawerModule",(function(){return P}));var c=i("d2mR"),r=i("tyNb"),a=i("leug"),n=i("fXoL"),d=i("5l+6"),o=i("OtPg"),b=i("9UYg"),s=i("LuDt"),l=i("G4+0"),m=i("KHnp"),u=i("M9Bb"),w=i("ofXK"),p=i("RkLD"),R=i("roy6"),Q=i("o085"),h=i("dkiD");function v(e,t){if(1&e&&(n.Rb(0,"mdc-icon",8),n.wc(1),n.Qb()),2&e){var i=n.dc().$implicit;n.Bb(1),n.xc(i.icon)}}function f(e,t){if(1&e&&(n.Rb(0,"a",26),n.uc(1,v,2,1,"mdc-icon",27),n.wc(2),n.Qb()),2&e){var i=t.$implicit;n.ic("activated",i.activated),n.Bb(1),n.ic("ngIf",i.icon),n.Bb(1),n.yc("",i.label," ")}}function g(e,t){if(1&e&&(n.Rb(0,"mdc-icon",8),n.wc(1),n.Qb()),2&e){var i=n.dc().$implicit;n.Bb(1),n.xc(i.icon)}}function x(e,t){if(1&e&&(n.Rb(0,"mdc-list-item",28),n.uc(1,g,2,1,"mdc-icon",27),n.wc(2),n.Qb()),2&e){var i=t.$implicit;n.ic("activated",i.activated),n.Bb(1),n.ic("ngIf",i.icon),n.Bb(1),n.yc("",i.label," ")}}function k(e,t){if(1&e&&(n.Rb(0,"mdc-icon",8),n.wc(1),n.Qb()),2&e){var i=n.dc().$implicit;n.Bb(1),n.xc(i.icon)}}function D(e,t){if(1&e&&(n.Rb(0,"mdc-list-item",28),n.uc(1,k,2,1,"mdc-icon",27),n.wc(2),n.Qb()),2&e){var i=t.$implicit;n.ic("activated",i.activated),n.Bb(1),n.ic("ngIf",i.icon),n.Bb(1),n.yc("",i.label," ")}}function S(e,t){if(1&e&&(n.Rb(0,"mdc-icon",8),n.wc(1),n.Qb()),2&e){var i=n.dc().$implicit;n.Bb(1),n.xc(i.icon)}}function C(e,t){if(1&e&&(n.Rb(0,"mdc-list-item",28),n.uc(1,S,2,1,"mdc-icon",27),n.wc(2),n.Qb()),2&e){var i=t.$implicit;n.ic("activated",i.activated),n.Bb(1),n.ic("ngIf",i.icon),n.Bb(1),n.yc("",i.label," ")}}function y(e,t){if(1&e&&(n.Rb(0,"mdc-icon",8),n.wc(1),n.Qb()),2&e){var i=n.dc().$implicit;n.Bb(1),n.xc(i.icon)}}function L(e,t){if(1&e&&(n.Rb(0,"a",26),n.uc(1,y,2,1,"mdc-icon",27),n.wc(2),n.Qb()),2&e){var i=t.$implicit;n.ic("activated",i.activated),n.Bb(1),n.ic("ngIf",i.icon),n.Bb(1),n.yc("",i.label," ")}}var M,q,I,T,_,$,F=((q=function e(){_classCallCheck(this,e)}).\u0275fac=function(e){return new(e||q)},q.\u0275cmp=n.Fb({type:q,selectors:[["ng-component"]],decls:183,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""],[1,"demo-content__headline"],[1,"docs-markdown-code"],["highlight","<mdc-list-item cdkFocusInitial>\n  <mdc-icon mdcListItemGraphic>star</mdc-icon>List item\n</mdc-list-item>"],["mdc-button","","href","https://material.angular.io/cdk/a11y/overview#example","target","_blank","rel","noopener"]],template:function(e,t){1&e&&(n.Rb(0,"div",0),n.Rb(1,"h3",1),n.wc(2,"MdcDrawer"),n.Qb(),n.Rb(3,"p"),n.wc(4," Selector: "),n.Rb(5,"span",2),n.wc(6,"mdc-drawer"),n.Qb(),n.Qb(),n.wc(7," Exported as: "),n.Rb(8,"span",2),n.wc(9,"mdcDrawer"),n.Qb(),n.Rb(10,"h4",3),n.wc(11,"Properties"),n.Qb(),n.Rb(12,"table"),n.Rb(13,"thead"),n.Rb(14,"tr"),n.Rb(15,"th"),n.wc(16,"Name"),n.Qb(),n.Rb(17,"th"),n.wc(18,"Description"),n.Qb(),n.Qb(),n.Qb(),n.Rb(19,"tbody"),n.Rb(20,"tr"),n.Rb(21,"td"),n.wc(22,"drawer: string"),n.Qb(),n.Rb(23,"td"),n.wc(24,"Set the drawer implementation. "),n.Rb(25,"p"),n.wc(26,"Valid values: dismissible | modal | empty"),n.Qb(),n.Qb(),n.Qb(),n.Rb(27,"tr"),n.Rb(28,"td"),n.wc(29,"open: boolean"),n.Qb(),n.Rb(30,"td"),n.wc(31,"Opens or closes the drawer."),n.Qb(),n.Qb(),n.Rb(32,"tr"),n.Rb(33,"td"),n.wc(34,"fixedAdjustElement: any"),n.Qb(),n.Rb(35,"td"),n.wc(36,"Optional. Reference to a drawer's attached body element."),n.Qb(),n.Qb(),n.Rb(37,"tr"),n.Rb(38,"td"),n.wc(39,"dir: string"),n.Qb(),n.Rb(40,"td"),n.wc(41,"Optional. If value is 'rtl', drawer opens from the right side of the screen."),n.Qb(),n.Qb(),n.Rb(42,"tr"),n.Rb(43,"td"),n.wc(44,"autoFocus: boolean"),n.Qb(),n.Rb(45,"td"),n.wc(46,"Whether the drawer should focus the first focusable element on open. (Default: true)"),n.Qb(),n.Qb(),n.Rb(47,"tr"),n.Rb(48,"td"),n.wc(49,"restoreFocus: boolean"),n.Qb(),n.Rb(50,"td"),n.wc(51,"Whether the drawer should restore focus to the previously-focused element, after it's closed. (Default: true)"),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Rb(52,"h4",3),n.wc(53,"Events"),n.Qb(),n.Rb(54,"table"),n.Rb(55,"tbody"),n.Rb(56,"tr"),n.Rb(57,"td"),n.wc(58,"opened()"),n.Qb(),n.Rb(59,"td"),n.wc(60,"Event dispatched on drawer open."),n.Qb(),n.Qb(),n.Rb(61,"tr"),n.Rb(62,"td"),n.wc(63,"closed()"),n.Qb(),n.Rb(64,"td"),n.wc(65,"Event dispatched on drawer close."),n.Qb(),n.Qb(),n.Rb(66,"tr"),n.Rb(67,"td"),n.wc(68,"openedChange(opened: boolean)"),n.Qb(),n.Rb(69,"td"),n.wc(70,"Event dispatched on drawer open state changes."),n.Qb(),n.Qb(),n.Rb(71,"tr"),n.Rb(72,"td"),n.wc(73,"drawerChange()"),n.Qb(),n.Rb(74,"td"),n.wc(75,"Event dispatched when the drawer variant changes."),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Rb(76,"div"),n.Rb(77,"h3",4),n.wc(78,"Focus Management"),n.Qb(),n.Rb(79,"p"),n.wc(80,"By default, the first element within the drawer will receive focus upon open. This can be configured by setting the "),n.Rb(81,"code",5),n.wc(82,"cdkFocusInitial"),n.Qb(),n.wc(83," attribute on another focusable element or setting "),n.Rb(84,"code",5),n.wc(85,"autoFocus"),n.Qb(),n.wc(86," to false."),n.Qb(),n.Rb(87,"pre"),n.Mb(88,"code",6),n.Qb(),n.Rb(89,"a",7),n.wc(90,"Focus Trap - Read more"),n.Qb(),n.Qb(),n.Rb(91,"div",0),n.Rb(92,"h3",1),n.wc(93,"MdcDrawerHeader"),n.Qb(),n.wc(94," Optional. Non-scrollable element that exists at the top of the drawer. "),n.Rb(95,"p"),n.wc(96," Selector: "),n.Rb(97,"span",2),n.wc(98,"mdc-drawer-header"),n.Qb(),n.Qb(),n.wc(99," Exported as: "),n.Rb(100,"span",2),n.wc(101,"mdcDrawerHeader"),n.Qb(),n.Rb(102,"h4",3),n.wc(103,"Properties"),n.Qb(),n.Rb(104,"table"),n.Rb(105,"thead"),n.Rb(106,"tr"),n.Rb(107,"th"),n.wc(108,"Name"),n.Qb(),n.Rb(109,"th"),n.wc(110,"Description"),n.Qb(),n.Qb(),n.Qb(),n.Rb(111,"tbody"),n.Rb(112,"tr"),n.Rb(113,"td"),n.wc(114,"title: string"),n.Qb(),n.Rb(115,"td"),n.wc(116,"Optional. Title text element of the drawer."),n.Qb(),n.Qb(),n.Rb(117,"tr"),n.Rb(118,"td"),n.wc(119,"subtitle: string"),n.Qb(),n.Rb(120,"td"),n.wc(121,"Optional. Subtitle text element of the drawer."),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Rb(122,"div",0),n.Rb(123,"h3",1),n.wc(124,"MdcDrawerTitle"),n.Qb(),n.wc(125," Optional. Title text element of the drawer. "),n.Rb(126,"p"),n.wc(127," Selector: "),n.Rb(128,"span",2),n.wc(129,"mdcDrawerTitle"),n.Qb(),n.Qb(),n.wc(130," Exported as: "),n.Rb(131,"span",2),n.wc(132,"mdcDrawerTitle"),n.Qb(),n.Qb(),n.Rb(133,"div",0),n.Rb(134,"h3",1),n.wc(135,"MdcDrawerSubtitle"),n.Qb(),n.wc(136," Optional. Subtitle text element of the drawer. "),n.Rb(137,"p"),n.wc(138," Selector: "),n.Rb(139,"span",2),n.wc(140,"mdcDrawerSubtitle"),n.Qb(),n.Qb(),n.wc(141," Exported as: "),n.Rb(142,"span",2),n.wc(143,"mdcDrawerSubtitle"),n.Qb(),n.Qb(),n.Rb(144,"div",0),n.Rb(145,"h3",1),n.wc(146,"MdcDrawerContent"),n.Qb(),n.wc(147," Scrollable content area of the drawer "),n.Rb(148,"p"),n.wc(149," Selector: "),n.Rb(150,"span",2),n.wc(151,"mdc-drawer-content"),n.Qb(),n.Rb(152,"span",2),n.wc(153,"mdcDrawerContent"),n.Qb(),n.Qb(),n.wc(154," Exported as: "),n.Rb(155,"span",2),n.wc(156,"mdcDrawerContent"),n.Qb(),n.Rb(157,"h4",3),n.wc(158,"Properties"),n.Qb(),n.Rb(159,"table"),n.Rb(160,"thead"),n.Rb(161,"tr"),n.Rb(162,"th"),n.wc(163,"Name"),n.Qb(),n.Rb(164,"th"),n.wc(165,"Description"),n.Qb(),n.Qb(),n.Qb(),n.Rb(166,"tbody"),n.Rb(167,"tr"),n.Rb(168,"td"),n.wc(169,"dir: string"),n.Qb(),n.Rb(170,"td"),n.wc(171,"Optional. If value is 'rtl', content is displayed right to left. "),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Rb(172,"div",0),n.Rb(173,"h3",1),n.wc(174,"MdcDrawerAppContent"),n.Qb(),n.wc(175," Mandatory for dismissible variant only. Sibling element that is resized when the drawer opens/closes. "),n.Rb(176,"p"),n.wc(177," Selector: "),n.Rb(178,"span",2),n.wc(179,"mdcDrawerAppContent"),n.Qb(),n.Qb(),n.wc(180," Exported as: "),n.Rb(181,"span",2),n.wc(182,"mdcDrawerAppContent"),n.Qb(),n.Qb())},directives:[d.i,d.l,o.b,b.a],encapsulation:2}),q),B=((M=function e(){_classCallCheck(this,e)}).\u0275fac=function(e){return new(e||M)},M.\u0275cmp=n.Fb({type:M,selectors:[["ng-component"]],decls:134,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(n.Rb(0,"div",0),n.Rb(1,"h4",1),n.wc(2,"Sass Mixins"),n.Qb(),n.Rb(3,"table"),n.Rb(4,"thead"),n.Rb(5,"tr"),n.Rb(6,"th"),n.wc(7,"Mixin"),n.Qb(),n.Rb(8,"th"),n.wc(9,"Description"),n.Qb(),n.Qb(),n.Qb(),n.Rb(10,"tbody"),n.Rb(11,"tr"),n.Rb(12,"td"),n.Rb(13,"code"),n.wc(14,"border-color($color)"),n.Qb(),n.Qb(),n.Rb(15,"td"),n.wc(16,"Sets border color of "),n.Rb(17,"code"),n.wc(18,"mdc-drawer"),n.Qb(),n.wc(19," surface."),n.Qb(),n.Qb(),n.Rb(20,"tr"),n.Rb(21,"td"),n.Rb(22,"code"),n.wc(23,"divider-color($color)"),n.Qb(),n.Qb(),n.Rb(24,"td"),n.wc(25,"Sets divider color found between list groups."),n.Qb(),n.Qb(),n.Rb(26,"tr"),n.Rb(27,"td"),n.Rb(28,"code"),n.wc(29,"fill-color-accessible($color)"),n.Qb(),n.Qb(),n.Rb(30,"td"),n.wc(31,"Sets the fill color to "),n.Rb(32,"code"),n.wc(33,"$color"),n.Qb(),n.wc(34,", and list item and icon ink colors to an accessible color relative to "),n.Rb(35,"code"),n.wc(36,"$color"),n.Qb(),n.wc(37,"."),n.Qb(),n.Qb(),n.Rb(38,"tr"),n.Rb(39,"td"),n.Rb(40,"code"),n.wc(41,"surface-fill-color($color)"),n.Qb(),n.Qb(),n.Rb(42,"td"),n.wc(43,"Sets the background color of "),n.Rb(44,"code"),n.wc(45,"mdc-drawer"),n.Qb(),n.wc(46,"."),n.Qb(),n.Qb(),n.Rb(47,"tr"),n.Rb(48,"td"),n.Rb(49,"code"),n.wc(50,"title-ink-color($color)"),n.Qb(),n.Qb(),n.Rb(51,"td"),n.wc(52,"Sets the ink color of "),n.Rb(53,"code"),n.wc(54,"mdc-drawer__title"),n.Qb(),n.wc(55,"."),n.Qb(),n.Qb(),n.Rb(56,"tr"),n.Rb(57,"td"),n.Rb(58,"code"),n.wc(59,"subtitle-ink-color"),n.Qb(),n.Qb(),n.Rb(60,"td"),n.wc(61,"Sets drawer subtitle and list subheader ink color."),n.Qb(),n.Qb(),n.Rb(62,"tr"),n.Rb(63,"td"),n.Rb(64,"code"),n.wc(65,"item-icon-ink-color($color)"),n.Qb(),n.Qb(),n.Rb(66,"td"),n.wc(67,"Sets drawer list item graphic icon ink color."),n.Qb(),n.Qb(),n.Rb(68,"tr"),n.Rb(69,"td"),n.Rb(70,"code"),n.wc(71,"item-text-ink-color($color)"),n.Qb(),n.Qb(),n.Rb(72,"td"),n.wc(73,"Sets drawer list item text ink color."),n.Qb(),n.Qb(),n.Rb(74,"tr"),n.Rb(75,"td"),n.Rb(76,"code"),n.wc(77,"item-activated-icon-ink-color($color)"),n.Qb(),n.Qb(),n.Rb(78,"td"),n.wc(79,"Sets activated drawer list item icon ink color."),n.Qb(),n.Qb(),n.Rb(80,"tr"),n.Rb(81,"td"),n.Rb(82,"code"),n.wc(83,"item-activated-text-ink-color($color)"),n.Qb(),n.Qb(),n.Rb(84,"td"),n.wc(85,"Sets activated drawer list item text ink color."),n.Qb(),n.Qb(),n.Rb(86,"tr"),n.Rb(87,"td"),n.Rb(88,"code"),n.wc(89,"shape-radius($radius)"),n.Qb(),n.Qb(),n.Rb(90,"td"),n.wc(91,"Sets the rounded shape to drawer with given radius size. "),n.Rb(92,"code"),n.wc(93,"$radius"),n.Qb(),n.wc(94," can be single radius or list of 2 radius values for trailing-top and trailing-bottom. Automatically flips the radius values in RTL context."),n.Qb(),n.Qb(),n.Rb(95,"tr"),n.Rb(96,"td"),n.Rb(97,"code"),n.wc(98,"item-shape-radius($radius, $rtl-reflexive)"),n.Qb(),n.Qb(),n.Rb(99,"td"),n.wc(100,"Sets the rounded shape to drawer navigation item with given radius size. Set "),n.Rb(101,"code"),n.wc(102,"$rtl-reflexive"),n.Qb(),n.wc(103," to true to flip radius values in RTL context, defaults to true."),n.Qb(),n.Qb(),n.Rb(104,"tr"),n.Rb(105,"td"),n.Rb(106,"code"),n.wc(107,"activated-overlay-color($color)"),n.Qb(),n.Qb(),n.Rb(108,"td"),n.wc(109,"Sets the overlay color of the activated drawer list item."),n.Qb(),n.Qb(),n.Rb(110,"tr"),n.Rb(111,"td"),n.Rb(112,"code"),n.wc(113,"scrim-fill-color($color)"),n.Qb(),n.Qb(),n.Rb(114,"td"),n.wc(115,"Sets the fill color of "),n.Rb(116,"code"),n.wc(117,"scrim"),n.Qb(),n.wc(118,"."),n.Qb(),n.Qb(),n.Rb(119,"tr"),n.Rb(120,"td"),n.Rb(121,"code"),n.wc(122,"z-index($value)"),n.Qb(),n.Qb(),n.Rb(123,"td"),n.wc(124,"Sets the z index of drawer. Drawer stays on top of top app bar except for clipped variant of drawer."),n.Qb(),n.Qb(),n.Rb(125,"tr"),n.Rb(126,"td"),n.Rb(127,"code"),n.wc(128,"width($width)"),n.Qb(),n.Qb(),n.Rb(129,"td"),n.wc(130,"Sets the width of the drawer. In the case of the dismissible variant, also sets margin required for "),n.Rb(131,"code"),n.wc(132,"app-content"),n.Qb(),n.wc(133,"."),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Qb())},directives:[d.l],encapsulation:2}),M),E=[{path:"",component:(T=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Drawers",description:"The MDC Navigation Drawer is used to organize access to destinations and other functionality on an app.",references:[{name:"Material Design guidelines: Navigation Drawer",url:"https://material.io/design/components/navigation-drawer.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-drawer/README.md"}],code:"import {MdcDrawerModule} from '@angular-mdc/web';",sass:"@use '@material/drawer/mdc-drawer';\n@use '@material/drawer';"}}}]),e}(),T.\u0275fac=function(e){return new(e||T)},T.\u0275cmp=n.Fb({type:T,selectors:[["ng-component"]],viewQuery:function(e,t){var i;1&e&&n.tc(a.a,!0),2&e&&n.nc(i=n.ac())&&(t._componentViewer=i.first)},decls:1,vars:0,template:function(e,t){1&e&&n.Mb(0,"component-viewer")},directives:[s.a],encapsulation:2}),T),children:[{path:"",redirectTo:"api"},{path:"api",component:F},{path:"sass",component:B},{path:"examples",component:(I=function(){function e(){_classCallCheck(this,e),this.destinations=[{label:"Inbox",icon:"inbox",activated:!0},{label:"Star",icon:"star",activated:!1},{label:"Sent Mail",icon:"send",activated:!1},{label:"Drafts",icon:"drafts",activated:!1}],this.genericTS="destinations = [\n  { label: 'Inbox', icon: 'inbox', activated: true },\n  { label: 'Star', icon: 'star', activated: false },\n  { label: 'Sent Mail', icon: 'send', activated: false },\n  { label: 'Drafts', icon: 'drafts', activated: false }\n];",this.examplePerm={html:'<mdc-drawer>\n  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>\n  <mdc-drawer-content>\n    <mdc-list>\n      <a mdc-list-item *ngFor="let item of destinations" href="#/drawer-demo/examples" [activated]="item.activated">\n        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}\n      </a>\n      <mdc-list-divider></mdc-list-divider>\n      <h6 mdcListGroupSubheader>Labels</h6>\n      <a mdc-list-item href="#/drawer-demo/examples">\n        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Family\n      </a>\n      <a mdc-list-item href="#/drawer-demo/examples">\n        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Friends\n      </a>\n      <a mdc-list-item href="#/drawer-demo/examples">\n        <mdc-icon mdcListItemGraphic>bookmark</mdc-icon>Work\n      </a>\n      <mdc-list-divider></mdc-list-divider>\n      <a mdc-list-item href="#/drawer-demo/examples">\n        <mdc-icon mdcListItemGraphic>settings</mdc-icon>Settings\n      </a>\n      <a mdc-list-item href="#/drawer-demo/examples">\n        <mdc-icon mdcListItemGraphic>announcement</mdc-icon>Help & feedback\n      </a>\n    </mdc-list>\n  </mdc-drawer-content>\n</mdc-drawer>',ts:this.genericTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss"},this.exampleDismissible={html:'<mdc-drawer drawer="dismissible">\n  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>\n  <mdc-drawer-content>\n    <mdc-list>\n      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">\n        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}\n      </mdc-list-item>\n    </mdc-list>\n  </mdc-drawer-content>\n</mdc-drawer>\n<div mdcDrawerAppContent>\n  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque\n  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.\n  legere iriure blandit. Veri iisque accusamus an pri.\n</div>',ts:this.genericTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss"},this.exampleModal={html:'<mdc-drawer drawer="modal" open>\n  <mdc-drawer-header>\n    <h3 mdcDrawerTitle>Drawer Title</h3>\n    <h6 mdcDrawerSubtitle>Subtitle</h6>\n  </mdc-drawer-header>\n  <mdc-drawer-content>\n    <mdc-list>\n      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">\n        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}\n      </mdc-list-item>\n    </mdc-list>\n  </mdc-drawer-content>\n</mdc-drawer>\n<div>\n  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque\n  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.\n  legere iriure blandit. Veri iisque accusamus an pri.\n</div>',ts:this.genericTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss"},this.exampleRtl={html:'<mdc-drawer drawer="modal" dir="rtl">\n  <mdc-drawer-header>\n    <h3 mdcDrawerTitle>Drawer Title</h3>\n    <h6 mdcDrawerSubtitle>Subtitle</h6>\n  </mdc-drawer-header>\n  <mdc-drawer-content dir="rtl">\n    <mdc-list>\n      <mdc-list-item *ngFor="let item of destinations" [activated]="item.activated">\n        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}\n      </mdc-list-item>\n    </mdc-list>\n  </mdc-drawer-content>\n</mdc-drawer>\n<div>\n  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque\n  efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere\n  Veri iisque accusamus an pri.\n</div>',ts:this.genericTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss"},this.exampleShaped={html:'<mdc-drawer>\n  <mdc-drawer-header title="Drawer Title" subtitle="Subtitle"></mdc-drawer-header>\n  <mdc-drawer-content>\n    <mdc-list class="demo-list--shaped">\n      <a mdc-list-item *ngFor="let item of destinations" href="#/drawer-demo/examples" [activated]="item.activated">\n        <mdc-icon mdcListItemGraphic *ngIf="item.icon">{{item.icon}}</mdc-icon>{{item.label}}\n      </a>\n    </mdc-list>\n  </mdc-drawer-content>\n</mdc-drawer>\n<div>\n  Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea,\n  voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit.\n  legere iriure blandit. Veri iisque accusamus an pri.\n</div>',ts:this.genericTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_drawer.scss"}}return _createClass(e,[{key:"alternateColors",value:function(e,t){e.elementRef.nativeElement.classList.contains(t)?e.elementRef.nativeElement.classList.remove(t):e.elementRef.nativeElement.classList.add(t)}}]),e}(),I.\u0275fac=function(e){return new(e||I)},I.\u0275cmp=n.Fb({type:I,selectors:[["ng-component"]],decls:128,vars:10,consts:[[1,"demo-content"],[1,"demo-content__headline"],[1,"demo-layout__row--no-wrap","demo-drawer-app"],["demoPermanent",""],["title","Drawer Title","subtitle","Subtitle"],["mdc-list-item","","href","#/drawer-demo/examples",3,"activated",4,"ngFor","ngForOf"],["mdcListGroupSubheader",""],["mdc-list-item","","href","#/drawer-demo/examples"],["mdcListItemGraphic",""],[2,"padding","16px","height","400px"],[1,"demo-layout__row"],["mdc-button","",3,"click"],[3,"example"],["drawer","dismissible"],["demoDismissible",""],[3,"activated",4,"ngFor","ngForOf"],["mdcDrawerAppContent","",2,"padding","16px","height","400px"],["drawer","modal"],["demoModal",""],["mdcDrawerTitle",""],["mdcDrawerSubtitle",""],["drawer","modal","dir","rtl"],["demoRTL",""],["dir","rtl"],["demoShaped",""],[1,"demo-list--shaped"],["mdc-list-item","","href","#/drawer-demo/examples",3,"activated"],["mdcListItemGraphic","",4,"ngIf"],[3,"activated"]],template:function(e,t){if(1&e){var i=n.Sb();n.Rb(0,"div",0),n.Rb(1,"h3",1),n.wc(2,"Standard"),n.Qb(),n.Rb(3,"div",2),n.Rb(4,"mdc-drawer",null,3),n.Mb(6,"mdc-drawer-header",4),n.Rb(7,"mdc-drawer-content"),n.Rb(8,"mdc-list"),n.uc(9,f,3,3,"a",5),n.Mb(10,"mdc-list-divider"),n.Rb(11,"h6",6),n.wc(12,"Labels"),n.Qb(),n.Rb(13,"a",7),n.Rb(14,"mdc-icon",8),n.wc(15,"bookmark"),n.Qb(),n.wc(16,"Family "),n.Qb(),n.Rb(17,"a",7),n.Rb(18,"mdc-icon",8),n.wc(19,"bookmark"),n.Qb(),n.wc(20,"Friends "),n.Qb(),n.Rb(21,"a",7),n.Rb(22,"mdc-icon",8),n.wc(23,"bookmark"),n.Qb(),n.wc(24,"Work "),n.Qb(),n.Mb(25,"mdc-list-divider"),n.Rb(26,"a",7),n.Rb(27,"mdc-icon",8),n.wc(28,"settings"),n.Qb(),n.wc(29,"Settings "),n.Qb(),n.Rb(30,"a",7),n.Rb(31,"mdc-icon",8),n.wc(32,"announcement"),n.Qb(),n.wc(33,"Help & feedback "),n.Qb(),n.Qb(),n.Qb(),n.Qb(),n.Rb(34,"div",9),n.wc(35," Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere iriure blandit. Veri iisque accusamus an pri. "),n.Qb(),n.Qb(),n.Rb(36,"div",10),n.Rb(37,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(5);return t.alternateColors(e,"demo-drawer--custom")})),n.wc(38,"Custom Colors"),n.Qb(),n.Rb(39,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(5);return t.alternateColors(e,"demo-drawer--accessible")})),n.wc(40,"Accessible Colors"),n.Qb(),n.Qb(),n.Mb(41,"example-viewer",12),n.Qb(),n.Rb(42,"div",0),n.Rb(43,"h3",1),n.wc(44,"Dismissible"),n.Qb(),n.Rb(45,"div",2),n.Rb(46,"mdc-drawer",13,14),n.Mb(48,"mdc-drawer-header",4),n.Rb(49,"mdc-drawer-content"),n.Rb(50,"mdc-list"),n.uc(51,x,3,3,"mdc-list-item",15),n.Qb(),n.Qb(),n.Qb(),n.Rb(52,"div",16),n.wc(53," Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere iriure blandit. Veri iisque accusamus an pri. "),n.Qb(),n.Qb(),n.Rb(54,"div",10),n.Rb(55,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(47);return e.open=!e.open})),n.wc(56,"Open/Close"),n.Qb(),n.Rb(57,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(47);return t.alternateColors(e,"demo-drawer--custom")})),n.wc(58,"Custom Colors"),n.Qb(),n.Rb(59,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(47);return t.alternateColors(e,"demo-drawer--accessible")})),n.wc(60,"Accessible Colors"),n.Qb(),n.Qb(),n.Mb(61,"example-viewer",12),n.Qb(),n.Rb(62,"div",0),n.Rb(63,"h3",1),n.wc(64,"Modal"),n.Qb(),n.Rb(65,"div",2),n.Rb(66,"mdc-drawer",17,18),n.Rb(68,"mdc-drawer-header"),n.Rb(69,"h3",19),n.wc(70,"Drawer Title"),n.Qb(),n.Rb(71,"h6",20),n.wc(72,"Subtitle"),n.Qb(),n.Qb(),n.Rb(73,"mdc-drawer-content"),n.Rb(74,"mdc-list"),n.uc(75,D,3,3,"mdc-list-item",15),n.Qb(),n.Qb(),n.Qb(),n.Rb(76,"div",9),n.wc(77," Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere iriure blandit. Veri iisque accusamus an pri. "),n.Qb(),n.Qb(),n.Rb(78,"div",10),n.Rb(79,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(67);return e.open=!e.open})),n.wc(80,"Open"),n.Qb(),n.Rb(81,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(67);return t.alternateColors(e,"demo-drawer--custom")})),n.wc(82,"Custom Colors"),n.Qb(),n.Rb(83,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(67);return t.alternateColors(e,"demo-drawer--accessible")})),n.wc(84,"Accessible Colors"),n.Qb(),n.Qb(),n.Mb(85,"example-viewer",12),n.Qb(),n.Rb(86,"div",0),n.Rb(87,"h3",1),n.wc(88,"RTL"),n.Qb(),n.Rb(89,"div",2),n.Rb(90,"mdc-drawer",21,22),n.Rb(92,"mdc-drawer-header"),n.Rb(93,"h3",19),n.wc(94,"Drawer Title"),n.Qb(),n.Rb(95,"h6",20),n.wc(96,"Subtitle"),n.Qb(),n.Qb(),n.Rb(97,"mdc-drawer-content",23),n.Rb(98,"mdc-list"),n.uc(99,C,3,3,"mdc-list-item",15),n.Qb(),n.Qb(),n.Qb(),n.Rb(100,"div",9),n.wc(101," Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere iriure blandit. Veri iisque accusamus an pri. "),n.Qb(),n.Qb(),n.Rb(102,"div",10),n.Rb(103,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(91);return e.open=!e.open})),n.wc(104,"Open"),n.Qb(),n.Rb(105,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(91);return t.alternateColors(e,"demo-drawer--custom")})),n.wc(106,"Custom Colors"),n.Qb(),n.Rb(107,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(91);return t.alternateColors(e,"demo-drawer--accessible")})),n.wc(108,"Accessible Colors"),n.Qb(),n.Qb(),n.Mb(109,"example-viewer",12),n.Qb(),n.Rb(110,"div",0),n.Rb(111,"h3",1),n.wc(112,"Shaped"),n.Qb(),n.Rb(113,"div",2),n.Rb(114,"mdc-drawer",null,24),n.Mb(116,"mdc-drawer-header",4),n.Rb(117,"mdc-drawer-content"),n.Rb(118,"mdc-list",25),n.uc(119,L,3,3,"a",5),n.Qb(),n.Qb(),n.Qb(),n.Rb(120,"div",9),n.wc(121," Lorem ipsum dolor sit amet, ad erat postea ullamcorper nec, veri veniam quo et. Diam phaedrum ei mea, quaeque voluptaria efficiantur duo no. Eu adhuc veritus civibus nec, sumo invidunt mel id, in vim dictas detraxit. Per an legere iriure blandit. Veri iisque accusamus an pri. "),n.Qb(),n.Qb(),n.Rb(122,"div",10),n.Rb(123,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(115);return t.alternateColors(e,"demo-drawer--custom")})),n.wc(124,"Custom Colors"),n.Qb(),n.Rb(125,"button",11),n.Zb("click",(function(){n.pc(i);var e=n.oc(115);return t.alternateColors(e,"demo-drawer--accessible")})),n.wc(126,"Accessible Colors"),n.Qb(),n.Qb(),n.Mb(127,"example-viewer",12),n.Qb()}2&e&&(n.Bb(9),n.ic("ngForOf",t.destinations),n.Bb(32),n.ic("example",t.examplePerm),n.Bb(10),n.ic("ngForOf",t.destinations),n.Bb(10),n.ic("example",t.exampleDismissible),n.Bb(14),n.ic("ngForOf",t.destinations),n.Bb(10),n.ic("example",t.exampleModal),n.Bb(14),n.ic("ngForOf",t.destinations),n.Bb(10),n.ic("example",t.exampleRtl),n.Bb(10),n.ic("ngForOf",t.destinations),n.Bb(8),n.ic("example",t.exampleShaped))},directives:[l.a,l.b,m.b,u.a,w.j,p.a,u.c,R.b,Q.b,R.c,b.a,h.a,m.a,m.d,m.c,w.k],encapsulation:2}),I)}]}],O=(($=function e(){_classCallCheck(this,e)}).\u0275mod=n.Jb({type:$}),$.\u0275inj=n.Ib({factory:function(e){return new(e||$)},imports:[[r.e.forChild(E)],r.e]}),$),P=((_=function e(){_classCallCheck(this,e)}).\u0275mod=n.Jb({type:_}),_.\u0275inj=n.Ib({factory:function(e){return new(e||_)},imports:[[c.a,O]]}),_)},leug:function(e,t,i){"use strict";var c=i("LuDt");i.d(t,"a",(function(){return c.a}))}}]);