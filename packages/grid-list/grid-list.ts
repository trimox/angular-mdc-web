import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  Platform,
  toNumber,
  toBoolean
} from '@angular-mdc/web/common';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCGridListFoundation } from '@material/grid-list';

const MDC_VALID_ASPECTS = [
  '1x1',
  '16x9',
  '2x3',
  '3x2',
  '4x3',
  '3x4'
];

@Directive({
  selector: 'mdc-grid-tile-title, [mdcGridTileTitle]',
  exportAs: 'mdcGridTileTitle'
})
export class MdcGridTileTitle {
  @HostBinding('class.mdc-grid-tile__title') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-grid-tile-support-text, [mdcGridTileSupportText]',
  exportAs: 'mdcGridTileSupportText'
})
export class MdcGridTileSupportText {
  @HostBinding('class.mdc-grid-tile__support-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-grid-tile-primary, [mdcGridTilePrimary]',
  exportAs: 'mdcGridTilePrimary'
})
export class MdcGridTilePrimary {
  @HostBinding('class.mdc-grid-tile__primary') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcGridTilePrimaryContent], mdc-grid-tile-primary-content',
  exportAs: 'mdcGridTilePrimaryContent'
})
export class MdcGridTilePrimaryContent {
  @HostBinding('class.mdc-grid-tile__primary-content') isHostClass = true;
}

@Directive({
  selector: 'mdc-grid-tile-secondary, [mdcGridTileSecondary]',
  exportAs: 'mdcGridTileSecondary'
})
export class MdcGridTileSecondary {
  @HostBinding('class.mdc-grid-tile__secondary') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-grid-tile, [mdcGridTile]',
  exportAs: 'mdcGridTile'
})
export class MdcGridTile {
  @HostBinding('class.mdc-grid-tile') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-grid-list-tiles, [mdcGridListTiles]',
  exportAs: 'mdcGridListTiles'
})
export class MdcGridListTiles {
  @HostBinding('class.mdc-grid-list__tiles') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-grid-list], mdc-grid-list',
  exportAs: 'mdcGridList',
  template: `
  <mdc-grid-list-tiles>
    <ng-content></ng-content>
  </mdc-grid-list-tiles>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcGridList implements AfterViewInit, AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get narrow(): boolean { return this._narrow; }
  set narrow(value: boolean) {
    this.setNarrow(value);
  }
  protected _narrow: boolean;

  @Input()
  get header(): boolean { return this._header; }
  set header(value: boolean) {
    this.setHeader(value);
  }
  protected _header: boolean = false;

  @Input()
  get aspect(): string { return this._aspect; }
  set aspect(value: string) {
    if (this._foundation && value !== this._aspect) {
      this.setAspect(value);
    }
  }
  protected _aspect: string = '1x1';

  @Input() iconAlign: 'start' | 'end' = 'start';

  @HostBinding('class.mdc-grid-list') isHostClass = true;
  @ContentChildren(MdcGridTile) tiles: QueryList<MdcGridTile>;
  @ContentChildren(MdcGridTileSupportText, { descendants: true }) captions: QueryList<MdcGridTileSupportText>;
  @ContentChildren(MdcIcon, { descendants: true }) icons: QueryList<MdcIcon>;
  @ContentChildren(MdcGridTilePrimary, { descendants: true }) primaries: QueryList<MdcGridTilePrimary>;
  @ViewChild(MdcGridListTiles) gridListTiles: MdcGridListTiles;

  @HostBinding('class.mdc-grid-list--tile-gutter-1') get classGutter(): string {
    return this.narrow ? 'mdc-grid-list--tile-gutter-1' : '';
  }
  @HostBinding('class.mdc-grid-list--header-caption') get classheader(): string {
    return this.header ? 'mdc-grid-list--header-caption' : '';
  }
  @HostBinding('class.mdc-grid-list--with-icon-align-start') get classIconAlignStart(): string {
    return this.icons.length > 0 && this.iconAlign === 'start' ? 'mdc-grid-list--with-icon-align-start' : '';
  }
  @HostBinding('class.mdc-grid-list--with-icon-align-end') get classIconAlignEnd(): string {
    return this.icons.length > 0 && this.iconAlign === 'end' ? 'mdc-grid-list--with-icon-align-end' : '';
  }

  createAdapter() {
    return {
      getOffsetWidth: () => this._getHostElement().offsetWidth,
      getNumberOfTiles: () => this.tiles.length,
      getOffsetWidthForTileAtIndex: (index: number) => {
        const tile = this.getTile(index);
        return tile ? tile.elementRef.nativeElement.offsetWidth : 0;
      },
      setStyleForTilesElement: (property: string, value: string) =>
        this._renderer.setStyle(this.gridListTiles.elementRef.nativeElement, property, value),
      registerResizeHandler: (handler: EventListener) => {
        if (this._platform.isBrowser) {
          window.addEventListener('resize', handler);
        }
      },
      deregisterResizeHandler: (handler: EventListener) => {
        if (this._platform.isBrowser) {
          window.removeEventListener('resize', handler);
        }
      }
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    alignCenter(): void
  };

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation = new MDCGridListFoundation(this.createAdapter());
    this._foundation.init();

    this.setAspect(this.aspect);
  }

  ngAfterContentInit(): void {
    this.captions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      Promise.resolve().then(() => {
        const cssClass = 'mdc-grid-list--twoline-caption';

        this.captions.length > 0 ? this._renderer.addClass(this._getHostElement(), cssClass)
          : this._renderer.removeClass(this._getHostElement(), cssClass);
      });
    });

    this.icons.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      Promise.resolve().then(() => {
        this.icons.forEach(icon => {
          this._renderer.addClass(icon.elementRef.nativeElement, 'mdc-grid-tile__icon');
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._foundation.destroy();
  }

  setNarrow(narrow: boolean): void {
    this._narrow = toBoolean(narrow);
    this._changeDetectorRef.markForCheck();
  }

  setHeader(header: boolean): void {
    this._header = toBoolean(header);
    this._changeDetectorRef.markForCheck();
  }

  setAspect(aspect: string): void {
    if (this._isAspectValid(aspect)) {
      const cssClass = 'mdc-grid-list--tile-aspect-';

      this._renderer.removeClass(this._getHostElement(), `${cssClass}${this.aspect}`);
      this._renderer.addClass(this._getHostElement(), `${cssClass}${aspect}`);
      this._aspect = aspect;

      this._changeDetectorRef.markForCheck();
    }
  }

  getTile(index: number): MdcGridTile | undefined {
    return this.tiles.toArray()[index];
  }

  alignCenter(): void {
    this._foundation.alignCenter();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /** Make sure the aspect is supported. */
  protected _isAspectValid(aspect: string): boolean {
    return MDC_VALID_ASPECTS.indexOf(aspect) > -1 ? true : false;
  }
}
