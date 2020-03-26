(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"1Sse":function(t,n,o){"use strict";o.r(n),o.d(n,"IconButtonModule",(function(){return w}));var c=o("d2mR"),e=o("tyNb"),b=o("leug"),i=o("fXoL"),d=o("LuDt"),a=o("5l+6"),m=o("o/N6"),s=o("o085"),r=o("dkiD"),l=o("9UYg"),u=o("3Pt+");const h=[{path:"",component:(()=>{class t{ngOnInit(){this._componentViewer.template={title:"Icon Buttons",description:"Icon buttons allow users to take actions, and make choices, with a single tap.",references:[{name:"Material Design guidelines: Toggle Buttons",url:"https://material.io/design/components/buttons.html#toggle-button"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-icon-button/README.md"}],code:"import {MdcIconButtonModule} from '@angular-mdc/web';",sass:"@use '@material/icon-button/mdc-icon-button';\n@use '@material/icon-button';"}}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.Fb({type:t,selectors:[["ng-component"]],viewQuery:function(t,n){var o;1&t&&i.tc(b.a,!0),2&t&&i.nc(o=i.ac())&&(n._componentViewer=o.first)},decls:1,vars:0,template:function(t,n){1&t&&i.Mb(0,"component-viewer")},directives:[d.a],encapsulation:2}),t})(),children:[{path:"",redirectTo:"api"},{path:"api",component:(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.Fb({type:t,selectors:[["ng-component"]],decls:67,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""]],template:function(t,n){1&t&&(i.Rb(0,"div",0),i.Rb(1,"h3",1),i.wc(2,"MdcIconButton"),i.Qb(),i.Rb(3,"p"),i.wc(4," Selector: "),i.Rb(5,"span",2),i.wc(6,"button[mdcIconButton]"),i.Qb(),i.Rb(7,"span",2),i.wc(8,"a[mdcIconButton]"),i.Qb(),i.Rb(9,"span",2),i.wc(10,"mdc-icon-button"),i.Qb(),i.Qb(),i.wc(11," Exported as: "),i.Rb(12,"span",2),i.wc(13,"mdcIconButton"),i.Qb(),i.Rb(14,"h4",3),i.wc(15,"Properties"),i.Qb(),i.Rb(16,"table"),i.Rb(17,"thead"),i.Rb(18,"tr"),i.Rb(19,"th"),i.wc(20,"Name"),i.Qb(),i.Rb(21,"th"),i.wc(22,"Description"),i.Qb(),i.Qb(),i.Qb(),i.Rb(23,"tbody"),i.Rb(24,"tr"),i.Rb(25,"td"),i.wc(26,"on: boolean"),i.Qb(),i.Rb(27,"td"),i.wc(28,"Sets the toggle state to the provided value."),i.Qb(),i.Qb(),i.Rb(29,"tr"),i.Rb(30,"td"),i.wc(31,"disabled: boolean"),i.Qb(),i.Rb(32,"td"),i.wc(33,"Disables the icon button."),i.Qb(),i.Qb(),i.Rb(34,"tr"),i.Rb(35,"td"),i.wc(36,"icon: string"),i.Qb(),i.Rb(37,"td"),i.wc(38,"Optional. Set a Material Icon as a non-toggle icon."),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Rb(39,"h4",3),i.wc(40,"Methods"),i.Qb(),i.Rb(41,"table"),i.Rb(42,"tbody"),i.Rb(43,"tr"),i.Rb(44,"td"),i.wc(45,"toggle(isOn?: boolean)"),i.Qb(),i.Rb(46,"td"),i.wc(47,"Toggles the icon toggle state. If an argument is given, will toggle on if true, off if false."),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Rb(48,"h4",3),i.wc(49,"Events"),i.Qb(),i.Rb(50,"table"),i.Rb(51,"tbody"),i.Rb(52,"tr"),i.Rb(53,"td"),i.wc(54,"change: MdcIconButtonChange"),i.Qb(),i.Rb(55,"td"),i.wc(56,"Emits when the icon is toggled."),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Rb(57,"div",0),i.Rb(58,"h3",1),i.wc(59,"MdcIconOn"),i.Qb(),i.wc(60,' Apply to an mdc-icon, and is used to indicate the toggle button icon representing the "on" icon.'),i.Rb(61,"p"),i.wc(62," Selector: "),i.Rb(63,"span",2),i.wc(64,"mdcIcon[mdcIconOn]"),i.Qb(),i.Rb(65,"span",2),i.wc(66,"mdcIconOn"),i.Qb(),i.Qb(),i.Qb())},directives:[a.i,a.l],encapsulation:2}),t})()},{path:"sass",component:(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.Fb({type:t,selectors:[["ng-component"]],decls:43,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(t,n){1&t&&(i.Rb(0,"div",0),i.Rb(1,"h4",1),i.wc(2,"Sass Mixins"),i.Qb(),i.Rb(3,"p"),i.wc(4," To customize an icon button's color and properties, you can use the following mixins. "),i.Qb(),i.Rb(5,"table"),i.Rb(6,"thead"),i.Rb(7,"tr"),i.Rb(8,"th"),i.wc(9,"Mixin"),i.Qb(),i.Rb(10,"th"),i.wc(11,"Description"),i.Qb(),i.Qb(),i.Qb(),i.Rb(12,"tbody"),i.Rb(13,"tr"),i.Rb(14,"td"),i.Rb(15,"code"),i.wc(16,"icon-button-size($width, $height, $padding)"),i.Qb(),i.Qb(),i.Rb(17,"td"),i.wc(18,"Sets the width, height, font-size and padding for the icon and ripple. "),i.Rb(19,"code"),i.wc(20,"$height"),i.Qb(),i.wc(21," is optional and defaults to "),i.Rb(22,"code"),i.wc(23,"$width"),i.Qb(),i.wc(24,". "),i.Rb(25,"code"),i.wc(26,"$padding"),i.Qb(),i.wc(27," is optional and defaults to "),i.Rb(28,"code"),i.wc(29,"max($width, $height)/2"),i.Qb(),i.wc(30,". "),i.Rb(31,"code"),i.wc(32,"font-size"),i.Qb(),i.wc(33," is set to "),i.Rb(34,"code"),i.wc(35,"max($width, $height)"),i.Qb(),i.wc(36,"."),i.Qb(),i.Qb(),i.Rb(37,"tr"),i.Rb(38,"td"),i.Rb(39,"code"),i.wc(40,"icon-button-ink-color($color)"),i.Qb(),i.Qb(),i.Rb(41,"td"),i.wc(42,"Sets the font color and the ripple color to the provided color value."),i.Qb(),i.Qb(),i.Qb(),i.Qb(),i.Qb())},directives:[a.l],encapsulation:2}),t})()},{path:"examples",component:(()=>{class t{constructor(){this.example1={html:'<button mdc-icon-button icon="keyboard_arrow_left"></button>\n\n<button mdc-icon-button icon="keyboard_arrow_right"></button>\n\n<button mdcIconButton>\n  <mdc-icon>favorite</mdc-icon>\n</button>'},this.example2={html:'<button mdcIconButton>\n  <mdc-icon fontSet="fa" fontIcon="fa-star" mdcIconOn></mdc-icon>\n  <mdc-icon fontSet="fa" fontIcon="fa-star-o"></mdc-icon>\n</button>'},this.example3={html:'<form #demoForm="ngForm">\n  <button mdcIconButton ngModel #demoIconButtonModel="ngModel">\n    <mdc-icon mdcIconOn>favorite</mdc-icon>\n    <mdc-icon>favorite_border</mdc-icon>\n  </button>\n</form>'},this.example4={html:'<button mdcIconButton [on]="true">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>'},this.exampleSvg={html:'<button mdcIconButton>\n  <mdc-icon mdcIconOn>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>\n    </svg>\n  </mdc-icon>\n  <mdc-icon>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>\n    </svg>\n  </mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-large">\n  <mdc-icon mdcIconOn>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>\n    </svg>\n  </mdc-icon>\n  <mdc-icon>\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n      <path d="M0 0h24v24H0z" fill="none"></path>\n      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>\n    </svg>\n  </mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss"},this.example6={html:'<button mdcIconButton class="demo-icon-button-custom">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-primary">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdcIconButton class="demo-icon-button-secondary">\n  <mdc-icon mdcIconOn>favorite</mdc-icon>\n  <mdc-icon>favorite_border</mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_icon-button.scss"}}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=i.Fb({type:t,selectors:[["ng-component"]],decls:88,vars:10,consts:[[1,"demo-content"],[1,"demo-content__headline"],["mdc-icon-button","","icon","keyboard_arrow_left"],["mdc-icon-button","","icon","keyboard_arrow_right"],["mdcIconButton",""],[3,"example"],["fontSet","fa","fontIcon","fa-star","mdcIconOn",""],["fontSet","fa","fontIcon","fa-star-o"],[1,"demo-layout__row"],["mdc-button","",3,"click"],["demoForm","ngForm"],["mdcIconButton","","name","demoiconbutton","ngModel",""],["demoiconbutton","","demoIconButtonModel","ngModel"],["mdcIconOn",""],["mdcIconButton","",3,"on"],["demoiconbutton3",""],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24"],["d","M0 0h24v24H0z","fill","none"],["d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"],["d","M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"],["mdcIconButton","",1,"demo-icon-button-large"],["mdcIconButton","",1,"demo-icon-button-custom"],["mdcIconButton","",1,"demo-icon-button-primary"],["mdcIconButton","",1,"demo-icon-button-secondary"]],template:function(t,n){if(1&t){const t=i.Sb();i.Rb(0,"div",0),i.Rb(1,"h3",1),i.wc(2,"Icon Button"),i.Qb(),i.Mb(3,"button",2),i.Mb(4,"button",3),i.Rb(5,"button",4),i.Rb(6,"mdc-icon"),i.wc(7,"favorite"),i.Qb(),i.Qb(),i.Mb(8,"example-viewer",5),i.Qb(),i.Rb(9,"div",0),i.Rb(10,"h3",1),i.wc(11,"Using Font Awesome"),i.Qb(),i.Rb(12,"button",4),i.Mb(13,"mdc-icon",6),i.Mb(14,"mdc-icon",7),i.Qb(),i.Mb(15,"example-viewer",5),i.Qb(),i.Rb(16,"div",0),i.Rb(17,"h3",1),i.wc(18,"Using NgModel Form"),i.Qb(),i.Rb(19,"div",8),i.Rb(20,"button",9),i.Zb("click",(function(){i.pc(t);const n=i.oc(25);return n.disabled=!n.disabled})),i.wc(21),i.Qb(),i.Qb(),i.Rb(22,"form",null,10),i.Rb(24,"button",11,12),i.Rb(27,"mdc-icon",13),i.wc(28,"favorite"),i.Qb(),i.Rb(29,"mdc-icon"),i.wc(30,"favorite_border"),i.Qb(),i.Qb(),i.Qb(),i.Rb(31,"p"),i.wc(32),i.Qb(),i.Mb(33,"example-viewer",5),i.Qb(),i.Rb(34,"div",0),i.Rb(35,"h3",1),i.wc(36,"Using [on] property"),i.Qb(),i.Rb(37,"div",8),i.Rb(38,"button",9),i.Zb("click",(function(){i.pc(t);const n=i.oc(41);return n.on=!n.on})),i.wc(39),i.Qb(),i.Qb(),i.Rb(40,"button",14,15),i.Rb(42,"mdc-icon",13),i.wc(43,"favorite"),i.Qb(),i.Rb(44,"mdc-icon"),i.wc(45,"favorite_border"),i.Qb(),i.Qb(),i.Mb(46,"example-viewer",5),i.Qb(),i.Rb(47,"div",0),i.Rb(48,"h3",1),i.wc(49,"SVG Icon"),i.Qb(),i.Rb(50,"button",4),i.Rb(51,"mdc-icon",13),i.cc(),i.Rb(52,"svg",16),i.Mb(53,"path",17),i.Mb(54,"path",18),i.Qb(),i.Qb(),i.bc(),i.Rb(55,"mdc-icon"),i.cc(),i.Rb(56,"svg",16),i.Mb(57,"path",17),i.Mb(58,"path",19),i.Qb(),i.Qb(),i.Qb(),i.bc(),i.Rb(59,"button",20),i.Rb(60,"mdc-icon",13),i.cc(),i.Rb(61,"svg",16),i.Mb(62,"path",17),i.Mb(63,"path",18),i.Qb(),i.Qb(),i.bc(),i.Rb(64,"mdc-icon"),i.cc(),i.Rb(65,"svg",16),i.Mb(66,"path",17),i.Mb(67,"path",19),i.Qb(),i.Qb(),i.Qb(),i.bc(),i.Mb(68,"example-viewer",5),i.Qb(),i.Rb(69,"div",0),i.Rb(70,"h3",1),i.wc(71,"Theme"),i.Qb(),i.Rb(72,"button",21),i.Rb(73,"mdc-icon",13),i.wc(74,"favorite"),i.Qb(),i.Rb(75,"mdc-icon"),i.wc(76,"favorite_border"),i.Qb(),i.Qb(),i.Rb(77,"button",22),i.Rb(78,"mdc-icon",13),i.wc(79,"favorite"),i.Qb(),i.Rb(80,"mdc-icon"),i.wc(81,"favorite_border"),i.Qb(),i.Qb(),i.Rb(82,"button",23),i.Rb(83,"mdc-icon",13),i.wc(84,"favorite"),i.Qb(),i.Rb(85,"mdc-icon"),i.wc(86,"favorite_border"),i.Qb(),i.Qb(),i.Mb(87,"example-viewer",5),i.Qb()}if(2&t){const t=i.oc(25),o=i.oc(26),c=i.oc(41);i.Bb(8),i.ic("example",n.example1),i.Bb(7),i.ic("example",n.example2),i.Bb(6),i.yc("Disabled: ",t.disabled?"On":"Off",""),i.Bb(11),i.yc("Value: ",o.value,""),i.Bb(1),i.ic("example",n.example3),i.Bb(6),i.yc("Icon: ",c.on?"On":"Off",""),i.Bb(1),i.ic("on",!0),i.Bb(6),i.ic("example",n.example4),i.Bb(22),i.ic("example",n.exampleSvg),i.Bb(19),i.ic("example",n.example6)}},directives:[m.a,s.b,r.a,m.b,l.a,u.r,u.l,u.m,u.k,u.n],encapsulation:2}),t})()}]}];let p=(()=>{class t{}return t.\u0275mod=i.Jb({type:t}),t.\u0275inj=i.Ib({factory:function(n){return new(n||t)},imports:[[e.e.forChild(h)],e.e]}),t})(),w=(()=>{class t{}return t.\u0275mod=i.Jb({type:t}),t.\u0275inj=i.Ib({factory:function(n){return new(n||t)},imports:[[c.a,p]]}),t})()},leug:function(t,n,o){"use strict";var c=o("LuDt");o.d(n,"a",(function(){return c.a}))}}]);