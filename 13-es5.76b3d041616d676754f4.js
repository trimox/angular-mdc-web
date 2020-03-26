function _defineProperties(e,t){for(var b=0;b<t.length;b++){var a=t[b];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,b){return t&&_defineProperties(e.prototype,t),b&&_defineProperties(e,b),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{hA6M:function(e,t,b){"use strict";b.r(t),b.d(t,"DataTableModule",(function(){return x}));var a=b("d2mR"),c=b("tyNb"),n=b("leug"),d=b("fXoL"),l=b("5l+6"),o=b("OtPg"),r=b("LuDt"),s=b("OY9d"),i=b("ZemC"),R=b("ofXK"),h=b("dkiD"),w=b("uwiL");function m(e,t){if(1&e&&(d.Rb(0,"tr",11),d.Rb(1,"td",12),d.wc(2),d.Qb(),d.Rb(3,"td",13),d.wc(4),d.Qb(),d.Rb(5,"td",13),d.wc(6),d.Qb(),d.Rb(7,"td",13),d.wc(8),d.Qb(),d.Rb(9,"td",12),d.wc(10),d.Qb(),d.Qb()),2&e){var b=t.$implicit;d.Bb(2),d.xc(b.name),d.Bb(2),d.xc(b.calories),d.Bb(2),d.xc(b.carbs),d.Bb(2),d.xc(b.protein),d.Bb(2),d.xc(b.comment)}}function Q(e,t){if(1&e&&(d.Rb(0,"tr",14),d.Rb(1,"td",12),d.Mb(2,"mdc-checkbox",15),d.Qb(),d.Rb(3,"td",12),d.wc(4),d.Qb(),d.Rb(5,"td",13),d.wc(6),d.Qb(),d.Rb(7,"td",13),d.wc(8),d.Qb(),d.Rb(9,"td",13),d.wc(10),d.Qb(),d.Rb(11,"td",12),d.wc(12),d.Qb(),d.Qb()),2&e){var b=t.$implicit;d.ic("selected",b.checked),d.Bb(2),d.ic("checked",b.checked),d.Bb(2),d.xc(b.name),d.Bb(2),d.xc(b.calories),d.Bb(2),d.xc(b.carbs),d.Bb(2),d.xc(b.protein),d.Bb(2),d.xc(b.comment)}}var p,u,f,C,D,T,g=((u=function e(){_classCallCheck(this,e)}).\u0275fac=function(e){return new(e||u)},u.\u0275cmp=d.Fb({type:u,selectors:[["ng-component"]],decls:180,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""],["highlight","Array<string | null>"],["highlight","MDCDataTableRowSelectionChangedEvent {\n  index: number;\n  id: string | null;\n  selected: boolean;\n}"]],template:function(e,t){1&e&&(d.Rb(0,"div",0),d.Rb(1,"h3",1),d.wc(2,"MDCDataTable"),d.Qb(),d.Rb(3,"p"),d.wc(4," Selector: "),d.Rb(5,"span",2),d.wc(6,"mdc-data-table"),d.Qb(),d.Qb(),d.wc(7," Exported as: "),d.Rb(8,"span",2),d.wc(9,"mdcDataTable"),d.Qb(),d.Rb(10,"h4",3),d.wc(11,"Methods"),d.Qb(),d.Rb(12,"table"),d.Rb(13,"tbody"),d.Rb(14,"tr"),d.Rb(15,"td"),d.wc(16,"layoutAsync(): Promise"),d.Qb(),d.Rb(17,"td"),d.wc(18,"Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table. Use this if registering checkbox is asynchronous. "),d.Qb(),d.Qb(),d.Rb(19,"tr"),d.Rb(20,"td"),d.wc(21,"layout(): void"),d.Qb(),d.Rb(22,"td"),d.wc(23,"Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table."),d.Qb(),d.Qb(),d.Rb(24,"tr"),d.Rb(25,"td"),d.wc(26,"getHeaderCheckbox(): MdcCheckbox | undefined"),d.Qb(),d.Rb(27,"td"),d.wc(28,"Retrieve a reference to the header row checkbox."),d.Qb(),d.Qb(),d.Rb(29,"tr"),d.Rb(30,"td"),d.wc(31,"getRows(): MDCDataTableRow[]"),d.Qb(),d.Rb(32,"td"),d.wc(33,"Return an array of all MDCDataTableRow objects."),d.Qb(),d.Qb(),d.Rb(34,"tr"),d.Rb(35,"td"),d.wc(36,"getSelectedRowIds(): "),d.Rb(37,"pre"),d.Mb(38,"code",4),d.Qb(),d.Qb(),d.Rb(39,"td"),d.wc(40,"Returns array of selected row ids."),d.Qb(),d.Qb(),d.Rb(41,"tr"),d.Rb(42,"td"),d.wc(43,"setSelectedRowIds(rowIds: string[]): void"),d.Qb(),d.Rb(44,"td"),d.wc(45,"Array of row ids that needs to be selected."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(46,"h4",3),d.wc(47,"Events"),d.Qb(),d.Rb(48,"table"),d.Rb(49,"tbody"),d.Rb(50,"tr"),d.Rb(51,"td"),d.wc(52,"selectionChanged: MDCDataTableRowSelectionChangedEvent "),d.Rb(53,"pre"),d.Mb(54,"code",5),d.Qb(),d.Qb(),d.Rb(55,"td"),d.wc(56,"Event emitted when row checkbox is checked or unchecked. "),d.Qb(),d.Qb(),d.Rb(57,"tr"),d.Rb(58,"td"),d.wc(59,"selectedAll"),d.Qb(),d.Rb(60,"td"),d.wc(61,"Event emitted when header row checkbox is checked."),d.Qb(),d.Qb(),d.Rb(62,"tr"),d.Rb(63,"td"),d.wc(64,"unselectedAll"),d.Qb(),d.Rb(65,"td"),d.wc(66,"Event emitted when header row checkbox is unchecked. "),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(67,"div",0),d.Rb(68,"h3",1),d.wc(69,"MDCDataTableTable"),d.Qb(),d.wc(70," Mandatory. Table element. Added to table HTML tag. "),d.Rb(71,"p"),d.wc(72," Selector: "),d.Rb(73,"span",2),d.wc(74,"mdcDataTableTable"),d.Qb(),d.Qb(),d.wc(75," Exported as: "),d.Rb(76,"span",2),d.wc(77,"mdcDataTableTable"),d.Qb(),d.Qb(),d.Rb(78,"div",0),d.Rb(79,"h3",1),d.wc(80,"MDCDataTableHeaderRow"),d.Qb(),d.wc(81," Mandatory. Table header row element. Added to thead > tr HTML tag. "),d.Rb(82,"p"),d.wc(83," Selector: "),d.Rb(84,"span",2),d.wc(85,"mdcDataTableHeaderRow"),d.Qb(),d.Qb(),d.wc(86," Exported as: "),d.Rb(87,"span",2),d.wc(88,"mdcDataTableHeaderRow"),d.Qb(),d.Qb(),d.Rb(89,"div",0),d.Rb(90,"h3",1),d.wc(91,"MDCDataTableHeaderCell"),d.Qb(),d.Rb(92,"p"),d.wc(93," Selector: "),d.Rb(94,"span",2),d.wc(95,"mdcDataTableHeaderCell"),d.Qb(),d.Qb(),d.wc(96," Exported as: "),d.Rb(97,"span",2),d.wc(98,"mdcDataTableHeaderCell"),d.Qb(),d.Rb(99,"h4",3),d.wc(100,"Properties"),d.Qb(),d.Rb(101,"table"),d.Rb(102,"thead"),d.Rb(103,"tr"),d.Rb(104,"th"),d.wc(105,"Name"),d.Qb(),d.Rb(106,"th"),d.wc(107,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(108,"tbody"),d.Rb(109,"tr"),d.Rb(110,"td"),d.wc(111,"numeric: boolean"),d.Qb(),d.Rb(112,"td"),d.wc(113,"Optional. Table header cell element that maps to numeric cells."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(114,"div",0),d.Rb(115,"h3",1),d.wc(116,"MDCDataTableContent"),d.Qb(),d.wc(117," Mandatory. Table body element. Added to tbody HTML tag. "),d.Rb(118,"p"),d.wc(119," Selector: "),d.Rb(120,"span",2),d.wc(121,"mdcDataTableContent"),d.Qb(),d.Qb(),d.wc(122," Exported as: "),d.Rb(123,"span",2),d.wc(124,"mdcDataTableContent"),d.Qb(),d.Qb(),d.Rb(125,"div",0),d.Rb(126,"h3",1),d.wc(127,"MDCDataTableRow"),d.Qb(),d.Rb(128,"p"),d.wc(129," Selector: "),d.Rb(130,"span",2),d.wc(131,"mdcDataTableRow"),d.Qb(),d.Qb(),d.wc(132," Exported as: "),d.Rb(133,"span",2),d.wc(134,"mdcDataTableRow"),d.Qb(),d.Rb(135,"h4",3),d.wc(136,"Properties"),d.Qb(),d.Rb(137,"table"),d.Rb(138,"thead"),d.Rb(139,"tr"),d.Rb(140,"th"),d.wc(141,"Name"),d.Qb(),d.Rb(142,"th"),d.wc(143,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(144,"tbody"),d.Rb(145,"tr"),d.Rb(146,"td"),d.wc(147,"selected: boolean"),d.Qb(),d.Rb(148,"td"),d.wc(149,"Optional. Modifier class added to mdc-data-table__row when table row is selected."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(150,"div",0),d.Rb(151,"h3",1),d.wc(152,"MDCDataTableCell"),d.Qb(),d.Rb(153,"p"),d.wc(154," Selector: "),d.Rb(155,"span",2),d.wc(156,"mdcDataTableCell"),d.Qb(),d.Qb(),d.wc(157," Exported as: "),d.Rb(158,"span",2),d.wc(159,"mdcDataTableCell"),d.Qb(),d.Rb(160,"h4",3),d.wc(161,"Properties"),d.Qb(),d.Rb(162,"table"),d.Rb(163,"thead"),d.Rb(164,"tr"),d.Rb(165,"th"),d.wc(166,"Name"),d.Qb(),d.Rb(167,"th"),d.wc(168,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(169,"tbody"),d.Rb(170,"tr"),d.Rb(171,"td"),d.wc(172,"checkbox: boolean"),d.Qb(),d.Rb(173,"td"),d.wc(174,"Optional. Table cell element that contains mdc-checkbox."),d.Qb(),d.Qb(),d.Rb(175,"tr"),d.Rb(176,"td"),d.wc(177,"numeric: boolean"),d.Qb(),d.Rb(178,"td"),d.wc(179,"Optional. Table cell element that maps to numeric cells."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb())},directives:[l.i,l.l,o.b],encapsulation:2}),u),k=((p=function e(){_classCallCheck(this,e)}).\u0275fac=function(e){return new(e||p)},p.\u0275cmp=d.Fb({type:p,selectors:[["ng-component"]],decls:137,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(d.Rb(0,"div",0),d.Rb(1,"h4",1),d.wc(2,"Sass Mixins"),d.Qb(),d.Rb(3,"table"),d.Rb(4,"thead"),d.Rb(5,"tr"),d.Rb(6,"th"),d.wc(7,"Mixin"),d.Qb(),d.Rb(8,"th"),d.wc(9,"Description"),d.Qb(),d.Qb(),d.Qb(),d.Rb(10,"tbody"),d.Rb(11,"tr"),d.Rb(12,"td"),d.Rb(13,"code"),d.wc(14,"fill-color($color)"),d.Qb(),d.Qb(),d.Rb(15,"td"),d.wc(16,"Sets the background color of data-table surface."),d.Qb(),d.Qb(),d.Rb(17,"tr"),d.Rb(18,"td"),d.Rb(19,"code"),d.wc(20,"row-fill-color($color)"),d.Qb(),d.Qb(),d.Rb(21,"td"),d.wc(22,"Sets the background color of table row container."),d.Qb(),d.Qb(),d.Rb(23,"tr"),d.Rb(24,"td"),d.Rb(25,"code"),d.wc(26,"header-row-fill-color($color)"),d.Qb(),d.Qb(),d.Rb(27,"td"),d.wc(28,"Sets the background color of table header row container."),d.Qb(),d.Qb(),d.Rb(29,"tr"),d.Rb(30,"td"),d.Rb(31,"code"),d.wc(32,"selected-row-fill-color($color)"),d.Qb(),d.Qb(),d.Rb(33,"td"),d.wc(34,"Sets the background color of selected row container."),d.Qb(),d.Qb(),d.Rb(35,"tr"),d.Rb(36,"td"),d.Rb(37,"code"),d.wc(38,"checked-icon-color($color)"),d.Qb(),d.Qb(),d.Rb(39,"td"),d.wc(40,"Sets the checked icon color."),d.Qb(),d.Qb(),d.Rb(41,"tr"),d.Rb(42,"td"),d.Rb(43,"code"),d.wc(44,"divider-color($color)"),d.Qb(),d.Qb(),d.Rb(45,"td"),d.wc(46,"Sets the table rows divider color."),d.Qb(),d.Qb(),d.Rb(47,"tr"),d.Rb(48,"td"),d.Rb(49,"code"),d.wc(50,"divider-size($size)"),d.Qb(),d.Qb(),d.Rb(51,"td"),d.wc(52,"Sets the table rows divider size."),d.Qb(),d.Qb(),d.Rb(53,"tr"),d.Rb(54,"td"),d.Rb(55,"code"),d.wc(56,"row-hover-fill-color($color)"),d.Qb(),d.Qb(),d.Rb(57,"td"),d.wc(58,"Sets the background color of table row on hover."),d.Qb(),d.Qb(),d.Rb(59,"tr"),d.Rb(60,"td"),d.Rb(61,"code"),d.wc(62,"header-row-text-color($color)"),d.Qb(),d.Qb(),d.Rb(63,"td"),d.wc(64,"Sets the header row text color."),d.Qb(),d.Qb(),d.Rb(65,"tr"),d.Rb(66,"td"),d.Rb(67,"code"),d.wc(68,"row-text-color($color)"),d.Qb(),d.Qb(),d.Rb(69,"td"),d.wc(70,"Sets the row text color."),d.Qb(),d.Qb(),d.Rb(71,"tr"),d.Rb(72,"td"),d.Rb(73,"code"),d.wc(74,"shape-radius($radius)"),d.Qb(),d.Qb(),d.Rb(75,"td"),d.wc(76,"Sets the rounded shape with given radius size. "),d.Rb(77,"code"),d.wc(78,"$radius"),d.Qb(),d.wc(79," can be single radius or list radius values up to 4 list size."),d.Qb(),d.Qb(),d.Rb(80,"tr"),d.Rb(81,"td"),d.Rb(82,"code"),d.wc(83,"stroke-size($size)"),d.Qb(),d.Qb(),d.Rb(84,"td"),d.wc(85,"Sets the border size of data-table."),d.Qb(),d.Qb(),d.Rb(86,"tr"),d.Rb(87,"td"),d.Rb(88,"code"),d.wc(89,"stroke-color($color)"),d.Qb(),d.Qb(),d.Rb(90,"td"),d.wc(91,"Sets the border color of data-table."),d.Qb(),d.Qb(),d.Rb(92,"tr"),d.Rb(93,"td"),d.Rb(94,"code"),d.wc(95,"header-cell-height($height)"),d.Qb(),d.Qb(),d.Rb(96,"td"),d.wc(97,"Sets table header cell height."),d.Qb(),d.Qb(),d.Rb(98,"tr"),d.Rb(99,"td"),d.Rb(100,"code"),d.wc(101,"cell-height($height)"),d.Qb(),d.Qb(),d.Rb(102,"td"),d.wc(103,"Sets table cell height."),d.Qb(),d.Qb(),d.Rb(104,"tr"),d.Rb(105,"td"),d.Rb(106,"code"),d.wc(107,"cell-padding($leading-padding, $trailing-padding)"),d.Qb(),d.Qb(),d.Rb(108,"td"),d.wc(109,"Sets leading & trailing padding for all cells."),d.Qb(),d.Qb(),d.Rb(110,"tr"),d.Rb(111,"td"),d.Rb(112,"code"),d.wc(113,"column-widths($width-list)"),d.Qb(),d.Qb(),d.Rb(114,"td"),d.wc(115,"Sets the custom widths for each table column."),d.Qb(),d.Qb(),d.Rb(116,"tr"),d.Rb(117,"td"),d.Rb(118,"code"),d.wc(119,"density($density-scale)"),d.Qb(),d.Qb(),d.Rb(120,"td"),d.wc(121,"Sets density scale to data table. Supported density scale values "),d.Rb(122,"code"),d.wc(123,"-4"),d.Qb(),d.wc(124,", "),d.Rb(125,"code"),d.wc(126,"-3"),d.Qb(),d.wc(127,", "),d.Rb(128,"code"),d.wc(129,"-2"),d.Qb(),d.wc(130,", "),d.Rb(131,"code"),d.wc(132,"-1"),d.Qb(),d.wc(133,", "),d.Rb(134,"code"),d.wc(135,"0"),d.Qb(),d.wc(136,". Use corresponding density mixins of child components (such as Checkbox) to apply density scales which will be rendered inside data table as content."),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Qb())},directives:[l.l],encapsulation:2}),p),v=[{path:"",component:(C=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){this._componentViewer.template={title:"Data Table",description:"Data tables display information in a grid-like format of rows and columns. \n      They organize information in a way that's easy to scan, so that users can look for patterns and insights.",references:[{name:"Material Design guidelines: Data Tables",url:"https://material.io/design/components/data-tables.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-data-table/README.md"}],code:"import {MDCDataTableModule} from '@angular-mdc/web';",sass:"@use '@material/data-table/mdc-data-table';\n@use '@material/data-table';"}}}]),e}(),C.\u0275fac=function(e){return new(e||C)},C.\u0275cmp=d.Fb({type:C,selectors:[["ng-component"]],viewQuery:function(e,t){var b;1&e&&d.tc(n.a,!0),2&e&&d.nc(b=d.ac())&&(t._componentViewer=b.first)},decls:1,vars:0,template:function(e,t){1&e&&d.Mb(0,"component-viewer")},directives:[r.a],encapsulation:2}),C),children:[{path:"",redirectTo:"api"},{path:"api",component:g},{path:"sass",component:k},{path:"examples",component:(f=function(){function e(){_classCallCheck(this,e),this.desserts=[{checked:!1,name:"Frozen yogurt",calories:159,carbs:24,protein:4,comment:"Super tasty"},{checked:!0,name:"Ice cream sandwich",calories:237,carbs:37,protein:4.3,comment:"I like ice cream more"},{checked:!1,name:"Eclair",calories:262,carbs:16,protein:6,comment:"New filling flavor"}],this.exampleDessertsArray="desserts = [\n  {checked: false, name: 'Frozen yogurt', calories: 159, carbs: 24, protein: 4, comment: 'Super tasty'},\n  {checked: true, name: 'Ice cream sandwich', calories: 237, carbs: 37, protein: 4.3, comment: 'I like ice cream more'},\n  {checked: false, name: 'Eclair', calories: 262, carbs: 16, protein: 6, comment: 'New filling flavor'}\n];",this.exampleStandard={html:'<mdc-data-table>\n  <table mdcDataTableTable>\n    <thead>\n      <tr mdcDataTableHeaderRow>\n        <th mdcDataTableHeaderCell>Dessert</th>\n        <th mdcDataTableHeaderCell numeric>Calories</th>\n        <th mdcDataTableHeaderCell numeric>Carbs</th>\n        <th mdcDataTableHeaderCell numeric>Protein (g)</th>\n        <th mdcDataTableHeaderCell>Comments</th>\n      </tr>\n    </thead>\n    <tbody mdcDataTableContent>\n      <tr mdcDataTableRow *ngFor="let dessert of desserts">\n        <td mdcDataTableCell>{{dessert.name}}</td>\n        <td mdcDataTableCell numeric>{{dessert.calories}}</td>\n        <td mdcDataTableCell numeric>{{dessert.carbs}}</td>\n        <td mdcDataTableCell numeric>{{dessert.protein}}</td>\n        <td mdcDataTableCell>{{dessert.comment}}</td>\n      </tr>\n    </tbody>\n  </table>\n</mdc-data-table>',ts:this.exampleDessertsArray},this.exampleRowSelection={html:'<mdc-data-table (selectionChanged)="onSelectionChanged($event)"\n  (selectedAll)="onSelectedAll()" (unselectedAll)="onUnselectedAll()">\n  <table mdcDataTableTable>\n    <thead>\n      <tr mdcDataTableHeaderRow>\n        <th mdcDataTableHeaderCell>\n          <mdc-checkbox></mdc-checkbox>\n        </th>\n        <th mdcDataTableHeaderCell>Dessert</th>\n        <th mdcDataTableHeaderCell numeric>Calories</th>\n        <th mdcDataTableHeaderCell numeric>Carbs</th>\n        <th mdcDataTableHeaderCell numeric>Protein (g)</th>\n        <th mdcDataTableHeaderCell>Comments</th>\n      </tr>\n    </thead>\n    <tbody mdcDataTableContent>\n      <tr mdcDataTableRow *ngFor="let dessert of desserts" [selected]="dessert.checked">\n        <td mdcDataTableCell>\n          <mdc-checkbox [checked]="dessert.checked"></mdc-checkbox>\n        </td>\n        <td mdcDataTableCell>{{dessert.name}}</td>\n        <td mdcDataTableCell numeric>{{dessert.calories}}</td>\n        <td mdcDataTableCell numeric>{{dessert.carbs}}</td>\n        <td mdcDataTableCell numeric>{{dessert.protein}}</td>\n        <td mdcDataTableCell>{{dessert.comment}}</td>\n      </tr>\n    </tbody>\n  </table>\n</mdc-data-table>',ts:"".concat(this.exampleDessertsArray,"\n\nonSelectionChanged(event: MDCDataTableRowSelectionChangedEvent): void {\n  this.selectionChangedEvent = event;\n  this.desserts[event.index].checked = event.selected;\n}\n\nonSelectedAll(): void {\n  this.desserts.forEach(_ => _.checked = true);\n}\n\nonUnselectedAll(): void {\n  this.desserts.forEach(_ => _.checked = false);\n}")}}return _createClass(e,[{key:"onSelectionChanged",value:function(e){this.selectionChangedEvent=e,this.desserts[e.index].checked=e.selected}},{key:"onSelectedAll",value:function(){this.desserts.forEach((function(e){return e.checked=!0}))}},{key:"onUnselectedAll",value:function(){this.desserts.forEach((function(e){return e.checked=!1}))}}]),e}(),f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=d.Fb({type:f,selectors:[["ng-component"]],decls:45,vars:7,consts:[[1,"demo-content"],[1,"demo-content__headline"],["mdcDataTableTable",""],["mdcDataTableHeaderRow",""],["mdcDataTableHeaderCell",""],["mdcDataTableHeaderCell","","numeric",""],["mdcDataTableContent",""],["mdcDataTableRow","",4,"ngFor","ngForOf"],[3,"example"],[3,"selectionChanged","selectedAll","unselectedAll"],["mdcDataTableRow","",3,"selected",4,"ngFor","ngForOf"],["mdcDataTableRow",""],["mdcDataTableCell",""],["mdcDataTableCell","","numeric",""],["mdcDataTableRow","",3,"selected"],[3,"checked"]],template:function(e,t){1&e&&(d.Rb(0,"div",0),d.Rb(1,"h3",1),d.wc(2,"Standard"),d.Qb(),d.Rb(3,"mdc-data-table"),d.Rb(4,"table",2),d.Rb(5,"thead"),d.Rb(6,"tr",3),d.Rb(7,"th",4),d.wc(8,"Dessert"),d.Qb(),d.Rb(9,"th",5),d.wc(10,"Calories"),d.Qb(),d.Rb(11,"th",5),d.wc(12,"Carbs"),d.Qb(),d.Rb(13,"th",5),d.wc(14,"Protein (g)"),d.Qb(),d.Rb(15,"th",4),d.wc(16,"Comments"),d.Qb(),d.Qb(),d.Qb(),d.Rb(17,"tbody",6),d.uc(18,m,11,5,"tr",7),d.Qb(),d.Qb(),d.Qb(),d.Mb(19,"example-viewer",8),d.Qb(),d.Rb(20,"div",0),d.Rb(21,"h3",1),d.wc(22,"Data Table with Row Selection"),d.Qb(),d.Rb(23,"mdc-data-table",9),d.Zb("selectionChanged",(function(e){return t.onSelectionChanged(e)}))("selectedAll",(function(){return t.onSelectedAll()}))("unselectedAll",(function(){return t.onUnselectedAll()})),d.Rb(24,"table",2),d.Rb(25,"thead"),d.Rb(26,"tr",3),d.Rb(27,"th",4),d.Mb(28,"mdc-checkbox"),d.Qb(),d.Rb(29,"th",4),d.wc(30,"Dessert"),d.Qb(),d.Rb(31,"th",5),d.wc(32,"Calories"),d.Qb(),d.Rb(33,"th",5),d.wc(34,"Carbs"),d.Qb(),d.Rb(35,"th",5),d.wc(36,"Protein (g)"),d.Qb(),d.Rb(37,"th",4),d.wc(38,"Comments"),d.Qb(),d.Qb(),d.Qb(),d.Rb(39,"tbody",6),d.uc(40,Q,13,7,"tr",10),d.Qb(),d.Qb(),d.Qb(),d.Rb(41,"p"),d.wc(42),d.ec(43,"json"),d.Qb(),d.Mb(44,"example-viewer",8),d.Qb()),2&e&&(d.Bb(18),d.ic("ngForOf",t.desserts),d.Bb(1),d.ic("example",t.exampleStandard),d.Bb(21),d.ic("ngForOf",t.desserts),d.Bb(2),d.yc("Selection event: ",d.fc(43,5,t.selectionChangedEvent),""),d.Bb(2),d.ic("example",t.exampleRowSelection))},directives:[s.a,i.f,i.d,i.c,i.b,R.j,h.a,w.a,i.e,i.a],pipes:[R.f],encapsulation:2}),f)}]}],y=((T=function e(){_classCallCheck(this,e)}).\u0275mod=d.Jb({type:T}),T.\u0275inj=d.Ib({factory:function(e){return new(e||T)},imports:[[c.e.forChild(v)],c.e]}),T),x=((D=function e(){_classCallCheck(this,e)}).\u0275mod=d.Jb({type:D}),D.\u0275inj=d.Ib({factory:function(e){return new(e||D)},imports:[[a.a,y]]}),D)},leug:function(e,t,b){"use strict";var a=b("LuDt");b.d(t,"a",(function(){return a.a}))}}]);