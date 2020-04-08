entryPoints = [
    "base",
    "button",
    "card",
    "checkbox",
    "chips",
    "circular-progress",
    "data-table",
    "dialog",
    "dom",
    "drawer",
    "elevation",
    "fab",
    "floating-label",
    "form-field",
    "line-ripple",
    "linear-progress",
    "list",
    "menu",
    "menu-surface",
    "notched-outline",
    "overlay",
    "icon",
    "icon-button",
    "image-list",
    "radio",
    "ripple",
    "select",
    "scrolling",
    "slider",
    "snackbar",
    "switch",
    "tab",
    "tab-bar",
    "tab-indicator",
    "tab-scroller",
    "textfield",
    "top-app-bar",
    "typography",
]

# List of all non-testing entry-points of the Angular MDC package.
MDC_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not "/testing" in ep
]

# List of all testing entry-points of the Angular MDC package.
MDC_TESTING_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not ep in MDC_ENTRYPOINTS
]

# List of all non-testing entry-point targets of the angular-mdc package.
MDC_TARGETS = ["//packages"] + ["//packages/%s" % ep for ep in MDC_ENTRYPOINTS]

# List of all testing entry-point targets of the Angular MDC package.
MDC_TESTING_TARGETS = ["//packages/%s" % ep for ep in MDC_TESTING_ENTRYPOINTS]
