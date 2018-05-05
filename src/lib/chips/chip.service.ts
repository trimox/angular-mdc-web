import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';

@Injectable()
export class MdcChipService {
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector) { }

  createComponentRef(component: any): ComponentRef<any> {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this._injector);
    this._appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  getDomElementFromComponentRef(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  addChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.appendChild(child);
  }

  destroyRef(componentRef: ComponentRef<any>, delay: number) {
    setTimeout(() => {
      this._appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, delay);
  }
}
