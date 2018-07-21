export function isBrowser() {
  return typeof document === 'object' && !!document;
}
