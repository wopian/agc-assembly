'use strict';
import * as vscode from 'vscode';

let timeout = null;

let AGC: any = {
    PATTERN: {
        ANNOTATION_COMMENTS: '/##.*/gi',
        COMMENTS: '/#.*/gi',
        LABEL: null,
        DECIMAL_INTERGERS: null,
        OCTAL_INTERGERS: null,
        OPERATORS: null,
        BLOCK_I_DIRECTIVES: null,
        BLOCK_II_DIRECTIVES: null,
        BLOCK_I_DOWNLINK_DIRECTIVES: null,
        BLOCK_II_DOWNLINK_DIRECTIVES: null,
        BLOCK_I_INTERPRETER: null,
        BLOCK_II_INTERPRETER: null,
        BLOCK_I_OPCODES: null,
        BLOCK_II_OPCODES: null,
        BLOCK_I_REGISTERS: null,
        BLOCK_II_REGISTERS: null
    },
    STYLE: {
        INVALID_DEPRECATED: {
            overviewRulerLane: vscode.OverviewRulerLane.Right,
            overviewRulerColor: '#FF0000',
            backgroundColor: '#FF0000',
            light: {
                color: '#FFF'
            },
            dark: {
                color: '#FFF'
            }
        },
        COMMENT_LINE_NUMBERSIGN: {},
        VARIABLE_PARAMETER: {},
        KEYWORD_CONTROL: {},
        KEYWORD_OTHER: {},
        CONSTANT_NUMERIC: {},
        VARIABLE_LANGUAGE: {},
        KEYWORD_OPERATOR: {}
    }
}

let AGS: any = {
    PATTERN: {
        ANNOTATION_COMMENTS: null,
        COMMENTS: null,
        CONSTANTS: null,
        DIRECTIVES: null,
        HACKS: null,
        INSTRUCTIONS: null,
        LABEL: null,
        OPERATORS: null,
        REGISTERS: null,
    },
    STYLE: {
        COMMENT_LINE_NUMBERSIGN: {},
        CONSTANT_NUMERIC: {},
        INVALID_DEPRECATED: {},
        INVALID_ILLEGAL: {},
        KEYWORD_CONTROL: {},
        KEYWORD_OPERATOR: {},
        KEYWORD_OTHER: {},
        VARIABLE_LANGUAGE: {},
        VARIABLE_PARAMETER: {},
    }
}

let ARGUS: any = {
    PATTERN: {
        ANNOTATION_COMMENTS: null,
        ANNOTATION_COMMENTS2: null,
        LOG_SECTION_CARDS: null,
        SOURCE_CARDS: null
    },
    STYLE: {
        COMMENT_LINE_NUMBERSIGN: {},
        CONSTANT_NUMERIC: {},
        INVALID_DEPRECATED: {},
    }
}

let BINSOURCE: any = {
    PATTERN: {
        COMMENTS: null,
        OPERATORS: null,
        KEYWORDS: null,
        DATA: null
    },
    STYLE: {
        COMMENT: {},
        CONSTANT_NUMERIC: {},
        KEYWORD_CONTROL: {},
        KEYWORD_OPERATOR: {}
    }
}

console.log(AGC);
console.log(AGC.PATTERN.ANNOTATION_COMMENTS);
console.log(AGC.STYLE.INVALID_DEPRECATED)

// TODO: Implement above code

const ANNOTATION_PATTERN = /##.*/gi;
const INVALID_DEPRECATED_STYLE = {
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    overviewRulerColor: '#FF0000',
    backgroundColor: '#FF0000',
    light: {
        color: '#FFF'
    },
    dark: {
        color: '#FFF'
    }
};

export function activate(context: vscode.ExtensionContext) {

    let activeEditor = vscode.window.activeTextEditor;
    console.log(activeEditor);

/*
    ┌──────────────────────────────────────────────────────────────────────┐
    │   Set basic language specific options                                │
    └──────────────────────────────────────────────────────────────────────┘

    ※ Tab Size
*/
    activeEditor.options.tabSize = 8;
/*
    ※ Insert Spaces
*/
    activeEditor.options.insertSpaces = false;

    let language: string;
    language = vscode.window.activeTextEditor.document.languageId;
    console.log(`AGC Assembly: Detected '${language}' as active language`);

    let annotationDecorationType = vscode.window.createTextEditorDecorationType(INVALID_DEPRECATED_STYLE);

    if (activeEditor.document.languageId === 'agc') {
        triggerUpdateDecorations();
        console.log('AGC Assembly: activeEditor called triggerUpdateDecorations');
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            triggerUpdateDecorations();
            console.log('AGC Assembly: onDidChangeActiveTextEditor called triggerUpdateDecorations');
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
            console.log('AGC Assembly: onDidChangeTextDocument called triggerUpdateDecorations');
        }
    }, null, context.subscriptions);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
        console.log(`AGC Assembly: triggerUpdateDecorations set timeout to '${timeout}'`);
    }

    function updateDecorations() {
        if (!(activeEditor.document.languageId === 'agc')) {
            console.log('AGC Assembly: No longer active editor');
            return;
        }

        let language: string;
        language = vscode.window.activeTextEditor.document.languageId;

        switch (language) {
            case 'agc':
                console.log('AGC Assembly: Enabled AGC Helper');
                agcHelper();
                break;
            case 'ags':
                console.log('AGC Assembly: AGS helper not implemented');
                break;
            case 'argus':
                console.log('AGC Assembly: helper not implemented');
                break;
            case 'binsource':
                console.log('AGC Assembly: helper not implemented');
                break;
        }

        function agcHelper() {
            let text = activeEditor.document.getText();
            let annotations = [];
            let match;

            while (match = ANNOTATION_PATTERN.exec(text)) {
                let startPos = activeEditor.document.positionAt(match.index);
                let endPos = activeEditor.document.positionAt(match.index + match[0].length);
                let decoration = {
                    range: new vscode.Range(startPos, endPos),
                    hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
                };
                annotations.push(decoration);
            }
            activeEditor.setDecorations(annotationDecorationType, annotations);
        }

    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}