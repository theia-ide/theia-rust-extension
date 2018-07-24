/*
 * Copyright (C) 2018 David Craven and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { injectable } from 'inversify'
import { LanguageGrammarDefinitionContribution, TextmateRegistry
       } from '@theia/monaco/lib/browser/textmate'
import { RUST_LANGUAGE_ID, RUST_LANGUAGE_NAME } from '../common';

@injectable()
export class RustGrammarContribution implements LanguageGrammarDefinitionContribution {

    // https://github.com/rust-lang-nursery/rls-vscode/blob/master/language-configuration.json
    // https://github.com/rust-lang-nursery/rls-vscode/blob/master/src/extension.ts
    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '\"', close: '\"', notIn: ['string'] },
            { open: '/**', close: ' */', notIn: ['string'] },
            { open: '/*!', close: ' */', notIn: ['string'] }
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '<', close: '>' },
            { open: "'", close: "'" },
            { open: '"', close: '"' }
        ],
        onEnterRules: [
            {
                // Doc single-line comment
                // e.g. ///|
                beforeText: /^\s*\/{3}.*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: '/// '
                },
            },
            {
                // Parent doc single-line comment
                // e.g. //!|
                beforeText: /^\s*\/{2}\!.*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: '//! '
                },
            },
            {
                // Begins an auto-closed multi-line comment (standard or parent doc)
                // e.g. /** | */ or /*! | */
                beforeText: /^\s*\/\*(\*|\!)(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    indentAction: monaco.languages.IndentAction.IndentOutdent,
                    appendText: ' * '
                }
            },
            {
                // Begins a multi-line comment (standard or parent doc)
                // e.g. /** ...| or /*! ...|
                beforeText: /^\s*\/\*(\*|\!)(?!\/)([^\*]|\*(?!\/))*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: ' * '
                }
            },
            {
                // Continues a multi-line comment
                // e.g.  * ...|
                beforeText: /^(\ \ )*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    appendText: '* '
                }
            },
            {
                // Dedents after closing a multi-line comment
                // e.g.  */|
                beforeText: /^(\ \ )*\ \*\/\s*$/,
                action: {
                    indentAction: monaco.languages.IndentAction.None,
                    removeText: 1
                }
            }
        ]
    }

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: RUST_LANGUAGE_ID,
            extensions: ['.rs'],
            aliases: [RUST_LANGUAGE_NAME, 'rust'],
            mimetypes: ['text/x-rust-source', 'text/x-rust'],
        });

        monaco.languages.setLanguageConfiguration(RUST_LANGUAGE_ID, this.config)

        const rustGrammar = require('../../data/rust.tmLanguage.json')
        registry.registerTextMateGrammarScope('source.rust', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: rustGrammar
                }
            }
        });

        registry.mapLanguageIdToTextmateGrammar(RUST_LANGUAGE_ID, 'source.rust');
    }
}
