/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
let _supportsCssVariables: boolean | undefined;

const detectEdgePseudoVarBug = (windowObj: Window): boolean => {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
  return hasPseudoVarBug;
};

export const supportsCssVariables = (windowObj: Window, forceRefresh = false): boolean => {
  // @ts-ignore
  const {CSS} = windowObj;
  let supportsCssVars = _supportsCssVariables;
  if (typeof _supportsCssVariables === 'boolean' && !forceRefresh) {
    return _supportsCssVariables;
  }

  const supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return false;
  }

  const explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    CSS.supports('(--css-vars: yes)') &&
    CSS.supports('color', '#00000000')
  );

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVars = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVars = false;
  }

  if (!forceRefresh) {
    _supportsCssVariables = supportsCssVars;
  }
  return supportsCssVars;
};
