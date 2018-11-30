import { interfaces } from 'inversify';
import {
    createPreferenceProxy,
    PreferenceProxy,
    PreferenceService,
    PreferenceContribution,
    PreferenceSchema,
    PreferenceChangeEvent
} from '@theia/core/lib/browser/preferences';


export interface RustConfiguration {
}
export type RustPreferenceChange = PreferenceChangeEvent<RustConfiguration>;

export const RustPreferences = Symbol('TypescriptPreferences');
export type RustPreferences = PreferenceProxy<RustConfiguration>;

export function createRustPreferences(preferences: PreferenceService): RustPreferences {
    return createPreferenceProxy(preferences, rustPreferenceSchema);
}

export function bindRustPreferences(bind: interfaces.Bind): void {
    bind(RustPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get<PreferenceService>(PreferenceService);
        return createRustPreferences(preferences);
    }).inSingletonScope();

    bind(PreferenceContribution).toConstantValue({ schema: rustPreferenceSchema });
}


export const rustPreferenceSchema: PreferenceSchema = {
    "type": "object",
    "properties": {
        "rust.sysroot": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "--sysroot",
            "scope": "resource"
        },
        "rust.target": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "--target",
            "scope": "resource"
        },
        "rust.rustflags": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "Flags added to RUSTFLAGS.",
            "scope": "resource"
        },
        "rust.clear_env_rust_log": {
            "type": "boolean",
            "default": true,
            "description": "Clear the RUST_LOG environment variable before running rustc or cargo.",
            "scope": "resource"
        },
        "rust.build_lib": {
            "type": [
                "boolean",
                "null"
            ],
            "default": null,
            "description": "Specify to run analysis as if running `cargo check --lib`. Use `null` to auto-detect. (unstable)",
            "scope": "resource"
        },
        "rust.build_bin": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "Specify to run analysis as if running `cargo check --bin <name>`. Use `null` to auto-detect. (unstable)",
            "scope": "resource"
        },
        "rust.cfg_test": {
            "type": "boolean",
            "default": false,
            "description": "Build cfg(test) code. (unstable)",
            "scope": "resource"
        },
        "rust.unstable_features": {
            "type": "boolean",
            "default": false,
            "description": "Enable unstable features.",
            "scope": "resource"
        },
        "rust.wait_to_build": {
            "type": "number",
            "default": 1500,
            "description": "Time in milliseconds between receiving a change notification and starting build.",
            "scope": "resource"
        },
        "rust.show_warnings": {
            "type": "boolean",
            "default": true,
            "description": "Show warnings.",
            "scope": "resource"
        },
        "rust.use_crate_blacklist": {
            "type": "boolean",
            "default": true,
            "description": "Don't index crates on the crate blacklist.",
            "scope": "resource"
        },
        "rust.build_on_save": {
            "type": "boolean",
            "default": false,
            "description": "Only index the project when a file is saved and not on change.",
            "scope": "resource"
        },
        "rust.features": {
            "type": "array",
            "default": [],
            "description": "A list of Cargo features to enable.",
            "scope": "resource"
        },
        "rust.all_features": {
            "type": "boolean",
            "default": false,
            "description": "Enable all Cargo features.",
            "scope": "resource"
        },
        "rust.no_default_features": {
            "type": "boolean",
            "default": false,
            "description": "Do not enable default Cargo features.",
            "scope": "resource"
        },
        "rust.goto_def_racer_fallback": {
            "type": "boolean",
            "default": false,
            "description": "Use racer as a fallback for goto def.",
            "scope": "resource"
        },
        "rust.racer_completion": {
            "type": "boolean",
            "default": true,
            "description": "Enables code completion using racer.",
            "scope": "resource"
        },
        "rust.clippy_preference": {
            "type": "string",
            "enum": [
                "on",
                "opt-in",
                "off"
            ],
            "default": "opt-in",
            "description": "Controls eagerness of clippy diagnostics when available. Valid values are (case-insensitive):\n - \"off\": Disable clippy lints.\n - \"opt-in\": Clippy lints are shown when crates specify `#![warn(clippy)]`.\n - \"on\": Clippy lints enabled for all crates in workspace.\nYou need to install clippy via rustup if you haven't already.",
            "scope": "resource"
        },
        "rust.jobs": {
            "type": [
                "number",
                "null"
            ],
            "default": null,
            "description": "Number of Cargo jobs to be run in parallel.",
            "scope": "resource"
        },
        "rust.all_targets": {
            "type": "boolean",
            "default": true,
            "description": "Checks the project as if you were running cargo check --all-targets (I.e., check all targets and integration tests too).",
            "scope": "resource"
        },
        "rust.target_dir": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "When specified, it places the generated analysis files at the specified target directory. By default it is placed target/rls directory.",
            "scope": "resource"
        },
        "rust.rustfmt_path": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "When specified, RLS will use the Rustfmt pointed at the path instead of the bundled one",
            "scope": "resource"
        },
        "rust.build_command": {
            "type": [
                "string",
                "null"
            ],
            "default": null,
            "description": "EXPERIMENTAL (requires `unstable_features`)\nIf set, executes a given program responsible for rebuilding save-analysis to be loaded by the RLS. The program given should output a list of resulting .json files on stdout. \nImplies `rust.build_on_save`: true.",
            "scope": "resource"
        }
    }
};