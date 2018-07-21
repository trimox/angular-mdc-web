import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';

import { ComponentType } from './portal';

@Injectable()
export class MdcPortalService {
  /** A function that will permanently dispose portal host. */
  private _disposeFn: (() => void) | null;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector) { }

  createComponentRef<T>(portal: ComponentType<T>, parent: HTMLElement = document.body): ComponentRef<T> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal);
    let componentRef: ComponentRef<T>;

    componentRef = componentFactory.create(this._injector);
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
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
}
