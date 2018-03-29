export interface MDCGridListAdapter {
  getOffsetWidth: () => number;
  getNumberOfTiles: () => number;
  getOffsetWidthForTileAtIndex: (index: number) => number;
  setStyleForTilesElement: (property: string, value: string) => void;
  registerResizeHandler: (handler: EventListener) => void;
  deregisterResizeHandler: (handler: EventListener) => void;
}
