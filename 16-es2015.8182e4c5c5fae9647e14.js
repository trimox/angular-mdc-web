(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{leug:function(t,e,b){"use strict";var i=b("LuDt");b.d(e,"a",(function(){return i.a}))},szz2:function(t,e,b){"use strict";b.r(e);var i=b("d2mR"),n=b("tyNb"),c=b("leug"),o=b("fXoL"),d=b("5l+6"),a=b("LuDt"),s=b("9UYg"),l=b("f6B5"),r=b("+O8G"),m=b("o085"),u=b("ofXK");const p=["mdc-fab",""];function h(t,e){if(1&t&&(o.Rb(0,"mdc-icon",4),o.wc(1),o.Qb()),2&t){const t=o.dc();o.Bb(1),o.xc(t.icon)}}function f(t,e){if(1&t&&(o.Rb(0,"span",5),o.wc(1),o.Qb()),2&t){const t=o.dc();o.Bb(1),o.xc(t.label)}}function R(t,e){1&t&&o.Mb(0,"div",6)}const Q=["*"];let w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=o.Gb({type:t,selectors:[["mdc-fab-label"],["","mdcFabLabel",""]],hostAttrs:[1,"mdc-fab__label"]}),t})(),x=(()=>{class t{constructor(t,e,b){this._changeDetectionRef=t,this.elementRef=e,this._ripple=b,this._mini=!1,this._touch=!1,this._exited=!1,this._extended=!1,this._fluid=!1,this._position=null}get mini(){return this._mini}set mini(t){this._mini=Object(l.b)(t)}get touch(){return this._touch}set touch(t){this._touch=Object(l.b)(t)}get exited(){return this._exited}set exited(t){this._exited=Object(l.b)(t),this._changeDetectionRef.markForCheck()}get extended(){return this._extended}set extended(t){this._extended=Object(l.b)(t)}get fluid(){return this._fluid}set fluid(t){this._fluid=Object(l.b)(t)}get position(){return this._position}set position(t){this._position&&this._getHostElement().classList.remove(`ngx-mdc-fab--${this._convertPosition(this._position)}`),t&&this._getHostElement().classList.add(`ngx-mdc-fab--${this._convertPosition(t)}`),this._position=t}ngAfterContentInit(){this.fabIcon&&this.fabIcon.elementRef.nativeElement.classList.add("mdc-fab__icon"),this._ripple=new r.a(this.elementRef),this._ripple.init()}_convertPosition(t){switch(t){case"bottomLeft":return"bottom-left";case"bottomRight":return"bottom-right";default:return null}}ngOnDestroy(){this._ripple.destroy()}toggleExited(t){this._exited=t||!this._exited}focus(){this._getHostElement().focus()}_getHostElement(){return this.elementRef.nativeElement}}return t.\u0275fac=function(e){return new(e||t)(o.Lb(o.h),o.Lb(o.l),o.Lb(r.a))},t.\u0275cmp=o.Fb({type:t,selectors:[["button","mdc-fab",""],["a","mdc-fab",""]],contentQueries:function(t,e,b){var i;1&t&&o.Eb(b,m.b,!0),2&t&&o.nc(i=o.ac())&&(e.fabIcon=i.first)},hostAttrs:[1,"mdc-fab"],hostVars:11,hostBindings:function(t,e){2&t&&(o.Cb("tabindex",e.exited?-1:0),o.Db("mdc-fab--mini",e.mini)("mdc-fab--exited",e.exited)("mdc-fab--extended",e.extended)("ngx-mdc-fab-extended--fluid",e.fluid)("mdc-fab--touch",e.touch&&e.mini))},inputs:{mini:"mini",touch:"touch",exited:"exited",extended:"extended",fluid:"fluid",position:"position",label:"label",icon:"icon"},features:[o.Ab([r.a])],attrs:p,ngContentSelectors:Q,decls:5,vars:3,consts:[[1,"mdc-fab__ripple"],["class","mdc-fab__icon",4,"ngIf"],["class","mdc-fab__label",4,"ngIf"],["class","mdc-fab__touch",4,"ngIf"],[1,"mdc-fab__icon"],[1,"mdc-fab__label"],[1,"mdc-fab__touch"]],template:function(t,e){1&t&&(o.hc(),o.Mb(0,"div",0),o.gc(1),o.uc(2,h,2,1,"mdc-icon",1),o.uc(3,f,2,1,"span",2),o.uc(4,R,1,0,"div",3)),2&t&&(o.Bb(2),o.ic("ngIf",e.icon),o.Bb(1),o.ic("ngIf",e.label),o.Bb(1),o.ic("ngIf",e.touch&&e.mini))},directives:[u.k,m.b],encapsulation:2,changeDetection:0}),t})();var g=b("dkiD");let v=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Fb({type:t,selectors:[["ng-component"]],decls:78,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""]],template:function(t,e){1&t&&(o.Rb(0,"div",0),o.Rb(1,"h3",1),o.wc(2,"MdcFab"),o.Qb(),o.Rb(3,"p"),o.wc(4," Selector: "),o.Rb(5,"span",2),o.wc(6,"button[mdc-fab]"),o.Qb(),o.Rb(7,"span",2),o.wc(8,"a[mdc-fab]"),o.Qb(),o.Qb(),o.wc(9," Exported as: "),o.Rb(10,"span",2),o.wc(11,"mdcFab"),o.Qb(),o.Rb(12,"h4",3),o.wc(13,"Properties"),o.Qb(),o.Rb(14,"table"),o.Rb(15,"thead"),o.Rb(16,"tr"),o.Rb(17,"th"),o.wc(18,"Name"),o.Qb(),o.Rb(19,"th"),o.wc(20,"Description"),o.Qb(),o.Qb(),o.Qb(),o.Rb(21,"tbody"),o.Rb(22,"tr"),o.Rb(23,"td"),o.wc(24,"mini: boolean"),o.Qb(),o.Rb(25,"td"),o.wc(26,"Make the fab smaller (40 x 40 pixels)."),o.Qb(),o.Qb(),o.Rb(27,"tr"),o.Rb(28,"td"),o.wc(29,"exited: boolean"),o.Qb(),o.Rb(30,"td"),o.wc(31,"Animates the FAB in or out of view."),o.Qb(),o.Qb(),o.Rb(32,"tr"),o.Rb(33,"td"),o.wc(34,"extended: boolean"),o.Qb(),o.Rb(35,"td"),o.wc(36,"Modifies the FAB to wider size which includes a text label."),o.Qb(),o.Qb(),o.Rb(37,"tr"),o.Rb(38,"td"),o.wc(39,"fluid: boolean"),o.Qb(),o.Rb(40,"td"),o.wc(41,"Makes the Extended FAB fluid to container, such as screen width or the layout grid."),o.Qb(),o.Qb(),o.Rb(42,"tr"),o.Rb(43,"td"),o.wc(44,"label: string"),o.Qb(),o.Rb(45,"td"),o.wc(46,"Optional, for the text label. Applicable only for Extended FAB."),o.Qb(),o.Qb(),o.Rb(47,"tr"),o.Rb(48,"td"),o.wc(49,"position: string"),o.Qb(),o.Rb(50,"td"),o.wc(51,"Set the fab absolute position. "),o.Rb(52,"p"),o.wc(53,"Valid values: 'bottomLeft' | 'bottomRight'"),o.Qb(),o.Qb(),o.Qb(),o.Rb(54,"tr"),o.Rb(55,"td"),o.wc(56,"icon: string"),o.Qb(),o.Rb(57,"td"),o.wc(58,"Optional. Apply a Material Icon."),o.Qb(),o.Qb(),o.Rb(59,"tr"),o.Rb(60,"td"),o.wc(61,"touch: boolean"),o.Qb(),o.Rb(62,"td"),o.wc(63,"Set the mini fab touch target to 48 x 48 px. Only applies if FAB is set to mini as well."),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Rb(64,"h4",3),o.wc(65,"Methods"),o.Qb(),o.Rb(66,"table"),o.Rb(67,"tbody"),o.Rb(68,"tr"),o.Rb(69,"td"),o.wc(70,"toggleExited(exited?: boolean)"),o.Qb(),o.Rb(71,"td"),o.wc(72,"Toggle the fab animation in and out."),o.Qb(),o.Qb(),o.Rb(73,"tr"),o.Rb(74,"td"),o.wc(75,"focus()"),o.Qb(),o.Rb(76,"td"),o.wc(77,"Focuses the button."),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Qb())},directives:[d.i,d.l],encapsulation:2}),t})(),_=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Fb({type:t,selectors:[["ng-component"]],decls:116,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(t,e){1&t&&(o.Rb(0,"div",0),o.Rb(1,"h4",1),o.wc(2,"Basic Sass Mixins"),o.Qb(),o.Rb(3,"p"),o.wc(4,"MDC FAB uses MDC Theme's secondary color by default. Use the following mixins to customize it."),o.Qb(),o.Rb(5,"table"),o.Rb(6,"thead"),o.Rb(7,"tr"),o.Rb(8,"th"),o.wc(9,"Mixin"),o.Qb(),o.Rb(10,"th"),o.wc(11,"Description"),o.Qb(),o.Qb(),o.Qb(),o.Rb(12,"tbody"),o.Rb(13,"tr"),o.Rb(14,"td"),o.Rb(15,"code"),o.wc(16,"accessible($container-color)"),o.Qb(),o.Qb(),o.Rb(17,"td"),o.wc(18,"Changes the FAB's container color to the given color, and updates the FAB's ink and ripple color to meet accessibility standards."),o.Qb(),o.Qb(),o.Rb(19,"tr"),o.Rb(20,"td"),o.Rb(21,"code"),o.wc(22,"extended-fluid"),o.Qb(),o.Qb(),o.Rb(23,"td"),o.wc(24,"Makes the Extended FAB fluid to container, such as screen width or the layout grid. Exposed as a mixin to support use within "),o.Rb(25,"code"),o.wc(26,"@media"),o.Qb(),o.wc(27," queries."),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Rb(28,"h4",1),o.wc(29,"Advanced Sass Mixins"),o.Qb(),o.Rb(30,"table"),o.Rb(31,"thead"),o.Rb(32,"tr"),o.Rb(33,"th"),o.wc(34,"Mixin"),o.Qb(),o.Rb(35,"th"),o.wc(36,"Description"),o.Qb(),o.Qb(),o.Qb(),o.Rb(37,"tbody"),o.Rb(38,"tr"),o.Rb(39,"td"),o.Rb(40,"code"),o.wc(41,"container-color($color)"),o.Qb(),o.Qb(),o.Rb(42,"td"),o.wc(43,"Sets the container color to the given color"),o.Qb(),o.Qb(),o.Rb(44,"tr"),o.Rb(45,"td"),o.Rb(46,"code"),o.wc(47,"icon-size($width, $height)"),o.Qb(),o.Qb(),o.Rb(48,"td"),o.wc(49,"Sets the icon "),o.Rb(50,"code"),o.wc(51,"width"),o.Qb(),o.wc(52,", "),o.Rb(53,"code"),o.wc(54,"height"),o.Qb(),o.wc(55,", and "),o.Rb(56,"code"),o.wc(57,"font-size"),o.Qb(),o.wc(58," properties to the specified "),o.Rb(59,"code"),o.wc(60,"width"),o.Qb(),o.wc(61," and "),o.Rb(62,"code"),o.wc(63,"height"),o.Qb(),o.wc(64,". "),o.Rb(65,"code"),o.wc(66,"$height"),o.Qb(),o.wc(67," is optional and will default to "),o.Rb(68,"code"),o.wc(69,"$width"),o.Qb(),o.wc(70," if omitted. The "),o.Rb(71,"code"),o.wc(72,"font-size"),o.Qb(),o.wc(73," will be set to the provided "),o.Rb(74,"code"),o.wc(75,"$width"),o.Qb(),o.wc(76," value."),o.Qb(),o.Qb(),o.Rb(77,"tr"),o.Rb(78,"td"),o.Rb(79,"code"),o.wc(80,"ink-color($color)"),o.Qb(),o.Qb(),o.Rb(81,"td"),o.wc(82,"Sets the ink color to the given color"),o.Qb(),o.Qb(),o.Rb(83,"tr"),o.Rb(84,"td"),o.Rb(85,"code"),o.wc(86,"extended-padding($icon-padding, $label-padding)"),o.Qb(),o.Qb(),o.Rb(87,"td"),o.wc(88,"Sets the padding on both sides of the icon, and between the label and the edge of the FAB. In cases where there is no icon, "),o.Rb(89,"code"),o.wc(90,"$label-padding"),o.Qb(),o.wc(91," will apply to both sides."),o.Qb(),o.Qb(),o.Rb(92,"tr"),o.Rb(93,"td"),o.Rb(94,"code"),o.wc(95,"extended-label-padding($label-padding)"),o.Qb(),o.Qb(),o.Rb(96,"td"),o.wc(97,"Sets the label side padding for Extended FAB. Useful when styling an Extended FAB with no icon."),o.Qb(),o.Qb(),o.Rb(98,"tr"),o.Rb(99,"td"),o.Rb(100,"code"),o.wc(101,"shape-radius($radius, $rtl-reflexive)"),o.Qb(),o.Qb(),o.Rb(102,"td"),o.wc(103,"Sets rounded shape to only regular & mini FAB variants with given radius size. Set "),o.Rb(104,"code"),o.wc(105,"$rtl-reflexive"),o.Qb(),o.wc(106," to true to flip radius values in RTL context, defaults to false."),o.Qb(),o.Qb(),o.Rb(107,"tr"),o.Rb(108,"td"),o.Rb(109,"code"),o.wc(110,"extended-shape-radius($radius, $rtl-reflexive)"),o.Qb(),o.Qb(),o.Rb(111,"td"),o.wc(112,"Sets rounded shape to only Extended FAB variant with given radius size. Set "),o.Rb(113,"code"),o.wc(114,"$rtl-reflexive"),o.Qb(),o.wc(115," to true to flip radius values in RTL context, defaults to false."),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Qb())},directives:[d.l],encapsulation:2}),t})();const y=[{path:"",component:(()=>{class t{ngOnInit(){this._componentViewer.template={title:"Floating Action Button",description:"A floating action button represents the primary action in an application.",references:[{name:"Material Design guidelines: Floating Action Button",url:"https://material.io/design/components/buttons-floating-action-button.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-fab/README.md"}],code:"import {MdcFabModule} from '@angular-mdc/web';",sass:"@use '@material/fab/mdc-fab';\n@use '@material/fab';"}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Fb({type:t,selectors:[["ng-component"]],viewQuery:function(t,e){var b;1&t&&o.tc(c.a,!0),2&t&&o.nc(b=o.ac())&&(e._componentViewer=b.first)},decls:1,vars:0,template:function(t,e){1&t&&o.Mb(0,"component-viewer")},directives:[a.a],encapsulation:2}),t})(),children:[{path:"",redirectTo:"api"},{path:"api",component:v},{path:"sass",component:_},{path:"examples",component:(()=>{class t{constructor(){this.example1={html:"<button mdc-fab>\n  <mdc-icon>edit</mdc-icon>\n</button>"},this.exampleMini={html:"<button mdc-fab mini>\n  <mdc-icon>edit</mdc-icon>\n</button>"},this.exampleFA={html:'<button mdc-fab>\n  <mdc-icon fontSet="fa" fontIcon="fa-keyboard-o"></mdc-icon>\n</button>'},this.exampleShaped={html:'<button mdc-fab class="demo-fab-shaped--one">\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdc-fab mini class="demo-fab-shaped--two">\n  <mdc-icon>favorite_border</mdc-icon>\n</button>\n\n<button mdc-fab class="demo-fab-shape-radius">\n  <mdc-icon>favorite_border</mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss"},this.exampleTheme={html:'<button mdc-fab class="red800Fab" icon="edit"></button>\n\n<button mdc-fab class="yellow800Fab" icon="edit"></button>\n\n<button mdc-fab class="purple500Fab" icon="edit"></button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss"},this.exampleExtended={html:'<button mdc-fab extended icon="add_shopping_cart" label="Add to cart" class="blackFab"></button>\n\n<button mdc-fab extended label="Create" class="blackFab"></button>\n\n<button mdc-fab extended label="Save Changes" class="purple500Fab">\n  <mdc-icon>save</mdc-icon>\n</button>\n\n<button mdc-fab extended>\n  <mdc-fab-label>Create</mdc-fab-label>\n  <mdc-icon>add</mdc-icon>\n</button>\n\n<button mdc-fab extended class="demo-fab-extended-shape-radius">\n  <mdc-fab-label>Shaped</mdc-fab-label>\n  <mdc-icon>add</mdc-icon>\n</button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss"},this.exampleExtendedFluid={html:'<button mdc-fab extended fluid label="Add to cart">\n  <mdc-icon>add_shopping_cart</mdc-icon>\n</button>'},this.exampleExited={html:'<button mdc-fab #exited (click)="exited.toggleExited()">\n  <mdc-icon>save</mdc-icon>\n</button>'},this.exampleCustom={html:'<button mdc-fab class="demo-fab-icon-size" icon="edit"></button>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_fab.scss"},this.examplePosition={html:"<button mdc-fab position='bottomRight' icon=\"add\"></button>"},this.exampleAccessibility={html:'<div class="mdc-touch-target-wrapper">\n  <button mdc-fab mini touch>\n    <mdc-icon>edit</mdc-icon>\n  </button>\n</div>'}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Fb({type:t,selectors:[["ng-component"]],decls:140,vars:16,consts:[[1,"demo-content"],[1,"demo-content__headline"],[1,"demo-layout__row"],["mdc-button","",3,"click"],["mdc-fab",""],["demofab",""],[3,"example"],["demoFA",""],["fontSet","fa","fontIcon","fa-keyboard-o"],["mdc-fab","","mini",""],[1,"demo-container"],["mdc-fab","","extended","","icon","add_shopping_cart","label","Add to cart",1,"blackFab"],["mdc-fab","","extended","","label","Create",1,"blackFab"],["mdc-fab","","extended","","label","Save Changes",1,"purple500Fab"],["mdc-fab","","extended",""],["mdc-fab","","extended","",1,"demo-fab-extended-shape-radius"],["mdc-fab","","extended","","fluid","","label","Add to cart"],["extended",""],["mdc-fab","",3,"click"],["exited",""],["mdc-fab","",1,"demo-fab-shaped--one"],["mdc-fab","","mini","",1,"demo-fab-shaped--two"],["mdc-fab","",1,"demo-fab-shape-radius"],["mdc-fab","","icon","edit",1,"red800Fab"],["mdc-fab","","icon","edit",1,"yellow800Fab"],["mdc-fab","","icon","edit",1,"purple500Fab"],["mdc-fab","","icon","edit",1,"demo-fab-icon-size"],["mdc-fab","","position","bottomRight","icon","add",1,"demo-fab-position-zindex"],["demoPosition",""],[1,"mdc-touch-target-wrapper"],["mdc-fab","","mini","","touch",""]],template:function(t,e){if(1&t){const t=o.Sb();o.Rb(0,"div",0),o.Rb(1,"h3",1),o.wc(2,"FAB"),o.Qb(),o.Rb(3,"div",2),o.Rb(4,"button",3),o.Zb("click",(function(){o.pc(t);const e=o.oc(7);return e.mini=!e.mini})),o.wc(5),o.Qb(),o.Qb(),o.Rb(6,"button",4,5),o.Rb(8,"mdc-icon"),o.wc(9,"edit"),o.Qb(),o.Qb(),o.Mb(10,"example-viewer",6),o.Qb(),o.Rb(11,"div",0),o.Rb(12,"h3",1),o.wc(13,"Using Font Awesome"),o.Qb(),o.Rb(14,"div",2),o.Rb(15,"button",3),o.Zb("click",(function(){o.pc(t);const e=o.oc(18);return e.mini=!e.mini})),o.wc(16),o.Qb(),o.Qb(),o.Rb(17,"button",4,7),o.Mb(19,"mdc-icon",8),o.Qb(),o.Mb(20,"example-viewer",6),o.Qb(),o.Rb(21,"div",0),o.Rb(22,"h3",1),o.wc(23,"Mini"),o.Qb(),o.Rb(24,"button",9),o.Rb(25,"mdc-icon"),o.wc(26,"edit"),o.Qb(),o.Qb(),o.Mb(27,"example-viewer",6),o.Qb(),o.Rb(28,"div",0),o.Rb(29,"h3",1),o.wc(30,"Extended FAB"),o.Qb(),o.Rb(31,"div",2),o.Rb(32,"div",10),o.Mb(33,"button",11),o.Qb(),o.Rb(34,"div",10),o.Mb(35,"button",12),o.Qb(),o.Rb(36,"div",10),o.Rb(37,"button",13),o.Rb(38,"mdc-icon"),o.wc(39,"save"),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Rb(40,"div",2),o.Rb(41,"div",10),o.Rb(42,"button",14),o.Rb(43,"mdc-fab-label"),o.wc(44,"Create"),o.Qb(),o.Rb(45,"mdc-icon"),o.wc(46,"add"),o.Qb(),o.Qb(),o.Qb(),o.Rb(47,"div",10),o.Rb(48,"button",15),o.Rb(49,"mdc-fab-label"),o.wc(50,"Shaped"),o.Qb(),o.Rb(51,"mdc-icon"),o.wc(52,"add"),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Mb(53,"example-viewer",6),o.Qb(),o.Rb(54,"div",0),o.Rb(55,"h3",1),o.wc(56,"Extended FAB (Fluid)"),o.Qb(),o.Rb(57,"div",2),o.Rb(58,"button",3),o.Zb("click",(function(){o.pc(t);const e=o.oc(62);return e.fluid=!e.fluid})),o.wc(59),o.Qb(),o.Qb(),o.Rb(60,"div",2),o.Rb(61,"button",16,17),o.Rb(63,"mdc-icon"),o.wc(64,"add_shopping_cart"),o.Qb(),o.Qb(),o.Qb(),o.Mb(65,"example-viewer",6),o.Qb(),o.Rb(66,"div",0),o.Rb(67,"h3",1),o.wc(68,"Exit/Entry Animation"),o.Qb(),o.Rb(69,"div",2),o.Rb(70,"button",3),o.Zb("click",(function(){return o.pc(t),o.oc(75).toggleExited()})),o.wc(71,"Toggle Exited"),o.Qb(),o.Rb(72,"button",3),o.Zb("click",(function(){o.pc(t);const e=o.oc(75);return e.mini=!e.mini})),o.wc(73),o.Qb(),o.Qb(),o.Rb(74,"button",18,19),o.Zb("click",(function(){return o.pc(t),o.oc(75).toggleExited()})),o.Rb(76,"mdc-icon"),o.wc(77,"save"),o.Qb(),o.Qb(),o.Mb(78,"example-viewer",6),o.Qb(),o.Rb(79,"div",0),o.Rb(80,"h3",1),o.wc(81,"Shaped"),o.Qb(),o.Rb(82,"div",2),o.Rb(83,"div",10),o.Rb(84,"button",20),o.Rb(85,"mdc-icon"),o.wc(86,"favorite_border"),o.Qb(),o.Qb(),o.Qb(),o.Rb(87,"div",10),o.Rb(88,"button",21),o.Rb(89,"mdc-icon"),o.wc(90,"favorite_border"),o.Qb(),o.Qb(),o.Qb(),o.Rb(91,"div",10),o.Rb(92,"button",22),o.Rb(93,"mdc-icon"),o.wc(94,"favorite_border"),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Mb(95,"example-viewer",6),o.Qb(),o.Rb(96,"div",0),o.Rb(97,"h3",1),o.wc(98,"Theme"),o.Qb(),o.Rb(99,"div",2),o.Rb(100,"div",10),o.Mb(101,"button",23),o.Qb(),o.Rb(102,"div",10),o.Mb(103,"button",24),o.Qb(),o.Rb(104,"div",10),o.Mb(105,"button",25),o.Qb(),o.Qb(),o.Mb(106,"example-viewer",6),o.Qb(),o.Rb(107,"div",0),o.Rb(108,"h3",1),o.wc(109,"Custom"),o.Qb(),o.Rb(110,"div",2),o.Rb(111,"div",10),o.Mb(112,"button",26),o.Qb(),o.Qb(),o.Mb(113,"example-viewer",6),o.Qb(),o.Rb(114,"div",0),o.Rb(115,"h3",1),o.wc(116,"Absolute Position"),o.Qb(),o.Rb(117,"div",2),o.Rb(118,"button",3),o.Zb("click",(function(){return o.pc(t),o.oc(125).position="bottomLeft"})),o.wc(119,"Bottom Left"),o.Qb(),o.Rb(120,"button",3),o.Zb("click",(function(){return o.pc(t),o.oc(125).position="bottomRight"})),o.wc(121,"Bottom Right"),o.Qb(),o.Rb(122,"button",3),o.Zb("click",(function(){o.pc(t);const e=o.oc(125);return e.mini=!e.mini})),o.wc(123),o.Qb(),o.Qb(),o.Mb(124,"button",27,28),o.Mb(126,"example-viewer",6),o.Qb(),o.Rb(127,"div",0),o.Rb(128,"h3",1),o.wc(129,"Accessibility"),o.Qb(),o.Rb(130,"p"),o.wc(131," Material Design spec advises that touch targets should be at least 48x48px. While the FAB is 48x48px by default, the mini FAB is 40x40px. To meet this requirement, add the `touch` property. "),o.Qb(),o.Rb(132,"p"),o.wc(133," Note that the outer mdc-touch-target-wrapper element is only necessary if you want to avoid potentially overlapping touch targets on adjacent elements (due to collapsing margins). "),o.Qb(),o.Rb(134,"div",2),o.Rb(135,"div",29),o.Rb(136,"button",30),o.Rb(137,"mdc-icon"),o.wc(138,"edit"),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Mb(139,"example-viewer",6),o.Qb()}if(2&t){const t=o.oc(7),b=o.oc(18),i=o.oc(62),n=o.oc(75),c=o.oc(125);o.Bb(5),o.yc("Mini: ",t.mini?"On":"Off",""),o.Bb(5),o.ic("example",e.example1),o.Bb(6),o.yc("Mini: ",b.mini?"On":"Off",""),o.Bb(4),o.ic("example",e.exampleFA),o.Bb(7),o.ic("example",e.exampleMini),o.Bb(26),o.ic("example",e.exampleExtended),o.Bb(6),o.yc("Fluid: ",i.fluid?"On":"Off",""),o.Bb(6),o.ic("example",e.exampleExtendedFluid),o.Bb(8),o.yc("Mini: ",n.mini?"On":"Off",""),o.Bb(5),o.ic("example",e.exampleExited),o.Bb(17),o.ic("example",e.exampleShaped),o.Bb(11),o.ic("example",e.exampleTheme),o.Bb(7),o.ic("example",e.exampleCustom),o.Bb(10),o.yc("Mini: ",c.mini?"On":"Off",""),o.Bb(3),o.ic("example",e.examplePosition),o.Bb(13),o.ic("example",e.exampleAccessibility)}},directives:[s.a,x,m.b,g.a,w],encapsulation:2}),t})()}]}];let F=(()=>{class t{}return t.\u0275mod=o.Jb({type:t}),t.\u0275inj=o.Ib({factory:function(e){return new(e||t)},imports:[[n.e.forChild(y)],n.e]}),t})();b.d(e,"FabModule",(function(){return M}));let M=(()=>{class t{}return t.\u0275mod=o.Jb({type:t}),t.\u0275inj=o.Ib({factory:function(e){return new(e||t)},imports:[[i.a,F]]}),t})()}}]);