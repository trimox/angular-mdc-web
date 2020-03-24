workspace(
    name = "angular_mdc",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Add NodeJS rules
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "2eca5b934dee47b5ff304f502ae187c40ec4e33e12bcbce872a2eeb786e23269",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.4.1/rules_nodejs-1.4.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "check_bazel_version", "node_repositories", "yarn_install")

# The minimum bazel version to use with this repo.
check_bazel_version("2.2.0")

node_repositories(
    node_repositories = {
        "13.10.1-darwin_amd64": ("node-v13.10.1-darwin-x64.tar.gz", "node-v13.10.1-darwin-x64", "a6a66fdc79e70267fc191f10ee045793240974e1268fdea6c2d28afbc1d635e8"),
        "13.10.1-linux_amd64": ("node-v13.10.1-linux-x64.tar.xz", "node-v13.10.1-linux-x64", "69d69165282d88f321e751f03ee5d3370db65e5ca4c587af24994b12f31d4827"),
        "13.10.1-windows_amd64": ("node-v13.10.1-win-x64.zip", "node-v13.10.1-win-x64", "f9d0aac273a44dbd52dd8cdb3d6c684b68b860d128af58d77a0c08f39f51f229"),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
    node_version = "13.10.1",
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
