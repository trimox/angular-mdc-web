workspace(
    name = "angular_mdc",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Add NodeJS rules
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "d0c4bb8b902c1658f42eb5563809c70a06e46015d64057d25560b0eb4bdc9007",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.5.0/rules_nodejs-1.5.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "check_bazel_version", "node_repositories", "yarn_install")

# The minimum bazel version to use with this repo.
check_bazel_version("2.2.0")

node_repositories(
    node_repositories = {
        "13.12.0-darwin_amd64": ("node-v13.12.0-darwin-x64.tar.gz", "node-v13.12.0-darwin-x64", "8b2209b0cd8d3e7d10a7be1ebbe66fd041eaa3f123faf8ae3c711e012f3d4078"),
        "13.12.0-linux_amd64": ("node-v13.12.0-linux-x64.tar.xz", "node-v13.12.0-linux-x64", "95eb1188872e243323cbc31fc80048be3fdfdda91505c62c80c599281de357ed"),
        "13.12.0-windows_amd64": ("node-v13.12.0-win-x64.zip", "node-v13.12.0-win-x64", "de8445794ecbcfe895f4775417d1e2cc023e2212b1f5d4ff5cc0ed6875f7c911"),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
    node_version = "13.12.0",
    # We do not need to define a specific yarn version as bazel will respect the .yarnrc file
    # and run the version of yarn defined at the set-path value.
    # Since bazel runs yarn from the working directory of the package.json, and our .yarnrc
    # file is in the same directory, it correctly discovers and respects it.  Additionally,
    # it ensures that the yarn environment variable to detect if yarn has already followed
    # the set-path value is reset.
)

yarn_install(
    name = "npm",
    # Redirects Yarn `stdout` output to `stderr`. This ensures that stdout is not accidentally
    # polluted when Bazel runs Yarn. Workaround until the upstream fix is available:
    # https://github.com/bazelbuild/bazel/pull/10611.
    args = ["1>&2"],
    # We add the postinstall patches file, and ngcc main fields update script here so
    # that Yarn will rerun whenever one of these files has been modified.
    data = [
        "//:tools/postinstall/apply-patches.js",
        "//:tools/postinstall/update-ngcc-main-fields.js",
    ],
    package_json = "//:package.json",
    quiet = False,
    yarn_lock = "//:yarn.lock",
)

# Install all bazel dependencies of the @ngdeps npm packages
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Setup TypeScript Bazel workspace
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

# Fetch transitive dependencies which are needed to use the karma rules.
load("@npm_bazel_karma//:package.bzl", "npm_bazel_karma_dependencies")

npm_bazel_karma_dependencies()

# Setup web testing. We need to setup a browser because the web testing rules for TypeScript need
# a reference to a registered browser (ideally that's a hermetic version of a browser)
load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")

web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.2.bzl", "browser_repositories")

browser_repositories(
    chromium = True,
    firefox = True,
)
