(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"1lN2":function(e,t,n){"use strict";n.r(t),n.d(t,"SliderModule",(function(){return j}));var i=n("d2mR"),r=n("tyNb"),a=n("leug"),s=n("fXoL"),o=n("LuDt"),c=n("5l+6"),d=n("mrSG"),l=n("3Pt+"),u=n("f6B5"),h=n("Hj8T"),b=n("XNiG"),m=n("xgIS"),p=n("3UWI"),_=n("1G5W"),g=n("sEbM"),v=n("tJqG"),f=n("m9I9"),R={ACTIVE:"mdc-slider--active",DISABLED:"mdc-slider--disabled",DISCRETE:"mdc-slider--discrete",FOCUS:"mdc-slider--focus",HAS_TRACK_MARKER:"mdc-slider--display-markers",IN_TRANSIT:"mdc-slider--in-transit",IS_DISCRETE:"mdc-slider--discrete"},w={ARIA_DISABLED:"aria-disabled",ARIA_VALUEMAX:"aria-valuemax",ARIA_VALUEMIN:"aria-valuemin",ARIA_VALUENOW:"aria-valuenow",CHANGE_EVENT:"MDCSlider:change",INPUT_EVENT:"MDCSlider:input",PIN_VALUE_MARKER_SELECTOR:".mdc-slider__pin-value-marker",STEP_DATA_ATTR:"data-step",THUMB_CONTAINER_SELECTOR:".mdc-slider__thumb-container",TRACK_MARKER_CONTAINER_SELECTOR:".mdc-slider__track-marker-container",TRACK_SELECTOR:".mdc-slider__track"},y={PAGE_FACTOR:4},k=["mousedown","pointerdown","touchstart"],Q=["mouseup","pointerup","touchend"],x={mousedown:"mousemove",pointerdown:"pointermove",touchstart:"touchmove"},C=function(e){function t(n){var i=e.call(this,d.a({},t.defaultAdapter,n))||this;return i.savedTabIndex_=NaN,i.active_=!1,i.inTransit_=!1,i.isDiscrete_=!1,i.hasTrackMarker_=!1,i.handlingThumbTargetEvt_=!1,i.min_=0,i.max_=100,i.step_=0,i.value_=0,i.disabled_=!1,i.preventFocusState_=!1,i.thumbContainerPointerHandler_=function(){return i.handlingThumbTargetEvt_=!0},i.interactionStartHandler_=function(e){return i.handleDown_(e)},i.keydownHandler_=function(e){return i.handleKeydown_(e)},i.focusHandler_=function(){return i.handleFocus_()},i.blurHandler_=function(){return i.handleBlur_()},i.resizeHandler_=function(){return i.layout()},i}return d.c(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return R},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return w},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return y},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{hasClass:function(){return!1},addClass:function(){},removeClass:function(){},getAttribute:function(){return null},setAttribute:function(){},removeAttribute:function(){},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabIndex:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerThumbContainerInteractionHandler:function(){},deregisterThumbContainerInteractionHandler:function(){},registerBodyInteractionHandler:function(){},deregisterBodyInteractionHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},notifyInput:function(){},notifyChange:function(){},setThumbContainerStyleProperty:function(){},setTrackStyleProperty:function(){},setMarkerValue:function(){},setTrackMarkers:function(){},isRTL:function(){return!1}}},enumerable:!0,configurable:!0}),t.prototype.init=function(){var e=this;this.isDiscrete_=this.adapter_.hasClass(R.IS_DISCRETE),this.hasTrackMarker_=this.adapter_.hasClass(R.HAS_TRACK_MARKER),k.forEach((function(t){e.adapter_.registerInteractionHandler(t,e.interactionStartHandler_),e.adapter_.registerThumbContainerInteractionHandler(t,e.thumbContainerPointerHandler_)})),this.adapter_.registerInteractionHandler("keydown",this.keydownHandler_),this.adapter_.registerInteractionHandler("focus",this.focusHandler_),this.adapter_.registerInteractionHandler("blur",this.blurHandler_),this.adapter_.registerResizeHandler(this.resizeHandler_),this.layout(),this.isDiscrete_&&0===this.getStep()&&(this.step_=1)},t.prototype.destroy=function(){var e=this;k.forEach((function(t){e.adapter_.deregisterInteractionHandler(t,e.interactionStartHandler_),e.adapter_.deregisterThumbContainerInteractionHandler(t,e.thumbContainerPointerHandler_)})),this.adapter_.deregisterInteractionHandler("keydown",this.keydownHandler_),this.adapter_.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter_.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter_.deregisterResizeHandler(this.resizeHandler_)},t.prototype.setupTrackMarker=function(){this.isDiscrete_&&this.hasTrackMarker_&&0!==this.getStep()&&this.adapter_.setTrackMarkers(this.getStep(),this.getMax(),this.getMin())},t.prototype.layout=function(){this.rect_=this.adapter_.computeBoundingRect(),this.updateUIForCurrentValue_()},t.prototype.getValue=function(){return this.value_},t.prototype.setValue=function(e){this.setValue_(e,!1)},t.prototype.getMax=function(){return this.max_},t.prototype.setMax=function(e){if(e<this.min_)throw new Error("Cannot set max to be less than the slider's minimum value");this.max_=e,this.setValue_(this.value_,!1,!0),this.adapter_.setAttribute(w.ARIA_VALUEMAX,String(this.max_)),this.setupTrackMarker()},t.prototype.getMin=function(){return this.min_},t.prototype.setMin=function(e){if(e>this.max_)throw new Error("Cannot set min to be greater than the slider's maximum value");this.min_=e,this.setValue_(this.value_,!1,!0),this.adapter_.setAttribute(w.ARIA_VALUEMIN,String(this.min_)),this.setupTrackMarker()},t.prototype.getStep=function(){return this.step_},t.prototype.setStep=function(e){if(e<0)throw new Error("Step cannot be set to a negative number");this.isDiscrete_&&("number"!=typeof e||e<1)&&(e=1),this.step_=e,this.setValue_(this.value_,!1,!0),this.setupTrackMarker()},t.prototype.isDisabled=function(){return this.disabled_},t.prototype.setDisabled=function(e){this.disabled_=e,this.toggleClass_(R.DISABLED,this.disabled_),this.disabled_?(this.savedTabIndex_=this.adapter_.getTabIndex(),this.adapter_.setAttribute(w.ARIA_DISABLED,"true"),this.adapter_.removeAttribute("tabindex")):(this.adapter_.removeAttribute(w.ARIA_DISABLED),isNaN(this.savedTabIndex_)||this.adapter_.setAttribute("tabindex",String(this.savedTabIndex_)))},t.prototype.handleDown_=function(e){var t=this;if(!this.disabled_){this.preventFocusState_=!0,this.setInTransit_(!this.handlingThumbTargetEvt_),this.handlingThumbTargetEvt_=!1,this.setActive_(!0);var n=function(e){t.handleMove_(e)},i=x[e.type],r=function(){t.handleUp_(),t.adapter_.deregisterBodyInteractionHandler(i,n),Q.forEach((function(e){return t.adapter_.deregisterBodyInteractionHandler(e,r)}))};this.adapter_.registerBodyInteractionHandler(i,n),Q.forEach((function(e){return t.adapter_.registerBodyInteractionHandler(e,r)})),this.setValueFromEvt_(e)}},t.prototype.handleMove_=function(e){e.preventDefault(),this.setValueFromEvt_(e)},t.prototype.handleUp_=function(){this.setActive_(!1),this.adapter_.notifyChange()},t.prototype.getClientX_=function(e){return e.targetTouches&&e.targetTouches.length>0?e.targetTouches[0].clientX:e.clientX},t.prototype.setValueFromEvt_=function(e){var t=this.getClientX_(e),n=this.computeValueFromClientX_(t);this.setValue_(n,!0)},t.prototype.computeValueFromClientX_=function(e){var t=this.max_,n=this.min_,i=(e-this.rect_.left)/this.rect_.width;return this.adapter_.isRTL()&&(i=1-i),n+i*(t-n)},t.prototype.handleKeydown_=function(e){var t=this.getKeyId_(e),n=this.getValueForKeyId_(t);isNaN(n)||(e.preventDefault(),this.adapter_.addClass(R.FOCUS),this.setValue_(n,!0),this.adapter_.notifyChange())},t.prototype.getKeyId_=function(e){return"ArrowLeft"===e.key||37===e.keyCode?"ArrowLeft":"ArrowRight"===e.key||39===e.keyCode?"ArrowRight":"ArrowUp"===e.key||38===e.keyCode?"ArrowUp":"ArrowDown"===e.key||40===e.keyCode?"ArrowDown":"Home"===e.key||36===e.keyCode?"Home":"End"===e.key||35===e.keyCode?"End":"PageUp"===e.key||33===e.keyCode?"PageUp":"PageDown"===e.key||34===e.keyCode?"PageDown":""},t.prototype.getValueForKeyId_=function(e){var t=this.step_||(this.max_-this.min_)/100;switch(this.adapter_.isRTL()&&("ArrowLeft"===e||"ArrowRight"===e)&&(t=-t),e){case"ArrowLeft":case"ArrowDown":return this.value_-t;case"ArrowRight":case"ArrowUp":return this.value_+t;case"Home":return this.min_;case"End":return this.max_;case"PageUp":return this.value_+t*y.PAGE_FACTOR;case"PageDown":return this.value_-t*y.PAGE_FACTOR;default:return NaN}},t.prototype.handleFocus_=function(){this.preventFocusState_||this.adapter_.addClass(R.FOCUS)},t.prototype.handleBlur_=function(){this.preventFocusState_=!1,this.adapter_.removeClass(R.FOCUS)},t.prototype.setValue_=function(e,t,n){if(void 0===n&&(n=!1),e!==this.value_||n){var i=this.min_,r=this.max_;this.step_&&!(e===i||e===r)&&(e=this.quantize_(e)),e<i?e=i:e>r&&(e=r),this.value_=e=e||0,this.adapter_.setAttribute(w.ARIA_VALUENOW,String(this.value_)),this.updateUIForCurrentValue_(),t&&(this.adapter_.notifyInput(),this.isDiscrete_&&this.adapter_.setMarkerValue(e))}},t.prototype.quantize_=function(e){return Math.round(e/this.step_)*this.step_},t.prototype.updateUIForCurrentValue_=function(){var e=this,t=this.min_,n=(this.value_-t)/(this.max_-t),i=n*this.rect_.width;this.adapter_.isRTL()&&(i=this.rect_.width-i);var r=Object(v.b)(window,"transform"),a=Object(v.a)(window,"transitionend");if(this.inTransit_){var s=function(){e.setInTransit_(!1),e.adapter_.deregisterThumbContainerInteractionHandler(a,s)};this.adapter_.registerThumbContainerInteractionHandler(a,s)}requestAnimationFrame((function(){e.adapter_.setThumbContainerStyleProperty(r,"translateX("+i+"px) translateX(-50%)"),e.adapter_.setTrackStyleProperty(r,"scaleX("+n+")")}))},t.prototype.setActive_=function(e){this.active_=e,this.toggleClass_(R.ACTIVE,this.active_)},t.prototype.setInTransit_=function(e){this.inTransit_=e,this.toggleClass_(R.IN_TRANSIT,this.inTransit_)},t.prototype.toggleClass_=function(e,t){t?this.adapter_.addClass(e):this.adapter_.removeClass(e)},t}(f.a),M=n("ofXK");const I=["thumbcontainer"],T=["sliderThumb"],A=["track"],E=["pin"],S=["markercontainer"];function V(e,t){1&e&&s.Mb(0,"div",11,12)}function D(e,t){1&e&&(s.Rb(0,"div",13),s.Mb(1,"span",14,15),s.Qb())}const H={provide:l.i,useExisting:Object(s.T)(()=>L),multi:!0};class B{constructor(e,t){this.source=e,this.value=t}}let L=(()=>{class e extends g.a{constructor(e,t,n,i,r){super(i),this._platform=e,this._ngZone=t,this._changeDetectorRef=n,this.elementRef=i,this._destroyed=new b.a,this._initialized=!1,this.tabIndex=0,this._discrete=!1,this._markers=!1,this._min=0,this._max=100,this._step=1,this._value=null,this._disabled=!1,this.change=new s.n,this.input=new s.n,this.valueChange=new s.n,this._onTouched=()=>{},this._controlValueAccessorChangeFn=()=>{},this.tabIndex=parseInt(r,10)||0,this._root=this.elementRef.nativeElement}get discrete(){return this._discrete}set discrete(e){this._discrete=Object(u.b)(e)}get markers(){return this._markers}set markers(e){this._markers=Object(u.b)(e)}get min(){return this._min}set min(e){const t=Object(u.e)(e);t!==this._min&&(this._min=t)}get max(){return this._max}set max(e){const t=Object(u.e)(e);t!==this._max&&(this._max=t)}get step(){return this._step}set step(e){const t=Object(u.e)(e,this._step);t!==this._step&&(this._step=t)}get value(){return null===this._value&&(this.value=this.min),this._value}set value(e){this._value=Object(u.e)(e,null)}get disabled(){return this._disabled}set disabled(e){this.setDisabledState(e)}getDefaultFoundation(){return new C({hasClass:e=>this._root.classList.contains(e),addClass:e=>this._root.classList.add(e),removeClass:e=>this._root.classList.remove(e),getAttribute:e=>this._root.getAttribute(e),setAttribute:(e,t)=>this._root.setAttribute(e,t),removeAttribute:e=>this._root.removeAttribute(e),computeBoundingRect:()=>this._root.getBoundingClientRect(),getTabIndex:()=>this._root.tabIndex,registerInteractionHandler:(e,t)=>this._root.addEventListener(e,t),deregisterInteractionHandler:(e,t)=>this._root.removeEventListener(e,t),registerThumbContainerInteractionHandler:(e,t)=>{this._ngZone.runOutsideAngular(()=>{this.thumbContainer.nativeElement.addEventListener(e,t,Object(h.d)())})},deregisterThumbContainerInteractionHandler:(e,t)=>this.thumbContainer.nativeElement.removeEventListener(e,t,Object(h.d)()),registerBodyInteractionHandler:(e,t)=>document.body.addEventListener(e,t),deregisterBodyInteractionHandler:(e,t)=>document.body.removeEventListener(e,t),registerResizeHandler:()=>{},deregisterResizeHandler:()=>{},notifyInput:()=>{const e=this._foundation.getValue();e!==this.value&&(this.value=e,this.input.emit(this._createChangeEvent(e)))},notifyChange:()=>{this.value=this._foundation.getValue(),this._emitChangeEvent(this.value)},setThumbContainerStyleProperty:(e,t)=>this.thumbContainer.nativeElement.style.setProperty(e,t),setTrackStyleProperty:(e,t)=>this.track.nativeElement.style.setProperty(e,t),setMarkerValue:e=>{this._changeDetectorRef.markForCheck(),this.pinValueMarker.nativeElement.innerText=null!==e?e.toString():null},setTrackMarkers:(e,t,n)=>this.trackMarkerContainer.nativeElement.style.setProperty("background",this._getTrackMarkersBackground(e,n,t)),isRTL:()=>!!this._platform.isBrowser&&"rtl"===window.getComputedStyle(this._root).getPropertyValue("direction")})}ngOnChanges(e){this._initialized&&(e.step&&this._syncStepWithFoundation(),e.max&&this._syncMaxWithFoundation(),e.min&&this._syncMinWithFoundation(),e.value&&this._syncValueWithFoundation(),(e.markers||e.discrete)&&this._refreshTrackMarkers())}_asyncInitializeFoundation(){return Object(d.b)(this,void 0,void 0,(function*(){this._foundation.init()}))}ngAfterViewInit(){this._platform.isBrowser&&(this._initialized=!0,this._asyncInitializeFoundation().then(()=>{this._syncStepWithFoundation(),this._syncMaxWithFoundation(),this._syncMinWithFoundation(),this._syncValueWithFoundation(),this._foundation.setupTrackMarker(),this._loadListeners(),this._changeDetectorRef.markForCheck()}))}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.destroy()}writeValue(e){this.value=e,this._syncValueWithFoundation()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this._disabled=Object(u.b)(e),this._foundation.setDisabled(e),this._changeDetectorRef.markForCheck()}layout(){this._foundation.layout()}_loadListeners(){this._ngZone.runOutsideAngular(()=>Object(m.a)(window,"resize").pipe(Object(p.a)(16),Object(_.a)(this._destroyed)).subscribe(()=>this.layout()))}_syncValueWithFoundation(){this._foundation.setValue(this.value)}_syncStepWithFoundation(){this._foundation.setStep(this.step)}_syncMinWithFoundation(){this._foundation.setMin(this.min)}_syncMaxWithFoundation(){this._foundation.setMax(this.max)}_createChangeEvent(e){return new B(this,e)}_emitChangeEvent(e){this._controlValueAccessorChangeFn(e),this.valueChange.emit(e),this.change.emit(this._createChangeEvent(e))}_getTrackMarkersBackground(e,t,n){const i=e.toLocaleString();return`linear-gradient(to right, currentColor 2px, transparent 0) ${`0 center / calc((100% - 2px) / ${`((${n.toLocaleString()} - ${t.toLocaleString()}) / ${i})`}) 100% repeat-x`}`}_refreshTrackMarkers(){this._foundation.hasTrackMarker_=this.markers,this._foundation.setupTrackMarker()}}return e.\u0275fac=function(t){return new(t||e)(s.Lb(h.a),s.Lb(s.z),s.Lb(s.h),s.Lb(s.l),s.Wb("tabindex"))},e.\u0275cmp=s.Fb({type:e,selectors:[["mdc-slider"]],viewQuery:function(e,t){var n;1&e&&(s.Ac(I,!0),s.Ac(T,!0),s.Ac(A,!0),s.Ac(E,!0),s.Ac(S,!0)),2&e&&(s.nc(n=s.ac())&&(t.thumbContainer=n.first),s.nc(n=s.ac())&&(t._sliderThumb=n.first),s.nc(n=s.ac())&&(t.track=n.first),s.nc(n=s.ac())&&(t.pinValueMarker=n.first),s.nc(n=s.ac())&&(t.trackMarkerContainer=n.first))},hostAttrs:["role","slider","aria-orientation","horizontal",1,"mdc-slider"],hostVars:5,hostBindings:function(e,t){1&e&&s.Zb("blur",(function(){return t._onTouched()})),2&e&&(s.Cb("tabindex",t.tabIndex||0),s.Db("mdc-slider--discrete",t.discrete)("mdc-slider--display-markers",t.markers&&t.discrete))},inputs:{tabIndex:"tabIndex",discrete:"discrete",markers:"markers",min:"min",max:"max",step:"step",value:"value",disabled:"disabled"},outputs:{change:"change",input:"input",valueChange:"valueChange"},exportAs:["mdcSlider"],features:[s.Ab([H]),s.yb,s.zb],decls:11,vars:2,consts:[[1,"mdc-slider__track-container"],[1,"mdc-slider__track"],["track",""],["class","mdc-slider__track-marker-container",4,"ngIf"],[1,"mdc-slider__thumb-container"],["thumbcontainer",""],["class","mdc-slider__pin",4,"ngIf"],["width","21","height","21","focusable","false",1,"mdc-slider__thumb"],["sliderThumb",""],["cx","10.5","cy","10.5","r","7.875"],[1,"mdc-slider__focus-ring"],[1,"mdc-slider__track-marker-container"],["markercontainer",""],[1,"mdc-slider__pin"],[1,"mdc-slider__pin-value-marker"],["pin",""]],template:function(e,t){1&e&&(s.Rb(0,"div",0),s.Mb(1,"div",1,2),s.uc(3,V,2,0,"div",3),s.Qb(),s.Rb(4,"div",4,5),s.uc(6,D,3,0,"div",6),s.cc(),s.Rb(7,"svg",7,8),s.Mb(9,"circle",9),s.Qb(),s.bc(),s.Mb(10,"div",10),s.Qb()),2&e&&(s.Bb(3),s.ic("ngIf",t.markers),s.Bb(3),s.ic("ngIf",t.discrete))},directives:[M.k],encapsulation:2,changeDetection:0}),e})();var F=n("6D23"),O=n("4G1d"),N=n("uwiL"),P=n("dkiD");const z=[{path:"",component:(()=>{class e{ngOnInit(){this._componentViewer.template={title:"Slider",description:"Sliders allow users to make selections from a range of values.",references:[{name:"Material Design guidelines: Sliders",url:"https://material.io/guidelines/components/sliders.html"},{name:"Material Components Web",url:"https://github.com/material-components/material-components-web/blob/master/packages/mdc-slider/README.md"}],code:"import {MdcSliderModule} from '@angular-mdc/web';",sass:"@use '@material/slider/mdc-slider';\n@use '@material/slider';"}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Fb({type:e,selectors:[["ng-component"]],viewQuery:function(e,t){var n;1&e&&s.tc(a.a,!0),2&e&&s.nc(n=s.ac())&&(t._componentViewer=n.first)},decls:1,vars:0,template:function(e,t){1&e&&s.Mb(0,"component-viewer")},directives:[o.a],encapsulation:2}),e})(),children:[{path:"",redirectTo:"api"},{path:"api",component:(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Fb({type:e,selectors:[["ng-component"]],decls:88,vars:0,consts:[[1,"docs-api"],["mdcHeadline6",""],[1,"markdown-code"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(s.Rb(0,"div",0),s.Rb(1,"h3",1),s.wc(2,"MdcSlider"),s.Qb(),s.Rb(3,"p"),s.wc(4," Selector: "),s.Rb(5,"span",2),s.wc(6,"mdc-slider"),s.Qb(),s.Qb(),s.wc(7," Exported as: "),s.Rb(8,"span",2),s.wc(9,"mdcSlider"),s.Qb(),s.Rb(10,"h4",3),s.wc(11,"Properties"),s.Qb(),s.Rb(12,"table"),s.Rb(13,"thead"),s.Rb(14,"tr"),s.Rb(15,"th"),s.wc(16,"Name"),s.Qb(),s.Rb(17,"th"),s.wc(18,"Description"),s.Qb(),s.Qb(),s.Qb(),s.Rb(19,"tbody"),s.Rb(20,"tr"),s.Rb(21,"td"),s.wc(22,"min: number"),s.Qb(),s.Rb(23,"td"),s.wc(24,"The minimum value that the slider can have."),s.Qb(),s.Qb(),s.Rb(25,"tr"),s.Rb(26,"td"),s.wc(27,"max: number"),s.Qb(),s.Rb(28,"td"),s.wc(29,"The maximum value that the slider can have."),s.Qb(),s.Qb(),s.Rb(30,"tr"),s.Rb(31,"td"),s.wc(32,"value: number"),s.Qb(),s.Rb(33,"td"),s.wc(34,"The current value of the slider."),s.Qb(),s.Qb(),s.Rb(35,"tr"),s.Rb(36,"td"),s.wc(37,"step: number"),s.Qb(),s.Rb(38,"td"),s.wc(39,"Specifies the increments at which a slider value can be set."),s.Qb(),s.Qb(),s.Rb(40,"tr"),s.Rb(41,"td"),s.wc(42,"discrete: boolean"),s.Qb(),s.Rb(43,"td"),s.wc(44,"Discrete sliders allow users to select a specific value from a range. (Default: false)"),s.Qb(),s.Qb(),s.Rb(45,"tr"),s.Rb(46,"td"),s.wc(47,"markers: boolean"),s.Qb(),s.Rb(48,"td"),s.wc(49,"Show markers on track. Discrete sliders support displaying markers on their tracks. (Default: false)"),s.Qb(),s.Qb(),s.Rb(50,"tr"),s.Rb(51,"td"),s.wc(52,"disabled: boolean"),s.Qb(),s.Rb(53,"td"),s.wc(54,"Disables the slider."),s.Qb(),s.Qb(),s.Rb(55,"tr"),s.Rb(56,"td"),s.wc(57,"tabIndex: number"),s.Qb(),s.Rb(58,"td"),s.wc(59,"Set the underlying tab index of the component. (Default is 0)"),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Rb(60,"h4",3),s.wc(61,"Events"),s.Qb(),s.Rb(62,"table"),s.Rb(63,"tbody"),s.Rb(64,"tr"),s.Rb(65,"td"),s.wc(66," layout() "),s.Qb(),s.Rb(67,"td"),s.wc(68,"Recomputes the dimensions and re-lays out the component. This should be called if the dimensions of the slider itself or any of its parent elements change programmatically (it is called automatically on resize)."),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Rb(69,"h4",3),s.wc(70,"Events"),s.Qb(),s.Rb(71,"table"),s.Rb(72,"tbody"),s.Rb(73,"tr"),s.Rb(74,"td"),s.wc(75," change(source: MdcSlider, value: number) "),s.Qb(),s.Rb(76,"td"),s.wc(77,"Broadcast when slider value is changed and committed by way of a user event, e.g. when a user stops dragging the slider or changes the value using the arrow keys."),s.Qb(),s.Qb(),s.Rb(78,"tr"),s.Rb(79,"td"),s.wc(80," input(source: MdcSlider, value: number) "),s.Qb(),s.Rb(81,"td"),s.wc(82,"Broadcasts when slider value is changed by way of a user event, e.g. when a user is dragging the slider or changing the value using the arrow keys."),s.Qb(),s.Qb(),s.Rb(83,"tr"),s.Rb(84,"td"),s.wc(85," valueChange(value: number) "),s.Qb(),s.Rb(86,"td"),s.wc(87,"Emits when the value of the slider changes."),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb())},directives:[c.i,c.l],encapsulation:2}),e})()},{path:"sass",component:(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Fb({type:e,selectors:[["ng-component"]],decls:65,vars:0,consts:[[1,"docs-api"],["mdcSubtitle2",""]],template:function(e,t){1&e&&(s.Rb(0,"div",0),s.Rb(1,"h4",1),s.wc(2,"Sass Mixins"),s.Qb(),s.Rb(3,"table"),s.Rb(4,"thead"),s.Rb(5,"tr"),s.Rb(6,"th"),s.wc(7,"Mixin"),s.Qb(),s.Rb(8,"th"),s.wc(9,"Description"),s.Qb(),s.Qb(),s.Qb(),s.Rb(10,"tbody"),s.Rb(11,"tr"),s.Rb(12,"td"),s.Rb(13,"code"),s.wc(14,"color-accessible($color)"),s.Qb(),s.Qb(),s.Rb(15,"td"),s.wc(16,"Sets the color of all slider elements and automatically sets an accessible ink color with high contrast for the value indicator pin"),s.Qb(),s.Qb(),s.Rb(17,"tr"),s.Rb(18,"td"),s.Rb(19,"code"),s.wc(20,"highlight-color($color)"),s.Qb(),s.Qb(),s.Rb(21,"td"),s.wc(22,'Sets the color of the highlighted (aka "on") portion of the slider'),s.Qb(),s.Qb(),s.Rb(23,"tr"),s.Rb(24,"td"),s.Rb(25,"code"),s.wc(26,"rail-color($color, $opacity)"),s.Qb(),s.Qb(),s.Rb(27,"td"),s.wc(28,"Sets the color (and optionally the opacity) of the rail"),s.Qb(),s.Qb(),s.Rb(29,"tr"),s.Rb(30,"td"),s.Rb(31,"code"),s.wc(32,"rail-tick-mark-color($color)"),s.Qb(),s.Qb(),s.Rb(33,"td"),s.wc(34,"Sets the color of the tick marks on the rail"),s.Qb(),s.Qb(),s.Rb(35,"tr"),s.Rb(36,"td"),s.Rb(37,"code"),s.wc(38,"thumb-color($color)"),s.Qb(),s.Qb(),s.Rb(39,"td"),s.wc(40,"Sets the color of the thumb (grab handle)"),s.Qb(),s.Qb(),s.Rb(41,"tr"),s.Rb(42,"td"),s.Rb(43,"code"),s.wc(44,"focus-halo-color($color)"),s.Qb(),s.Qb(),s.Rb(45,"td"),s.wc(46,"Sets the color of the focus halo"),s.Qb(),s.Qb(),s.Rb(47,"tr"),s.Rb(48,"td"),s.Rb(49,"code"),s.wc(50,"value-pin-fill-color-accessible($color)"),s.Qb(),s.Qb(),s.Rb(51,"td"),s.wc(52,"Sets the fill color of the value indicator pin and automatically sets an accessible ink color with high contrast"),s.Qb(),s.Qb(),s.Rb(53,"tr"),s.Rb(54,"td"),s.Rb(55,"code"),s.wc(56,"value-pin-fill-color($color)"),s.Qb(),s.Qb(),s.Rb(57,"td"),s.wc(58,"Sets the fill color of the value indicator pin"),s.Qb(),s.Qb(),s.Rb(59,"tr"),s.Rb(60,"td"),s.Rb(61,"code"),s.wc(62,"value-pin-ink-color($color)"),s.Qb(),s.Qb(),s.Rb(63,"td"),s.wc(64,"Sets the ink color of the value indicator pin"),s.Qb(),s.Qb(),s.Qb(),s.Qb(),s.Qb())},directives:[c.l],encapsulation:2}),e})()},{path:"examples",component:(()=>{class e{constructor(){this.max=50,this.min=10,this.value=25,this.discreteValue=50,this.sliderModel=10,this.exampleEvents="import {MdcSliderChange} from '@angular-mdc/web';\n\nonInput(event: MdcSliderChange): void {\n  console.log(event.value);\n}\n\nonChange(event: MdcSliderChange): void {\n  console.log(event.value);\n}",this.exampleContinuous={html:'<mdc-slider [min]="0" [max]="100" value="50"\n  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>',ts:this.exampleEvents},this.exampleDiscrete={html:'<mdc-slider discrete [min]="0" [max]="100" value="25"\n  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>',ts:this.exampleEvents},this.exampleDiscreteTickMarks={html:'<mdc-slider discrete markers [min]="0" [max]="100" [step]="5" [value]="20"\n  (input)="onInput($event)" (change)="onChange($event)"></mdc-slider>',ts:this.exampleEvents},this.exampleCustomRange={html:'<mdc-slider #ranged discrete min="500" max="1000" value="500"></mdc-slider>'},this.exampleNgModel={html:'<mdc-slider [min]="0" [max]="100" [(ngModel)]="sliderModel"></mdc-slider>',ts:"sliderModel: number = 10;"},this.exampleTheme={html:'<mdc-slider discrete markers class="demo-slider-custom" value="20"></mdc-slider>',sass:"https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_slider.scss"}}onInput(e){this.continuousInputEventValue=e.value}onChange(e){this.continuousChangeEventValue=e.value}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s.Fb({type:e,selectors:[["ng-component"]],decls:90,vars:30,consts:[[1,"demo-content"],[1,"demo-content__headline"],["value","50","name","test",3,"min","max","input","change"],["continuous",""],["label","Min","size","1","min","0","max","200","type","number","value","0"],["continuousMin",""],["label","Max","type","number","size","1","min","0","max","200","value","100"],["continuousMax",""],[1,"demo-layout__row"],[3,"change"],[3,"example"],["discrete","",3,"min","max","value","input","change"],["discrete",""],["label","Min","type","number","size","1","min","0","max","200","value","0"],["discreteMin",""],["discreteMax",""],["discrete","","markers","","value","20",3,"min","max","step","input","change"],["demomarkers",""],["dmMin",""],["dmMax",""],["label","Step","type","number","size","1","min","0","max","10","value","5"],["dmStep",""],["discrete","","min","500","max","1000","value","500"],["ranged",""],[3,"min","max","ngModel","ngModelChange"],["demoModel",""],["discrete","","markers","","value","20",1,"demo-slider-custom"]],template:function(e,t){if(1&e){const e=s.Sb();s.Rb(0,"div",0),s.Rb(1,"h3",1),s.wc(2,"Continuous"),s.Qb(),s.Rb(3,"mdc-slider",2,3),s.Zb("input",(function(e){return t.onInput(e)}))("change",(function(e){return t.onChange(e)})),s.Qb(),s.Mb(5,"mdc-text-field",4,5),s.Mb(7,"mdc-text-field",6,7),s.Rb(9,"div",8),s.Rb(10,"mdc-form-field"),s.Rb(11,"mdc-checkbox",9),s.Zb("change",(function(){s.pc(e);const t=s.oc(4);return t.disabled=!t.disabled})),s.Qb(),s.Rb(12,"label"),s.wc(13,"Disabled"),s.Qb(),s.Qb(),s.Qb(),s.Rb(14,"p"),s.wc(15),s.Qb(),s.Rb(16,"p"),s.wc(17),s.Qb(),s.Rb(18,"p"),s.wc(19),s.Qb(),s.Mb(20,"example-viewer",10),s.Qb(),s.Rb(21,"div",0),s.Rb(22,"h3",1),s.wc(23,"Discrete"),s.Qb(),s.Rb(24,"mdc-slider",11,12),s.Zb("input",(function(e){return t.discreteInputEventValue=e.value}))("change",(function(e){return t.discreteChangeEventValue=e.value})),s.Qb(),s.Mb(26,"mdc-text-field",13,14),s.Mb(28,"mdc-text-field",6,15),s.Rb(30,"div",8),s.Rb(31,"mdc-form-field"),s.Rb(32,"mdc-checkbox",9),s.Zb("change",(function(){s.pc(e);const t=s.oc(25);return t.disabled=!t.disabled})),s.Qb(),s.Rb(33,"label"),s.wc(34,"Disabled"),s.Qb(),s.Qb(),s.Qb(),s.Rb(35,"p"),s.wc(36),s.Qb(),s.Rb(37,"p"),s.wc(38),s.Qb(),s.Rb(39,"p"),s.wc(40),s.Qb(),s.Mb(41,"example-viewer",10),s.Qb(),s.Rb(42,"div",0),s.Rb(43,"h3",1),s.wc(44,"Discrete with Tick Marks"),s.Qb(),s.Rb(45,"mdc-slider",16,17),s.Zb("input",(function(e){return t.markersInputEventValue=e.value}))("change",(function(e){return t.markersChangeEventValue=e.value})),s.Qb(),s.Mb(47,"mdc-text-field",13,18),s.Mb(49,"mdc-text-field",6,19),s.Mb(51,"mdc-text-field",20,21),s.Rb(53,"div",8),s.Rb(54,"mdc-form-field"),s.Rb(55,"mdc-checkbox",9),s.Zb("change",(function(){s.pc(e);const t=s.oc(46);return t.disabled=!t.disabled})),s.Qb(),s.Rb(56,"label"),s.wc(57,"Disabled"),s.Qb(),s.Qb(),s.Qb(),s.Rb(58,"p"),s.wc(59),s.Qb(),s.Rb(60,"p"),s.wc(61),s.Qb(),s.Rb(62,"p"),s.wc(63),s.Qb(),s.Mb(64,"example-viewer",10),s.Qb(),s.Rb(65,"div",0),s.Rb(66,"h3",1),s.wc(67,"Custom range"),s.Qb(),s.Mb(68,"mdc-slider",22,23),s.Rb(70,"p"),s.wc(71),s.Qb(),s.Rb(72,"p"),s.wc(73),s.Qb(),s.Rb(74,"p"),s.wc(75),s.Qb(),s.Mb(76,"example-viewer",10),s.Qb(),s.Rb(77,"div",0),s.Rb(78,"h3",1),s.wc(79,"ngModel"),s.Qb(),s.Rb(80,"mdc-slider",24,25),s.Zb("ngModelChange",(function(e){return t.sliderModel=e})),s.Qb(),s.Rb(82,"p"),s.wc(83),s.Qb(),s.Mb(84,"example-viewer",10),s.Qb(),s.Rb(85,"div",0),s.Rb(86,"h3",1),s.wc(87,"Theme"),s.Qb(),s.Mb(88,"mdc-slider",26),s.Mb(89,"example-viewer",10),s.Qb()}if(2&e){const e=s.oc(4),n=s.oc(6),i=s.oc(8),r=s.oc(25),a=s.oc(27),o=s.oc(29),c=s.oc(46),d=s.oc(48),l=s.oc(50),u=s.oc(52),h=s.oc(69),b=s.oc(81);s.Bb(3),s.ic("min",n.value)("max",i.value),s.Bb(12),s.yc("Value: ",e.value,""),s.Bb(2),s.yc("Last value from input event: ",t.continuousInputEventValue,""),s.Bb(2),s.yc("Last value from change event: ",t.continuousChangeEventValue,""),s.Bb(1),s.ic("example",t.exampleContinuous),s.Bb(4),s.ic("min",a.value)("max",o.value)("value",t.discreteValue),s.Bb(12),s.yc("Value: ",r.value,""),s.Bb(2),s.yc("Last value from input event: ",t.discreteInputEventValue,""),s.Bb(2),s.yc("Last value from change event: ",t.discreteChangeEventValue,""),s.Bb(1),s.ic("example",t.exampleDiscrete),s.Bb(4),s.ic("min",d.value)("max",l.value)("step",u.value),s.Bb(14),s.yc("Value: ",c.value,""),s.Bb(2),s.yc("Last value from input event: ",t.markersInputEventValue,""),s.Bb(2),s.yc("Last value from change event: ",t.markersChangeEventValue,""),s.Bb(1),s.ic("example",t.exampleDiscreteTickMarks),s.Bb(7),s.yc("Min: ",h.min,""),s.Bb(2),s.yc("Max: ",h.max,""),s.Bb(2),s.yc("Value: ",h.value,""),s.Bb(1),s.ic("example",t.exampleCustomRange),s.Bb(4),s.ic("min",0)("max",100)("ngModel",t.sliderModel),s.Bb(3),s.yc("Value: ",b.value,""),s.Bb(1),s.ic("example",t.exampleNgModel),s.Bb(5),s.ic("example",t.exampleTheme)}},directives:[L,F.a,O.a,N.a,P.a,l.k,l.n],encapsulation:2}),e})()}]}];let U=(()=>{class e{}return e.\u0275mod=s.Jb({type:e}),e.\u0275inj=s.Ib({factory:function(t){return new(t||e)},imports:[[r.e.forChild(z)],r.e]}),e})(),j=(()=>{class e{}return e.\u0275mod=s.Jb({type:e}),e.\u0275inj=s.Ib({factory:function(t){return new(t||e)},imports:[[i.a,U]]}),e})()},leug:function(e,t,n){"use strict";var i=n("LuDt");n.d(t,"a",(function(){return i.a}))}}]);