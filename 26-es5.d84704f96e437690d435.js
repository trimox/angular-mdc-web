function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,t){for(var s=0;s<t.length;s++){var e=t[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function _createClass(n,t,s){return t&&_defineProperties(n.prototype,t),s&&_defineProperties(n,s),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{leug:function(n,t,s){"use strict";var e=s("LuDt");s.d(t,"a",(function(){return e.a}))},q7s6:function(n,t,s){"use strict";s.r(t);var e,o,a,c,i,b=s("d2mR"),r=s("tyNb"),l=s("leug"),d=s("fXoL"),u=s("LuDt"),m=s("5l+6"),p=s("OtPg"),R=s("aXvW"),h=s("9UYg"),k=s("dkiD"),w=[{path:"",component:(c=function(){function n(){_classCallCheck(this,n)}return _createClass(n,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Snackbars",description:"Snackbars provide brief messages about app processes at the bottom of the screen.",references:[{name:"Material Design guidelines: Snackbars",url:"https://material.io/design/components/snackbars.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md"}],code:"import {MdcSnackbarModule} from '@angular-mdc/web';",sass:"@use '@material/snackbar/mdc-snackbar';\n@use '@material/snackbar';"}}}]),n}(),c.\u0275fac=function(n){return new(n||c)},c.\u0275cmp=d.Fb({type:c,selectors:[["ng-component"]],viewQuery:function(n,t){var s;1&n&&d.tc(l.a,!0),2&n&&d.nc(s=d.ac())&&(t._componentViewer=s.first)},decls:1,vars:0,template:function(n,t){1&n&&d.Mb(0,"component-viewer")},directives:[u.a],encapsulation:2}),c),children:[{path:"",redirectTo:"api"},{path:"api",component:(a=function n(){_classCallCheck(this,n)},a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=d.Fb({type:a,selectors:[["ng-component"]],decls:103,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],["mdcSubtitle2",""],["highlight","/** Event that is emitted when a snackbar is dismissed. */\nexport interface MdcSnackbarDismissReason {\n  /** Whether the snackbar was dismissed using the action button. */\n  action: boolean;\n\n  /** Whether the snackbar was dismissed using the dismiss icon button. */\n  dismiss: boolean;\n}"]],template:function(n,t){1&n&&(d.Rb(0,"div",0),d.Rb(1,"h2",1),d.wc(2,"Service"),d.Qb(),d.Rb(3,"h3",1),d.wc(4,"MdcSnackbar"),d.Qb(),d.wc(5," Service to open MDC snackbars. "),d.Rb(6,"h4",2),d.wc(7,"Properties"),d.Qb(),d.Rb(8,"table"),d.Rb(9,"thead"),d.Rb(10,"tr"),d.Rb(11,"th"),d.wc(12,"Name"),d.Qb(),d.Rb(13,"th"),d.wc(14,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(15,"tbody"),d.Rb(16,"tr"),d.Rb(17,"td"),d.wc(18,"afterDismiss: Observable "),d.Rb(19,"pre"),d.wc(20,"MdcSnackbarDismissReason"),d.Qb(),d.Qb(),d.Rb(21,"td"),d.wc(22,"Gets an observable that is notified when the snackbar is finished closing. "),d.Rb(23,"pre"),d.Mb(24,"code",3),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(25,"h4",2),d.wc(26,"Methods"),d.Qb(),d.Rb(27,"table"),d.Rb(28,"tbody"),d.Rb(29,"tr"),d.Rb(30,"td"),d.wc(31,"open(message: string)"),d.Qb(),d.Rb(32,"td"),d.wc(33,"Open snackbar with message."),d.Qb(),d.Qb(),d.Rb(34,"tr"),d.Rb(35,"td"),d.wc(36,"open(message: string, action: string)"),d.Qb(),d.Rb(37,"td"),d.wc(38,"Opens snackbar message and action."),d.Qb(),d.Qb(),d.Rb(39,"tr"),d.Rb(40,"td"),d.wc(41,"open(message: string, action: string, config?: MdcSnackbarConfig)"),d.Qb(),d.Rb(42,"td"),d.wc(43,"Opens the snackbar with optional configuration."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(44,"h4",2),d.wc(45,"MdcSnackbarConfig"),d.Qb(),d.Rb(46,"table"),d.Rb(47,"tbody"),d.Rb(48,"tr"),d.Rb(49,"td"),d.wc(50,"timeoutMs?: number"),d.Qb(),d.Rb(51,"td"),d.wc(52,"Value must be between 4000 and 10000 or an error will be thrown. Defaults to 5000 (5 seconds)."),d.Qb(),d.Qb(),d.Rb(53,"tr"),d.Rb(54,"td"),d.wc(55,"stacked?: boolean"),d.Qb(),d.Rb(56,"td"),d.wc(57,"Positions the action button/icon below the label instead of alongside it. Defaults to false."),d.Qb(),d.Qb(),d.Rb(58,"tr"),d.Rb(59,"td"),d.wc(60,"leading?: boolean"),d.Qb(),d.Rb(61,"td"),d.wc(62,"Positions the snackbar on the leading edge of the screen."),d.Qb(),d.Qb(),d.Rb(63,"tr"),d.Rb(64,"td"),d.wc(65,"trailing?: boolean"),d.Qb(),d.Rb(66,"td"),d.wc(67,"Positions the snackbar on the trailing (right) edge of the screen."),d.Qb(),d.Qb(),d.Rb(68,"tr"),d.Rb(69,"td"),d.wc(70,"direction?: string"),d.Qb(),d.Rb(71,"td"),d.wc(72,"The layout direction of the snackbar content. Default is 'ltr'."),d.Qb(),d.Qb(),d.Rb(73,"tr"),d.Rb(74,"td"),d.wc(75,"dismiss?: boolean"),d.Qb(),d.Rb(76,"td"),d.wc(77,'Show dismiss ("X") icon. Default is false.'),d.Qb(),d.Qb(),d.Rb(78,"tr"),d.Rb(79,"td"),d.wc(80,"closeOnEscape?: boolean"),d.Qb(),d.Rb(81,"td"),d.wc(82,"Whether the snackbar closes when it is focused and the user presses the ESC key. Default is true."),d.Qb(),d.Qb(),d.Rb(83,"tr"),d.Rb(84,"td"),d.wc(85,"classes?: string | string[]"),d.Qb(),d.Rb(86,"td"),d.wc(87,"Add a CSS class or an array of classes."),d.Qb(),d.Qb(),d.Rb(88,"tr"),d.Rb(89,"td"),d.wc(90,"actionClasses?: string | string[]"),d.Qb(),d.Rb(91,"td"),d.wc(92,"Add a CSS class or an array of classes to the action button."),d.Qb(),d.Qb(),d.Rb(93,"tr"),d.Rb(94,"td"),d.wc(95,"dismissClasses?: string | string[]"),d.Qb(),d.Rb(96,"td"),d.wc(97,"Add a CSS class or an array of classes to the action icon."),d.Qb(),d.Qb(),d.Rb(98,"tr"),d.Rb(99,"td"),d.wc(100,"politeness?: AriaLivePoliteness"),d.Qb(),d.Rb(101,"td"),d.wc(102,"The politeness level for the screen reader announcement. Default is 'polite'"),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb())},directives:[m.i,m.l,p.b],encapsulation:2}),a)},{path:"sass",component:(o=function n(){_classCallCheck(this,n)},o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=d.Fb({type:o,selectors:[["ng-component"]],decls:83,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(n,t){1&n&&(d.Rb(0,"div",0),d.Rb(1,"h4",1),d.wc(2,"Sass Mixins"),d.Qb(),d.Rb(3,"table"),d.Rb(4,"thead"),d.Rb(5,"tr"),d.Rb(6,"th"),d.wc(7,"Mixin"),d.Qb(),d.Rb(8,"th"),d.wc(9,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(10,"tbody"),d.Rb(11,"tr"),d.Rb(12,"td"),d.Rb(13,"code"),d.wc(14,"fill-color($color)"),d.Qb(),d.Qb(),d.Rb(15,"td"),d.wc(16,"Sets the fill color of the snackbar."),d.Qb(),d.Qb(),d.Rb(17,"tr"),d.Rb(18,"td"),d.Rb(19,"code"),d.wc(20,"label-ink-color($color)"),d.Qb(),d.Qb(),d.Rb(21,"td"),d.wc(22,"Sets the color of the snackbar's label text."),d.Qb(),d.Qb(),d.Rb(23,"tr"),d.Rb(24,"td"),d.Rb(25,"code"),d.wc(26,"shape-radius($radius, $rtl-reflexive)"),d.Qb(),d.Qb(),d.Rb(27,"td"),d.wc(28,"Sets the rounded shape to snackbar surface with given radius size. Set "),d.Rb(29,"code"),d.wc(30,"$rtl-reflexive"),d.Qb(),d.wc(31," to true to flip radius values in RTL context, defaults to false."),d.Qb(),d.Qb(),d.Rb(32,"tr"),d.Rb(33,"td"),d.Rb(34,"code"),d.wc(35,"min-width($min-width, $mobile-breakpoint)"),d.Qb(),d.Qb(),d.Rb(36,"td"),d.wc(37,"Sets the "),d.Rb(38,"code"),d.wc(39,"min-width"),d.Qb(),d.wc(40," of the surface on tablet/desktop devices. On mobile, the width is automatically set to 100%."),d.Qb(),d.Qb(),d.Rb(41,"tr"),d.Rb(42,"td"),d.Rb(43,"code"),d.wc(44,"max-width($max-width)"),d.Qb(),d.Qb(),d.Rb(45,"td"),d.wc(46,"Sets the "),d.Rb(47,"code"),d.wc(48,"max-width"),d.Qb(),d.wc(49," of the snackbar."),d.Qb(),d.Qb(),d.Rb(50,"tr"),d.Rb(51,"td"),d.Rb(52,"code"),d.wc(53,"elevation($z-index)"),d.Qb(),d.Qb(),d.Rb(54,"td"),d.wc(55,"Sets the elevation of the snackbar."),d.Qb(),d.Qb(),d.Rb(56,"tr"),d.Rb(57,"td"),d.Rb(58,"code"),d.wc(59,"viewport-margin($margin)"),d.Qb(),d.Qb(),d.Rb(60,"td"),d.wc(61,"Sets the distance between the snackbar and the viewport."),d.Qb(),d.Qb(),d.Rb(62,"tr"),d.Rb(63,"td"),d.Rb(64,"code"),d.wc(65,"z-index($z-index)"),d.Qb(),d.Qb(),d.Rb(66,"td"),d.wc(67,"Sets the "),d.Rb(68,"code"),d.wc(69,"z-index"),d.Qb(),d.wc(70," of the snackbar."),d.Qb(),d.Qb(),d.Rb(71,"tr"),d.Rb(72,"td"),d.Rb(73,"code"),d.wc(74,"position-leading()"),d.Qb(),d.Qb(),d.Rb(75,"td"),d.wc(76,"Positions the snackbar on the leading edge of the screen (left in LTR, right in RTL) instead of centered."),d.Qb(),d.Qb(),d.Rb(77,"tr"),d.Rb(78,"td"),d.Rb(79,"code"),d.wc(80,"layout-stacked()"),d.Qb(),d.Qb(),d.Rb(81,"td"),d.wc(82,"Positions the action button/icon below the label instead of alongside it."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb())},directives:[m.l],encapsulation:2}),o)},{path:"examples",component:(e=function(){function n(t){_classCallCheck(this,n),this.snackbar=t,this.exampleHeader="import { MdcSnackbar } from '@angular-mdc/web';\n\n@Component({ templateUrl: './examples.html' })\nexport class Examples {\n  constructor(private snackbar: MdcSnackbar) { }\n",this.exampleCustomTS="import { MdcSnackbar } from '@angular-mdc/web';\n\ninterface CustomClasses {\n  classes: string | string[];\n  actionClasses: string | string[];\n  dismissClasses: string | string[];\n}\n\n@Component({ templateUrl: './examples.html' })\nexport class Examples {\n  constructor(private snackbar: MdcSnackbar) { }\n\n  openCustom(customClasses: CustomClasses) {\n    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {\n      dismiss: true,\n      classes: customClasses.classes,\n      actionClasses: customClasses.actionClasses,\n      dismissClasses: customClasses.dismissClasses\n    });\n  }\n}",this.exampleSnackbar={html:'<button mdc-button raised (click)="simple()">Simple</button>\n\n<button mdc-button raised (click)="withAction()">With Action</button>\n\n<button mdc-button raised (click)="dismissIcon()">Dismiss Icon</button>\n\n<button mdc-button raised (click)="dismissIconOnly()">Icon Only</button>\n\n<button mdc-button raised (click)="stacked()">Stacked</button>\n\n<button mdc-button raised (click)="maxTimeout()">Max Timeout</button>',ts:"".concat(this.exampleHeader,"\n  simple() {\n    const snackbarRef = this.snackbar.open('Marked as favorite.');\n    snackbarRef.afterDismiss().subscribe(reason => {\n      console.log(reason);\n    });\n  }\n\n  withAction() {\n    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry');\n    snackbarRef.afterDismiss().subscribe(reason => {\n      console.log(reason);\n    });\n  }\n\n  dismissIcon() {\n    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {\n      dismiss: true\n    });\n\n    snackbarRef.afterDismiss().subscribe(reason => {\n      console.log(reason);\n    });\n  }\n\n  dismissIconOnly() {\n    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, undefined, {\n      dismiss: true\n    });\n  }\n\n  stacked() {\n    const snackbarRef = this.snackbar.open(\n      `This item already has the label \"travel\". You can add a new label.`,\n      'Add a new label', {\n        stacked: true,\n        dismiss: true\n      });\n\n    snackbarRef.afterDismiss().subscribe(reason => {\n      console.log(reason);\n    });\n  }\n\n  maxTimeout() {\n    const snackbarRef = this.snackbar.open(`Can't send photo. Retry in 10 seconds.`, 'Retry', {\n      timeoutMs: 10000\n    });\n\n    snackbarRef.afterDismiss().subscribe(reason => {\n      console.log(reason);\n    });\n  }\n}")},this.exampleAlign={html:'<button mdc-button raised (click)="openLeading()">Leading</button>\n\n<button mdc-button raised (click)="openTrailing()">Trailing</button>\n\n<button mdc-button raised (click)="openRtl()">RTL</button>',ts:"".concat(this.exampleHeader,"\n  openLeading(): void {\n    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {\n      leading: true\n    });\n  }\n\n  openTrailing(): void {\n    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {\n      trailing: true\n    });\n  }\n\n  openRtl(): void {\n    this.snackbar.open('My content is right to left', 'Ok', {\n      direction: 'rtl'\n    });\n  }\n}")},this.exampleCustom={html:"<button mdc-button raised (click)=\"openCustom({classes: 'custom-snackbar--shape-radius'})\">Shaped</button>\n\n<button mdc-button raised (click)=\"openCustom({classes: 'custom-snackbar--elevation'})\">Elevation</button>\n\n<button mdc-button raised (click)=\"openCustom({classes: 'custom-snackbar--viewport-margin'})\">Viewport Margin</button>\n\n<button mdc-button raised (click)=\"openCustom({classes: 'custom-snackbar--max-width'})\">Max-Width</button>\n\n<button mdc-button raised (click)=\"openCustom({classes: 'custom-snackbar--min-width'})\">Min-Width</button>",ts:"import { MdcSnackbar } from '@angular-mdc/web';\n\ninterface CustomClasses {\n  classes: string | string[];\n  actionClasses: string | string[];\n  dismissClasses: string | string[];\n}\n\n@Component({ templateUrl: './examples.html' })\nexport class Examples {\n  constructor(private snackbar: MdcSnackbar) { }\n\n  openCustom(customClasses: CustomClasses) {\n    this.snackbar.open(`Can't send photo. Retry in 5 seconds.`, 'Retry', {\n      dismiss: true,\n      classes: customClasses.classes\n    });\n  }\n}",sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_snackbar.scss"},this.exampleTheme={html:"<button mdc-button raised\n  (click)=\"openCustom({classes: 'custom-snackbar--fill-color'})\">Fill Color</button>\n\n<button mdc-button raised\n  (click)=\"openCustom({classes: 'custom-snackbar--label-ink-color'})\">Ink Color</button>\n\n<button mdc-button raised\n  (click)=\"openCustom({classes: ['custom-snackbar--fill-color', 'custom-snackbar--label-ink-color']})\">Fill/Ink Color</button>\n\n<button mdc-button raised\n  (click)=\"openCustom({actionClasses: 'mdc-button--outlined'})\">Action Outlined</button>\n\n<button mdc-button raised\n  (click)=\"openCustom({dismissClasses: 'demo-icon-button-custom'})\">Custom Dismiss Icon</button>",ts:this.exampleCustomTS,sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_snackbar.scss"}}return _createClass(n,[{key:"simple",value:function(){this.snackbar.open("Marked as favorite.").afterDismiss().subscribe((function(n){console.log("The snack-bar was dismissed: ".concat(n))}))}},{key:"withAction",value:function(){this.snackbar.open("Can't send photo. Retry in 5 seconds.","Retry").afterDismiss().subscribe((function(n){console.log("The snack-bar was dismissed: ".concat(n))}))}},{key:"dismissIcon",value:function(){this.snackbar.open("Can't send photo. Retry in 5 seconds.","Retry",{dismiss:!0}).afterDismiss().subscribe((function(n){console.log("The snack-bar was dismissed: ".concat(n))}))}},{key:"dismissIconOnly",value:function(){this.snackbar.open("Can't send photo. Retry in 5 seconds.",void 0,{dismiss:!0})}},{key:"stacked",value:function(){this.snackbar.open('This item already has the label "travel". You can add a new label.',"Add a new label",{stacked:!0,dismiss:!0}).afterDismiss().subscribe((function(n){console.log("The snack-bar was dismissed: ".concat(n))}))}},{key:"maxTimeout",value:function(){this.snackbar.open("Can't send photo. Retry in 10 seconds.","Retry",{timeoutMs:1e4}).afterDismiss().subscribe((function(n){console.log("The snack-bar was dismissed: ".concat(n))}))}},{key:"openLeading",value:function(){this.snackbar.open("Can't send photo. Retry in 5 seconds.","Retry",{leading:!0})}},{key:"openTrailing",value:function(){this.snackbar.open("Can't send photo. Retry in 5 seconds.","Retry",{trailing:!0})}},{key:"openRtl",value:function(){this.snackbar.open("My content is right to left","Ok",{direction:"rtl"})}},{key:"openCustom",value:function(n){this.snackbar.open("Can't send photo. Retry in 5 seconds.","Retry",{dismiss:!0,classes:n.classes,actionClasses:n.actionClasses,dismissClasses:n.dismissClasses})}}]),n}(),e.\u0275fac=function(n){return new(n||e)(d.Lb(R.a))},e.\u0275cmp=d.Fb({type:e,selectors:[["ng-component"]],decls:73,vars:4,consts:[[1,"demo-content"],[1,"demo-layout__row"],[1,"demo-container"],["mdc-button","","raised","",3,"click"],[3,"example"],[1,"demo-content__headline"]],template:function(n,t){1&n&&(d.Rb(0,"div",0),d.Rb(1,"div",1),d.Rb(2,"div",2),d.Rb(3,"button",3),d.Zb("click",(function(){return t.simple()})),d.wc(4,"Simple"),d.Qb(),d.Qb(),d.Rb(5,"div",2),d.Rb(6,"button",3),d.Zb("click",(function(){return t.withAction()})),d.wc(7,"With Action"),d.Qb(),d.Qb(),d.Rb(8,"div",2),d.Rb(9,"button",3),d.Zb("click",(function(){return t.dismissIcon()})),d.wc(10,"Dismiss Icon"),d.Qb(),d.Qb(),d.Rb(11,"div",2),d.Rb(12,"button",3),d.Zb("click",(function(){return t.dismissIconOnly()})),d.wc(13,"Icon Only"),d.Qb(),d.Qb(),d.Rb(14,"div",2),d.Rb(15,"button",3),d.Zb("click",(function(){return t.stacked()})),d.wc(16,"Stacked"),d.Qb(),d.Qb(),d.Rb(17,"div",2),d.Rb(18,"button",3),d.Zb("click",(function(){return t.maxTimeout()})),d.wc(19,"Max Timeout"),d.Qb(),d.Qb(),d.Qb(),d.Mb(20,"example-viewer",4),d.Qb(),d.Rb(21,"div",0),d.Rb(22,"div",1),d.Rb(23,"div",2),d.Rb(24,"button",3),d.Zb("click",(function(){return t.openLeading()})),d.wc(25,"Leading"),d.Qb(),d.Qb(),d.Rb(26,"div",2),d.Rb(27,"button",3),d.Zb("click",(function(){return t.openTrailing()})),d.wc(28,"Trailing"),d.Qb(),d.Qb(),d.Rb(29,"div",2),d.Rb(30,"button",3),d.Zb("click",(function(){return t.openRtl()})),d.wc(31,"RTL"),d.Qb(),d.Qb(),d.Qb(),d.Mb(32,"example-viewer",4),d.Qb(),d.Rb(33,"div",0),d.Rb(34,"h3",5),d.wc(35,"Custom"),d.Qb(),d.Rb(36,"div",1),d.Rb(37,"div",2),d.Rb(38,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--shape-radius"})})),d.wc(39,"Shaped"),d.Qb(),d.Qb(),d.Rb(40,"div",2),d.Rb(41,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--elevation"})})),d.wc(42,"Elevation"),d.Qb(),d.Qb(),d.Rb(43,"div",2),d.Rb(44,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--viewport-margin"})})),d.wc(45,"Viewport Margin"),d.Qb(),d.Qb(),d.Rb(46,"div",2),d.Rb(47,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--max-width"})})),d.wc(48,"Max-Width"),d.Qb(),d.Qb(),d.Rb(49,"div",2),d.Rb(50,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--min-width"})})),d.wc(51,"Min-Width"),d.Qb(),d.Qb(),d.Qb(),d.Mb(52,"example-viewer",4),d.Qb(),d.Rb(53,"div",0),d.Rb(54,"h3",5),d.wc(55,"Theme"),d.Qb(),d.Rb(56,"div",1),d.Rb(57,"div",2),d.Rb(58,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--fill-color"})})),d.wc(59,"Fill Color"),d.Qb(),d.Qb(),d.Rb(60,"div",2),d.Rb(61,"button",3),d.Zb("click",(function(){return t.openCustom({classes:"custom-snackbar--label-ink-color"})})),d.wc(62,"Ink Color"),d.Qb(),d.Qb(),d.Rb(63,"div",2),d.Rb(64,"button",3),d.Zb("click",(function(){return t.openCustom({classes:["custom-snackbar--fill-color","custom-snackbar--label-ink-color"]})})),d.wc(65,"Fill/Ink Color"),d.Qb(),d.Qb(),d.Rb(66,"div",2),d.Rb(67,"button",3),d.Zb("click",(function(){return t.openCustom({actionClasses:"mdc-button--outlined"})})),d.wc(68,"Action Outlined"),d.Qb(),d.Qb(),d.Rb(69,"div",2),d.Rb(70,"button",3),d.Zb("click",(function(){return t.openCustom({dismissClasses:"demo-icon-button-custom"})})),d.wc(71,"Icon Color"),d.Qb(),d.Qb(),d.Qb(),d.Mb(72,"example-viewer",4),d.Qb()),2&n&&(d.Bb(20),d.ic("example",t.exampleSnackbar),d.Bb(12),d.ic("example",t.exampleAlign),d.Bb(20),d.ic("example",t.exampleCustom),d.Bb(20),d.ic("example",t.exampleTheme))},directives:[h.a,k.a],encapsulation:2}),e)}]}],Q=((i=function n(){_classCallCheck(this,n)}).\u0275mod=d.Jb({type:i}),i.\u0275inj=d.Ib({factory:function(n){return new(n||i)},imports:[[r.e.forChild(w)],r.e]}),i);s.d(t,"SnackbarModule",(function(){return g}));var f,g=((f=function n(){_classCallCheck(this,n)}).\u0275mod=d.Jb({type:f}),f.\u0275inj=d.Ib({factory:function(n){return new(n||f)},imports:[[b.a,Q]]}),f)}}]);