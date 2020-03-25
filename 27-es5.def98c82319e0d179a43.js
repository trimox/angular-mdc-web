function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var c=0;c<t.length;c++){var b=t[c];b.enumerable=b.enumerable||!1,b.configurable=!0,"value"in b&&(b.writable=!0),Object.defineProperty(e,b.key,b)}}function _createClass(e,t,c){return t&&_defineProperties(e.prototype,t),c&&_defineProperties(e,c),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{CBXp:function(e,t,c){"use strict";c.r(t);var b,o,n,i,l,d=c("d2mR"),a=c("tyNb"),s=c("leug"),r=c("fXoL"),m=c("LuDt"),h=c("5l+6"),w=c("ywDi"),f=c("4G1d"),u=c("dkiD"),R=c("9UYg"),Q=c("3Pt+"),p=[{path:"",component:(i=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Switches",description:"Buttons allow users to take actions, and make choices, with a single tap.",references:[{name:"Material Design guidelines: Switches",url:"https://material.io/design/components/selection-controls.html#switches"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-switch/README.md"}],code:"import {MdcSwitchModule} from '@angular-mdc/web';",sass:"@use '@material/switch/mdc-switch';\n@use '@material/switch';"}}}]),e}(),i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=r.Fb({type:i,selectors:[["ng-component"]],viewQuery:function(e,t){var c;1&e&&r.tc(s.a,!0),2&e&&r.nc(c=r.ac())&&(t._componentViewer=c.first)},decls:1,vars:0,template:function(e,t){1&e&&r.Mb(0,"component-viewer")},directives:[m.a],encapsulation:2}),i),children:[{path:"",redirectTo:"api"},{path:"api",component:(n=function e(){_classCallCheck(this,e)},n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=r.Fb({type:n,selectors:[["ng-component"]],decls:83,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(r.Rb(0,"div",0),r.Rb(1,"h3",1),r.wc(2,"MdcSwitch"),r.Qb(),r.Rb(3,"p"),r.wc(4," Selector: "),r.Rb(5,"span",2),r.wc(6,"mdc-switch"),r.Qb(),r.Qb(),r.wc(7," Exported as: "),r.Rb(8,"span",2),r.wc(9,"mdcSwitch"),r.Qb(),r.Rb(10,"h4",3),r.wc(11,"Properties"),r.Qb(),r.Rb(12,"table"),r.Rb(13,"thead"),r.Rb(14,"tr"),r.Rb(15,"th"),r.wc(16,"Name"),r.Qb(),r.Rb(17,"th"),r.wc(18,"Description"),r.Qb(),r.Qb(),r.Qb(),r.Rb(19,"tbody"),r.Rb(20,"tr"),r.Rb(21,"td"),r.wc(22,"id: string"),r.Qb(),r.Rb(23,"td"),r.wc(24,"Unique Id of the switch (auto generated if not supplied)."),r.Qb(),r.Qb(),r.Rb(25,"tr"),r.Rb(26,"td"),r.wc(27,"name: string"),r.Qb(),r.Rb(28,"td"),r.wc(29,"Name of the switch."),r.Qb(),r.Qb(),r.Rb(30,"tr"),r.Rb(31,"td"),r.wc(32,"ariaLabel: string"),r.Qb(),r.Rb(33,"td"),r.wc(34,"Used to set the 'aria-label' attribute on the underlying input element."),r.Qb(),r.Qb(),r.Rb(35,"tr"),r.Rb(36,"td"),r.wc(37,"ariaLabelledby: string"),r.Qb(),r.Rb(38,"td"),r.wc(39,"The 'aria-labelledby' attribute takes precedence as the element's text alternative."),r.Qb(),r.Qb(),r.Rb(40,"tr"),r.Rb(41,"td"),r.wc(42,"tabIndex: number"),r.Qb(),r.Rb(43,"td"),r.wc(44,"Set the underlying tab index of the switch. (Default: 0)"),r.Qb(),r.Qb(),r.Rb(45,"tr"),r.Rb(46,"td"),r.wc(47,"checked: boolean"),r.Qb(),r.Rb(48,"td"),r.wc(49,"Use to set the checked value."),r.Qb(),r.Qb(),r.Rb(50,"tr"),r.Rb(51,"td"),r.wc(52,"disabled: boolean"),r.Qb(),r.Rb(53,"td"),r.wc(54,"Disables the switch."),r.Qb(),r.Qb(),r.Rb(55,"tr"),r.Rb(56,"td"),r.wc(57,"required: boolean"),r.Qb(),r.Rb(58,"td"),r.wc(59,"Whether the switch is required."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(60,"h4",3),r.wc(61,"Methods"),r.Qb(),r.Rb(62,"table"),r.Rb(63,"tbody"),r.Rb(64,"tr"),r.Rb(65,"td"),r.wc(66,"toggle()"),r.Qb(),r.Rb(67,"td"),r.wc(68,"Toggle the checked state of the switch."),r.Qb(),r.Qb(),r.Rb(69,"tr"),r.Rb(70,"td"),r.wc(71,"focus()"),r.Qb(),r.Rb(72,"td"),r.wc(73,"Set focus to the switch."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Rb(74,"h4",3),r.wc(75,"Events"),r.Qb(),r.Rb(76,"table"),r.Rb(77,"tbody"),r.Rb(78,"tr"),r.Rb(79,"td"),r.wc(80,"change(source: MdcSwitch, checked: boolean)"),r.Qb(),r.Rb(81,"td"),r.wc(82,"Event dispatched on value change."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb())},directives:[h.i,h.l],encapsulation:2}),n)},{path:"sass",component:(o=function e(){_classCallCheck(this,e)},o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=r.Fb({type:o,selectors:[["ng-component"]],decls:59,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(r.Rb(0,"div",0),r.Rb(1,"h4",1),r.wc(2,"Sass Mixins"),r.Qb(),r.Rb(3,"table"),r.Rb(4,"thead"),r.Rb(5,"tr"),r.Rb(6,"th"),r.wc(7,"Mixin"),r.Qb(),r.Rb(8,"th"),r.wc(9,"Description"),r.Qb(),r.Qb(),r.Qb(),r.Rb(10,"tbody"),r.Rb(11,"tr"),r.Rb(12,"td"),r.Rb(13,"code"),r.wc(14,"toggled-on-color($color)"),r.Qb(),r.Qb(),r.Rb(15,"td"),r.wc(16,"Sets the base color of the track, thumb, and ripple when the switch is toggled on."),r.Qb(),r.Qb(),r.Rb(17,"tr"),r.Rb(18,"td"),r.Rb(19,"code"),r.wc(20,"toggled-off-color($color)"),r.Qb(),r.Qb(),r.Rb(21,"td"),r.wc(22,"Sets the base color of the track, thumb, and ripple when the switch is toggled off."),r.Qb(),r.Qb(),r.Rb(23,"tr"),r.Rb(24,"td"),r.Rb(25,"code"),r.wc(26,"toggled-on-track-color($color)"),r.Qb(),r.Qb(),r.Rb(27,"td"),r.wc(28,"Sets color of the track when the switch is toggled on."),r.Qb(),r.Qb(),r.Rb(29,"tr"),r.Rb(30,"td"),r.Rb(31,"code"),r.wc(32,"toggled-off-track-color($color)"),r.Qb(),r.Qb(),r.Rb(33,"td"),r.wc(34,"Sets color of the track when the switch is toggled off."),r.Qb(),r.Qb(),r.Rb(35,"tr"),r.Rb(36,"td"),r.Rb(37,"code"),r.wc(38,"toggled-on-thumb-color($color)"),r.Qb(),r.Qb(),r.Rb(39,"td"),r.wc(40,"Sets color of the thumb when the switch is toggled on."),r.Qb(),r.Qb(),r.Rb(41,"tr"),r.Rb(42,"td"),r.Rb(43,"code"),r.wc(44,"toggled-off-thumb-color($color)"),r.Qb(),r.Qb(),r.Rb(45,"td"),r.wc(46,"Sets color of the thumb when the switch is toggled off."),r.Qb(),r.Qb(),r.Rb(47,"tr"),r.Rb(48,"td"),r.Rb(49,"code"),r.wc(50,"toggled-on-ripple-color($color)"),r.Qb(),r.Qb(),r.Rb(51,"td"),r.wc(52,"Sets the color of the ripple surrounding the thumb when the switch is toggled on."),r.Qb(),r.Qb(),r.Rb(53,"tr"),r.Rb(54,"td"),r.Rb(55,"code"),r.wc(56,"toggled-off-ripple-color($color)"),r.Qb(),r.Qb(),r.Rb(57,"td"),r.wc(58,"Sets the color of the ripple surrounding the thumb when the switch is toggled off."),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb())},directives:[h.l],encapsulation:2}),o)},{path:"examples",component:(b=function(){function e(){_classCallCheck(this,e),this.isSwitchOn=!1,this.exampleBasic={html:"<mdc-switch></mdc-switch>\n\n<mdc-form-field>\n  <mdc-switch></mdc-switch>\n  <label>off/on</label>\n</mdc-form-field>\n\n<mdc-form-field>\n  <mdc-switch disabled></mdc-switch>\n  <label>off/on</label>\n</mdc-form-field>\n\n<mdc-form-field alignEnd>\n  <mdc-switch></mdc-switch>\n  <label>RTL</label>\n</mdc-form-field>"},this.exampleChangeEvent={html:'<mdc-form-field>\n  <mdc-switch (change)="onChange($event)"></mdc-switch>\n  <label>off/on</label>\n</mdc-form-field>',ts:"import { MdcSwitchChange } from '@angular-mdc/web';\n\nonChange(evt: MdcSwitchChange): void {\n  console.log(evt.checked);\n}"},this.exampleCustom={html:'<mdc-form-field class="custom-switch__label-left-margin">\n  <mdc-switch></mdc-switch>\n  <label>Label margin</label>\n</mdc-form-field>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_switch.scss"},this.exampleNgModel={html:'<mdc-form-field>\n  <mdc-switch [(ngModel)]="isSwitchOn"></mdc-switch>\n  <label>off/on</label>\n</mdc-form-field>\n\n<p>NgModel value: {{isSwitchOn}}</p>',ts:"isSwitchOn: boolean = false;"},this.exampleNgModelForm={html:'<form #demoForm="ngForm" id="demoForm">\n  <mdc-form-field>\n    <mdc-switch #demoSwitch ngModel name="demoSwitch" #demoSwitchModel="ngModel"></mdc-switch>\n    <label>off/on</label>\n  </mdc-form-field>\n</form>\n\n<p>Dirty: {{ demoSwitchModel.dirty }}</p>\n<p>Touched: {{ demoSwitchModel.touched }}</p>\n<p>Value: {{ demoSwitchModel.value }}</p>'},this.exampleTheme={html:'<mdc-form-field>\n  <mdc-switch class="demo-switch--custom"></mdc-switch>\n  <label>Custom Theme</label>\n</mdc-form-field>\n\n<mdc-form-field>\n  <mdc-switch class="custom-switch--thumb-color"></mdc-switch>\n  <label>Thumb Color</label>\n</mdc-form-field>\n\n<mdc-form-field>\n  <mdc-switch class="custom-switch--track-color"></mdc-switch>\n  <label>Track Color</label>\n</mdc-form-field>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_switch.scss"}}return _createClass(e,[{key:"onChange",value:function(e){this.changeEvent=e.checked}}]),e}(),b.\u0275fac=function(e){return new(e||b)},b.\u0275cmp=r.Fb({type:b,selectors:[["ng-component"]],decls:92,vars:13,consts:[[1,"demo-content"],[1,"demo-layout__row"],[1,"demo-container",2,"align-items","center","padding","6px"],[1,"demo-container"],["disabled",""],["alignEnd",""],[3,"example"],[1,"demo-content__headline"],[3,"change"],["mdc-button","",3,"click"],["demoformfield",""],["name","demoswitch",3,"ngModel","ngModelChange"],["demoswitch",""],["id","demoForm"],["demoForm","ngForm"],["ngModel","","name","demoSwitch"],["demoSwitch","","demoSwitchModel","ngModel"],[1,"custom-switch__label-left-margin"],[1,"demo-switch--custom"],[1,"custom-switch--thumb-color"],[1,"custom-switch--track-color"]],template:function(e,t){if(1&e){var c=r.Sb();r.Rb(0,"div",0),r.Rb(1,"div",1),r.Rb(2,"div",2),r.Mb(3,"mdc-switch"),r.Qb(),r.Rb(4,"div",3),r.Rb(5,"mdc-form-field"),r.Mb(6,"mdc-switch"),r.Rb(7,"label"),r.wc(8,"off/on"),r.Qb(),r.Qb(),r.Qb(),r.Rb(9,"div",3),r.Rb(10,"mdc-form-field"),r.Mb(11,"mdc-switch",4),r.Rb(12,"label"),r.wc(13,"Disabled"),r.Qb(),r.Qb(),r.Qb(),r.Rb(14,"div",3),r.Rb(15,"mdc-form-field",5),r.Mb(16,"mdc-switch"),r.Rb(17,"label"),r.wc(18,"RTL"),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Mb(19,"example-viewer",6),r.Qb(),r.Rb(20,"div",0),r.Rb(21,"h3",7),r.wc(22,"Change event"),r.Qb(),r.Rb(23,"mdc-form-field"),r.Rb(24,"mdc-switch",8),r.Zb("change",(function(e){return t.onChange(e)})),r.Qb(),r.Rb(25,"label"),r.wc(26,"off/on"),r.Qb(),r.Qb(),r.Rb(27,"p"),r.wc(28),r.Qb(),r.Mb(29,"example-viewer",6),r.Qb(),r.Rb(30,"div",0),r.Rb(31,"h3",7),r.wc(32,"ngModel"),r.Qb(),r.Rb(33,"div",1),r.Rb(34,"button",9),r.Zb("click",(function(){return r.pc(c),r.oc(41).toggle()})),r.wc(35,"Toggle"),r.Qb(),r.Rb(36,"button",9),r.Zb("click",(function(){r.pc(c);var e=r.oc(41);return e.disabled=!e.disabled})),r.wc(37),r.Qb(),r.Qb(),r.Rb(38,"mdc-form-field",null,10),r.Rb(40,"mdc-switch",11,12),r.Zb("ngModelChange",(function(e){return t.isSwitchOn=e})),r.Qb(),r.Rb(42,"label"),r.wc(43,"off/on"),r.Qb(),r.Qb(),r.Rb(44,"p"),r.wc(45),r.Qb(),r.Mb(46,"example-viewer",6),r.Qb(),r.Rb(47,"div",0),r.Rb(48,"h3",7),r.wc(49,"NgModel Form Directive"),r.Qb(),r.Rb(50,"form",13,14),r.Rb(52,"mdc-form-field"),r.Mb(53,"mdc-switch",15,16),r.Rb(56,"label"),r.wc(57,"off/on"),r.Qb(),r.Qb(),r.Qb(),r.Rb(58,"p"),r.wc(59),r.Qb(),r.Rb(60,"p"),r.wc(61),r.Qb(),r.Rb(62,"p"),r.wc(63),r.Qb(),r.Mb(64,"example-viewer",6),r.Qb(),r.Rb(65,"div",0),r.Rb(66,"h3",7),r.wc(67,"Custom"),r.Qb(),r.Rb(68,"mdc-form-field",17),r.Mb(69,"mdc-switch"),r.Rb(70,"label"),r.wc(71,"Label margin"),r.Qb(),r.Qb(),r.Mb(72,"example-viewer",6),r.Qb(),r.Rb(73,"div",0),r.Rb(74,"h3",7),r.wc(75,"Theme"),r.Qb(),r.Rb(76,"div",3),r.Rb(77,"mdc-form-field"),r.Mb(78,"mdc-switch",18),r.Rb(79,"label"),r.wc(80,"Custom Theme"),r.Qb(),r.Qb(),r.Qb(),r.Rb(81,"div",3),r.Rb(82,"mdc-form-field"),r.Mb(83,"mdc-switch",19),r.Rb(84,"label"),r.wc(85,"Thumb Color"),r.Qb(),r.Qb(),r.Qb(),r.Rb(86,"div",3),r.Rb(87,"mdc-form-field"),r.Mb(88,"mdc-switch",20),r.Rb(89,"label"),r.wc(90,"Track Color"),r.Qb(),r.Qb(),r.Qb(),r.Mb(91,"example-viewer",6),r.Qb()}if(2&e){var b=r.oc(41),o=r.oc(55);r.Bb(19),r.ic("example",t.exampleBasic),r.Bb(9),r.yc("Change value: ",t.changeEvent,""),r.Bb(1),r.ic("example",t.exampleChangeEvent),r.Bb(8),r.yc("Disabled: ",b.disabled?"On":"Off",""),r.Bb(3),r.ic("ngModel",t.isSwitchOn),r.Bb(5),r.yc("NgModel value: ",t.isSwitchOn,""),r.Bb(1),r.ic("example",t.exampleNgModel),r.Bb(13),r.yc("Dirty: ",o.dirty,""),r.Bb(2),r.yc("Touched: ",o.touched,""),r.Bb(2),r.yc("Value: ",o.value,""),r.Bb(1),r.ic("example",t.exampleNgModelForm),r.Bb(8),r.ic("example",t.exampleCustom),r.Bb(19),r.ic("example",t.exampleTheme)}},directives:[w.a,f.a,u.a,R.a,Q.k,Q.n,Q.r,Q.l,Q.m],encapsulation:2}),b)}]}],g=((l=function e(){_classCallCheck(this,e)}).\u0275mod=r.Jb({type:l}),l.\u0275inj=r.Ib({factory:function(e){return new(e||l)},imports:[[a.e.forChild(p)],a.e]}),l);c.d(t,"SwitchModule",(function(){return M}));var v,M=((v=function e(){_classCallCheck(this,e)}).\u0275mod=r.Jb({type:v}),v.\u0275inj=r.Ib({factory:function(e){return new(e||v)},imports:[[d.a,g]]}),v)},leug:function(e,t,c){"use strict";var b=c("LuDt");c.d(t,"a",(function(){return b.a}))}}]);