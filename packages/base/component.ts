import {ElementRef} from '@angular/core';

export class MDCComponent<FoundationType extends any> {
  protected _elementRef: ElementRef;
  protected _foundation: FoundationType;

  constructor(
    elementRef: ElementRef,
    foundation?: FoundationType,
    ...args: Array<unknown>
  ) {
    this._elementRef = elementRef;
    this.initialize(...args);
    // Note that we initialize foundation here and not within the constructor's default param.
    this._foundation = foundation === undefined ? this.getDefaultFoundation() : foundation;
  }

  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
  initialize(..._args: Array<unknown>) {
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.
  }

  getDefaultFoundation(): FoundationType {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
      'foundation class');
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this._foundation.destroy();
  }
}
