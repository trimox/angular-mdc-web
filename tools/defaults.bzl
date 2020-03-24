# Re-export of Bazel rules with repository-wide defaults

load("@npm_angular_bazel//:index.bzl", _ng_module = "ng_module", _ng_package = "ng_package")
load("@npm_bazel_typescript//:index.bzl", _ts_library = "ts_library")
load("//:packages.bzl", "VERSION_PLACEHOLDER_REPLACEMENTS")
load("//:rollup-globals.bzl", "ROLLUP_GLOBALS")

_DEFAULT_TSCONFIG_BUILD = "//packages:bazel-tsconfig-build.json"

def _getDefaultTsConfig(testonly):
    return _DEFAULT_TSCONFIG_BUILD

def ts_library(tsconfig = None, deps = [], testonly = False, **kwargs):
    # Add tslib because we use import helpers for all public packages.
    local_deps = ["@npm//tslib"] + deps

    if not tsconfig:
        tsconfig = _getDefaultTsConfig(testonly)

    _ts_library(
        tsconfig = tsconfig,
        # The default "ts_library" compiler does not come with "tsickle" available. Since
        # we have targets that use "tsickle" decorator processing, we need to ensure that
        # the compiler could load "tsickle" if needed.
        compiler = "//tools:tsc_wrapped_with_tsickle",
        deps = local_deps,
        **kwargs
    )

def ng_module(
        deps = [],
        srcs = [],
        tsconfig = None,
        module_name = None,
        flat_module_out_file = None,
        testonly = False,
        **kwargs):
    if not tsconfig:
        tsconfig = _getDefaultTsConfig(testonly)

    # We only generate a flat module if there is a "public-api.ts" file that
    # will be picked up by NGC or ngtsc.
    needs_flat_module = "public-api.ts" in srcs

    # Targets which have a module name and are not used for tests, should
    # have a default flat module out file named "index". This is necessary
    # as imports to that target should go through the flat module bundle.
    if needs_flat_module and module_name and not flat_module_out_file and not testonly:
        flat_module_out_file = "index"

    # Workaround to avoid a lot of changes to the Bazel build rules. Since
    # for most targets the flat module out file is "index.js", we cannot
    # include "index.ts" (if present) as source-file. This would resolve
    # in a conflict in the metadata bundler. Once we switch to Ivy and
    # no longer need metadata bundles, we can remove this logic.
    if flat_module_out_file == "index":
        if "index.ts" in srcs:
            srcs.remove("index.ts")

    local_deps = [
        # Add tslib because we use import helpers for all public packages.
        "@npm//tslib",
        "@npm//@angular/platform-browser",
    ]

    # Append given deps only if they're not in the default set of deps
    for d in deps:
        if d not in local_deps:
            local_deps = local_deps + [d]

    _ng_module(
        srcs = srcs,
        module_name = module_name,
        flat_module_out_file = flat_module_out_file,
        deps = local_deps,
        tsconfig = tsconfig,
        testonly = testonly,
        **kwargs
    )

def ng_package(name, data = [], deps = [], globals = ROLLUP_GLOBALS, **kwargs):
    # We need a genrule that copies the license into the current package. This
    # allows us to include the license in the "ng_package".
    native.genrule(
        name = "license_copied",
        srcs = ["//:LICENSE"],
        outs = ["LICENSE"],
        cmd = "cp $< $@",
    )

    # We need a genrule that copies the readme into the current package. This
    # allows us to include the readme in the "ng_package".
    native.genrule(
        name = "readme_copied",
        srcs = ["//:README.md"],
        outs = ["README.md"],
        cmd = "cp $< $@",
    )

    _ng_package(
        name = name,
        globals = globals,
        data = data + [":license_copied", ":readme_copied"],
        # Tslib needs to be explicitly specified as dependency here, so that the `ng_package`
        # rollup bundling action can include tslib. Tslib is usually a transitive dependency of
        # entry-points passed to `ng_package`, but the rule does not collect transitive deps.
        deps = deps + ["@npm//tslib"],
        substitutions = VERSION_PLACEHOLDER_REPLACEMENTS,
        **kwargs
    )
