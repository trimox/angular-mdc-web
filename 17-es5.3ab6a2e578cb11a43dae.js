function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var o=0;o<n.length;o++){var c=n[o];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(t,c.key,c)}}function _createClass(t,n,o){return n&&_defineProperties(t.prototype,n),o&&_defineProperties(t,o),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"1Sse":function(t,n,o){"use strict";o.r(n);var c,e,b,i,a,d=o("d2mR"),s=o("tyNb"),m=o("leug"),r=o("fXoL"),l=o("LuDt"),u=o("5l+6"),h=o("o/N6"),p=o("o085"),w=o("dkiD"),v=o("9UYg"),f=o("3Pt+"),R=[{path:"",component:(i=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Icon Buttons",description:"Icon buttons allow users to take actions, and make choices, with a single tap.",references:[{name:"Material Design guidelines: Toggle Buttons",url:"https://material.io/design/components/buttons.html#toggle-button"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-icon-button/README.md"}],code:"import {MdcIconButtonModule} from '@angular-mdc/web';",sass:"@use '@material/icon-button/mdc-icon-button';\n@use '@material/icon-button';"}}}]),t}(),i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=r.Fb({type:i,selectors:[["ng-component"]],viewQuery:function(t,n){var o;1&t&&r.tc(m.a,!0),2&t&&r.nc(o=r.ac())&&(n._componentViewer=o.first)},decls:1,vars:0,template:function(t,n){1&t&&r.Mb(0,"component-viewer")},directives:[l.a],encapsulation:2}),i),children:[{path:"",redirectTo:"api"},{path:"api",component:(b=function t(){_classCallCheck(this,t)},b.\u0275fac=function(t){return new(t||b)},b.\u0275cmp=r.Fb({type:b,selectors:[["ng-component"]],decls:67,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.Rb(1,"h3",1),r.wc(2,"MdcIconButton"),r.Qb(),r.Rb(3,"p"),r.wc(4," Selector: "),r.Rb(5,"span",2),r.wc(6,"button[mdcIconButton]"),r.Qb(),r.Rb(7,"span",2),r.wc(8,"a[mdcIconButton]"),r.Qb(),r.Rb(9,"span",2),r.wc(10,"mdc-icon-button"),r.Qb(),r.Qb(),r.wc(11," Exported as: "),r.Rb(12,"span",2),r.wc(13,"mdcIconButton"),r.Qb(),r.Rb(14,"h4",3),r.wc(15,"Properties"),r.Qb(),r.Rb(16,"table"),r.Rb(17,"thead"),r.Rb(18,"tr"),r.Rb(19,"th"),r.wc(20,"Name"),r.Qb(),r.Rb(21,"th"),r.wc(22,"Description"),r.Qb(),r.Qb(),r.Qb(),r.Rb(23,"tbody"),r.Rb(24,"tr"),r.Rb(25,"td"),r.wc(26,"on: boolean"),r.Qb(),r.Rb(27,"td"),r.wc(28,"Sets the toggle state to the provided value."),r.Qb(),r.Qb(),r.Rb(29,"tr"),r.Rb(30,"td"),r.wc(31,"disabled: boolean"),r.Qb(),r.Rb(32,"td"),r.wc(33,"Disables the icon button."),r.Qb(),r.Qb(),r.Rb(34,"tr"),r.Rb(35,"td"),r.wc(36,"icon: string"),r.Qb(),r.Rb(37,"td"),r.wc(38,"Optional. Set a Material Icon as a non-toggle icon."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(39,"h4",3),r.wc(40,"Methods"),r.Qb(),r.Rb(41,"table"),r.Rb(42,"tbody"),r.Rb(43,"tr"),r.Rb(44,"td"),r.wc(45,"toggle(isOn?: boolean)"),r.Qb(),r.Rb(46,"td"),r.wc(47,"Toggles the icon toggle state. If an argument is given, will toggle on if true, off if false."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(48,"h4",3),r.wc(49,"Events"),r.Qb(),r.Rb(50,"table"),r.Rb(51,"tbody"),r.Rb(52,"tr"),r.Rb(53,"td"),r.wc(54,"change: MdcIconButtonChange"),r.Qb(),r.Rb(55,"td"),r.wc(56,"Emits when the icon is toggled."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(57,"div",0),r.Rb(58,"h3",1),r.wc(59,"MdcIconOn"),r.Qb(),r.wc(60,' Apply to an mdc-icon, and is used to indicate the toggle button icon representing the "on" icon.'),r.Rb(61,"p"),r.wc(62," Selector: "),r.Rb(63,"span",2),r.wc(64,"mdcIcon[mdcIconOn]"),r.Qb(),r.Rb(65,"span",2),r.wc(66,"mdcIconOn"),r.Qb(),r.Qb(),r.Qb())},directives:[u.i,u.l],encapsulation:2}),b)},{path:"sass",component:(e=function t(){_classCallCheck(this,t)},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Fb({type:e,selectors:[["ng-component"]],decls:43,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.Rb(1,"h4",1),r.wc(2,"Sass Mixins"),r.Qb(),r.Rb(3,"p"),r.wc(4," To customize an icon button's color and properties, you can use the following mixins. "),r.Qb(),r.Rb(5,"table"),r.Rb(6,"thead"),r.Rb(7,"tr"),r.Rb(8,"th"),r.wc(9,"Mixin"),r.Qb(),r.Rb(10,"th"),r.wc(11,"Description"),r.Qb(),r.Qb(),r.Qb(),r.Rb(12,"tbody"),r.Rb(13,"tr"),r.Rb(14,"td"),r.Rb(15,"code"),r.wc(16,"icon-button-size($width, $height, $padding)"),r.Qb(),r.Qb(),r.Rb(17,"td"),r.wc(18,"Sets the width, height, font-size and padding for the icon and ripple. "),r.Rb(19,"code"),r.wc(20,"$height"),r.Qb(),r.wc(21," is optional and defaults to "),r.Rb(22,"code"),r.wc(23,"$width"),r.Qb(),r.wc(24,". "),r.Rb(25,"code"),r.wc(26,"$padding"),r.Qb(),r.wc(27," is optional and defaults to "),r.Rb(28,"code"),r.wc(29,"max($width, $height)/2"),r.Qb(),r.wc(30,". "),r.Rb(31,"code"),r.wc(32,"font-size"),r.Qb(),r.wc(33," is set to "),r.Rb(34,"code"),r.wc(35,"max($width, $height)"),r.Qb(),r.wc(36,"."),r.Qb(),r.Qb(),r.Rb(37,"tr"),r.Rb(38,"td"),r.Rb(39,"code"),r.wc(40,"icon-button-ink-color($color)"),r.Qb(),r.Qb(),r.Rb(41,"td"),r.wc(42,"Sets the font color and the ripple color to the provided color value."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb())},directives:[u.l],encapsulation:2}),e)},{path:"examples",component:(c=function t(){_classCallCheck(this,t),this.example1={html:'<button mdc-icon-button icon="keyboard_arrow_left"></button>\n\n<button mdc-icon-button icon="keyboard_arrow_right"></button>\n\n<button mdcIconButton>\n  <mdc-icon>favorite</mdc-icon>\n</button>'},this.example2={html:'<button mdcIconButton>\n  <mdc-icon fontSet="fa" fontIcon="fa-star" mdcIconOn></mdc-icon>\n  <mdc-icon fontSet="fa" fontIcon="fa-star-o"></mdc-icon>\n</button>'},this.example3={html:'<form #demoForm="ngForm">\n  <button mdcIconButton ngModel #demoIconButtonModel="ngModel">\n    <mdc-icon mdcIconOn>favorite</mdc-icon>\n    <mdc-icon>favorite_border</mdc-icon>\n  </button>\n</form>'},this.example4={html:'<button mdcIconButton [on]="true">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>'},this.exampleSvg={html:'<button mdcIconButton>\n  <mdc-icon mdcIconOn>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>\n    </svg>\n  </mdc-icon>\n  <mdc-icon>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>\n    </svg>\n  </mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-large">\n  <mdc-icon mdcIconOn>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>\n    </svg>\n  </mdc-icon>\n  <mdc-icon>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>\n    </svg>\n  </mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss"},this.example6={html:'<button mdcIconButton class="demo-icon-button-custom">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-primary">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-secondary">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss"}},c.\u0275fac=function(t){return new(t||c)},c.\u0275cmp=r.Fb({type:c,selectors:[["ng-component"]],decls:88,vars:10,consts:[[1,"demo-content"],[1,"demo-content__headline"],["mdc-icon-button","","icon","keyboard_arrow_left"],["mdc-icon-button","","icon","keyboard_arrow_right"],["mdcIconButton",""],[3,"example"],["fontSet","fa","fontIcon","fa-star","mdcIconOn",""],["fontSet","fa","fontIcon","fa-star-o"],[1,"demo-layout__row"],["mdc-button","",3,"click"],["demoForm","ngForm"],["mdcIconButton","","name","demoiconbutton","ngModel",""],["demoiconbutton","","demoIconButtonModel","ngModel"],["mdcIconOn",""],["mdcIconButton","",3,"on"],["demoiconbutton3",""],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24"],["d","M0 0h24v24H0z","fill","none"],["d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"],["d","M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"],["mdcIconButton","",1,"demo-icon-button-large"],["mdcIconButton","",1,"demo-icon-button-custom"],["mdcIconButton","",1,"demo-icon-button-primary"],["mdcIconButton","",1,"demo-icon-button-secondary"]],template:function(t,n){if(1&t){var o=r.Sb();r.Rb(0,"div",0),r.Rb(1,"h3",1),r.wc(2,"Icon Button"),r.Qb(),r.Mb(3,"button",2),r.Mb(4,"button",3),r.Rb(5,"button",4),r.Rb(6,"mdc-icon"),r.wc(7,"favorite"),r.Qb(),r.Qb(),r.Mb(8,"example-viewer",5),r.Qb(),r.Rb(9,"div",0),r.Rb(10,"h3",1),r.wc(11,"Using Font Awesome"),r.Qb(),r.Rb(12,"button",4),r.Mb(13,"mdc-icon",6),r.Mb(14,"mdc-icon",7),r.Qb(),r.Mb(15,"example-viewer",5),r.Qb(),r.Rb(16,"div",0),r.Rb(17,"h3",1),r.wc(18,"Using NgModel Form"),r.Qb(),r.Rb(19,"div",8),r.Rb(20,"button",9),r.Zb("click",(function(){r.pc(o);var t=r.oc(25);return t.disabled=!t.disabled})),r.wc(21),r.Qb(),r.Qb(),r.Rb(22,"form",null,10),r.Rb(24,"button",11,12),r.Rb(27,"mdc-icon",13),r.wc(28,"favorite"),r.Qb(),r.Rb(29,"mdc-icon"),r.wc(30,"favorite_border"),r.Qb(),r.Qb(),r.Qb(),r.Rb(31,"p"),r.wc(32),r.Qb(),r.Mb(33,"example-viewer",5),r.Qb(),r.Rb(34,"div",0),r.Rb(35,"h3",1),r.wc(36,"Using [on] property"),r.Qb(),r.Rb(37,"div",8),r.Rb(38,"button",9),r.Zb("click",(function(){r.pc(o);var t=r.oc(41);return t.on=!t.on})),r.wc(39),r.Qb(),r.Qb(),r.Rb(40,"button",14,15),r.Rb(42,"mdc-icon",13),r.wc(43,"favorite"),r.Qb(),r.Rb(44,"mdc-icon"),r.wc(45,"favorite_border"),r.Qb(),r.Qb(),r.Mb(46,"example-viewer",5),r.Qb(),r.Rb(47,"div",0),r.Rb(48,"h3",1),r.wc(49,"SVG Icon"),r.Qb(),r.Rb(50,"button",4),r.Rb(51,"mdc-icon",13),r.cc(),r.Rb(52,"svg",16),r.Mb(53,"path",17),r.Mb(54,"path",18),r.Qb(),r.Qb(),r.bc(),r.Rb(55,"mdc-icon"),r.cc(),r.Rb(56,"svg",16),r.Mb(57,"path",17),r.Mb(58,"path",19),r.Qb(),r.Qb(),r.Qb(),r.bc(),r.Rb(59,"button",20),r.Rb(60,"mdc-icon",13),r.cc(),r.Rb(61,"svg",16),r.Mb(62,"path",17),r.Mb(63,"path",18),r.Qb(),r.Qb(),r.bc(),r.Rb(64,"mdc-icon"),r.cc(),r.Rb(65,"svg",16),r.Mb(66,"path",17),r.Mb(67,"path",19),r.Qb(),r.Qb(),r.Qb(),r.bc(),r.Mb(68,"example-viewer",5),r.Qb(),r.Rb(69,"div",0),r.Rb(70,"h3",1),r.wc(71,"Theme"),r.Qb(),r.Rb(72,"button",21),r.Rb(73,"mdc-icon",13),r.wc(74,"favorite"),r.Qb(),r.Rb(75,"mdc-icon"),r.wc(76,"favorite_border"),r.Qb(),r.Qb(),r.Rb(77,"button",22),r.Rb(78,"mdc-icon",13),r.wc(79,"favorite"),r.Qb(),r.Rb(80,"mdc-icon"),r.wc(81,"favorite_border"),r.Qb(),r.Qb(),r.Rb(82,"button",23),r.Rb(83,"mdc-icon",13),r.wc(84,"favorite"),r.Qb(),r.Rb(85,"mdc-icon"),r.wc(86,"favorite_border"),r.Qb(),r.Qb(),r.Mb(87,"example-viewer",5),r.Qb()}if(2&t){var c=r.oc(25),e=r.oc(26),b=r.oc(41);r.Bb(8),r.ic("example",n.example1),r.Bb(7),r.ic("example",n.example2),r.Bb(6),r.yc("Disabled: ",c.disabled?"On":"Off",""),r.Bb(11),r.yc("Value: ",e.value,""),r.Bb(1),r.ic("example",n.example3),r.Bb(6),r.yc("Icon: ",b.on?"On":"Off",""),r.Bb(1),r.ic("on",!0),r.Bb(6),r.ic("example",n.example4),r.Bb(22),r.ic("example",n.exampleSvg),r.Bb(19),r.ic("example",n.example6)}},directives:[h.a,p.b,w.a,h.b,v.a,f.r,f.l,f.m,f.k,f.n],encapsulation:2}),c)}]}],Q=((a=function t(){_classCallCheck(this,t)}).\u0275mod=r.Jb({type:a}),a.\u0275inj=r.Ib({factory:function(t){return new(t||a)},imports:[[s.e.forChild(R)],s.e]}),a);o.d(n,"IconButtonModule",(function(){return I}));var g,I=((g=function t(){_classCallCheck(this,t)}).\u0275mod=r.Jb({type:g}),g.\u0275inj=r.Ib({factory:function(t){return new(t||g)},imports:[[d.a,Q]]}),g)},leug:function(t,n,o){"use strict";var c=o("LuDt");o.d(n,"a",(function(){return c.a}))}}]);