import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';

@Injectable()
export class MdcPortalService {
  /** A function that will permanently dispose portal host. */
  private _disposeFn: (() => void) | null;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector) { }

  createComponentRef(component: any, parent: HTMLElement = document.body): ComponentRef<any> {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this._injector);

    this._appRef.attachView(componentRef.hostView);
    this.setDisposeFn(() => {
      this._appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });

    this._addChild(this._getComponentRootNode(componentRef), parent);

    return componentRef;
  }

  private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  private _addChild(child: HTMLElement, parent: HTMLElement) {
    parent.appendChild(child);
  }

  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }

  dispose(): void {
    this._invokeDisposeFn();
  }

  private _invokeDisposeFn(): void {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
}
