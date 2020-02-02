import {EventSource} from './constants';

/**
 * Describes a parent MdcChipSet component.
 * Contains properties that MdcChip can inherit.
 */
export interface MdcChipSetParentComponent {
  input: boolean;
  filter: boolean;
  choice: boolean;
}

export interface MdcChipInteractionEvent {
  chipId: string;
  value: string | string[] | undefined;
}

export interface MdcChipSelectionEvent extends MdcChipInteractionEvent {
  selected: boolean;
  shouldIgnore: boolean;
}

export interface MdcChipRemovalEvent extends MdcChipInteractionEvent {
  removedAnnouncement: string | null;
}

export interface MdcChipNavigationEvent extends MdcChipInteractionEvent {
  key: string;
  source: EventSource;
}
