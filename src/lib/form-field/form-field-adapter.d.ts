export interface MDCFormFieldAdapter {
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  activateInputRipple: () => void;
  deactivateInputRipple: () => void;
}
