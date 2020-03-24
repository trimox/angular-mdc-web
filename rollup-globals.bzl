load("//packages:config.bzl", "MDC_ENTRYPOINTS")

# Base rollup globals for everything in the repo. Note that we want to disable
# sorting of the globals as we manually group dict entries.
# buildifier: disable=unsorted-dict-items
ROLLUP_GLOBALS = {
    # Framework packages.
    "@angular/animations": "ng.animations",
    "@angular/common": "ng.common",
    "@angular/common/http": "ng.common.http",
    "@angular/common/http/testing": "ng.common.http.testing",
    "@angular/common/testing": "ng.common.testing",
    "@angular/core": "ng.core",
    "@angular/core/testing": "ng.core.testing",
    "@angular/forms": "ng.forms",
    "@angular/platform-browser": "ng.platformBrowser",
    "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
    "@angular/platform-browser-dynamic/testing": "ng.platformBrowserDynamic.testing",
    "@angular/platform-browser/animations": "ng.platformBrowser.animations",
    "@angular/platform-server": "ng.platformServer",
    "@angular/router": "ng.router",

    # Angular CDK
    "@angular/cdk": "ng.cdk",
    "@angular/cdk/a11y": "ng.cdk.a11y",
    "@angular/cdk/coercion": "ng.cdk.coercion",
    "@angular/cdk/collections": "ng.cdk.collections",
    "@angular/cdk/keycodes": "ng.cdk.keycodes",
    "@angular/cdk/overlay": "ng.cdk.overlay",
    "@angular/cdk/platform": "ng.cdk.platform",
    "@angular/cdk/portal": "ng.cdk.portal",
    "@angular/cdk/scrolling": "ng.cdk.scrolling",

    # Primary entry-points in the project.
    "@angular-mdc/web": "ng.web",

    # MDC Web
    "@material/animation": "mdc.animation",
    "@material/auto-init": "mdc.autoInit",
    "@material/base": "mdc.base",
    "@material/checkbox": "mdc.checkbox",
    "@material/chips": "mdc.chips",
    "@material/circular-progress": "mdc.circularProgress",
    "@material/dialog": "mdc.dialog",
    "@material/data-table": "mdc.dataTable",
    "@material/drawer": "mdc.drawer",
    "@material/floating-label": "mdc.floatingLabel",
    "@material/form-field": "mdc.formField",
    "@material/grid-list": "mdc.gridList",
    "@material/icon-button": "mdc.iconButton",
    "@material/line-ripple": "mdc.lineRipple",
    "@material/linear-progress": "mdc.linearProgress",
    "@material/progress-indicator/component": "mdc.progressIndicator",
    "@material/list": "mdc.list",
    "@material/menu": "mdc.menu",
    "@material/menu-surface": "mdc.menuSurface",
    "@material/notched-outline": "mdc.notchedOutline",
    "@material/radio": "mdc.radio",
    "@material/ripple": "mdc.ripple",
    "@material/select": "mdc.select",
    "@material/slider": "mdc.slider",
    "@material/snackbar": "mdc.snackbar",
    "@material/switch": "mdc.switch",
    "@material/tab": "mdc.tab",
    "@material/tab-bar": "mdc.tabBar",
    "@material/tab-indicator": "mdc.tabIndicator",
    "@material/tab-scroller": "mdc.tabScroller",
    "@material/textfield": "mdc.textfield",
    "@material/top-app-bar": "mdc.topAppBar",

    # Third-party libraries.
    "rxjs": "rxjs",
    "rxjs/operators": "rxjs.operators",
}

# Converts a string from dash-case to lower camel case.
def to_camel_case(input):
    segments = input.split("-")
    return segments[0] + "".join([x.title() for x in segments[1:]])

# Converts an entry-point name to a UMD module name.
# e.g. "snackbar/testing" will become "snackBar.testing".
def to_umd_name(name):
    segments = name.split("/")
    return ".".join([to_camel_case(x) for x in segments])

# Creates globals for a given package and its entry-points.
def create_globals(packageName, entryPoints):
    ROLLUP_GLOBALS.update({
        "@angular-mdc/%s/%s" % (packageName, ep): "ng.%s.%s" % (to_umd_name(packageName), to_umd_name(ep))
        for ep in entryPoints
    })

create_globals(
    "web",
    MDC_ENTRYPOINTS,
)
