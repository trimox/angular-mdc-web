/// Determines if the space key was pressed in a [KeyboardEvent].
///
/// Use this utility because `keyCode` is deprecated in Firefox (and doesn't
/// work for space) and `key` is not yet implemented in Chrome.
export function isSpaceKey(event: KeyboardEvent): boolean {
  // NB: keyCode does not work on Firefox, returning `0` for the space key.
  return event.keyCode != 0 ? event.keyCode == 32 : event.key == ' ';
}
