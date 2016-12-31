import * as vscode from 'vscode';

let DEBUG: boolean = true;
if (DEBUG) {
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -100);
    statusBar.text = 'AGC Assembly Debug Mode';
    statusBar.show();
    //statusBar.color = 'white';
    /*
    updateStatusBarVisibility(vscode.window.activeTextEditor);
    function updateStatusBarVisibility(editor: vscode.TextEditor): void {
        showStatusBar(DEBUG);
    }
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarVisibility);
    updateStatusBarVisibility(vscode.window.activeTextEditor);
    function showStatusBar(show: boolean): void {
        statusBar.show();
    }
    */
}

let timeout = null;

/*
    ┌──────────────────────────────────────────────────────────────────────┐
    │   Initialise Language Specific Options|Patterns|Styles               │
    └──────────────────────────────────────────────────────────────────────┘

        ※ Options
            tabSize             number
            insertSpaces        boolean

        ※ Patterns
            .                   regexp

        ※ Styles
            borderColor:        rgba|hex
            borderRadius:       px
            borderSpacing:      px
            borderStyle:        solid|dashed|dotted
            borderWidth:        px
            color:              rgba|hex
            backgroundColor:    rgba|hex
            overviewRulerColor: rgba|hex
            overviewRulerLane:  left|center|right|full
*/

let AGC: any = {
    OPTION: {
        TABSIZE: 8,
        INSERTSPACES: false
    },
    PATTERN: {
        ANNOTATION_COMMENTS: /##.*/gi,
        COMMENTS: /#.*/gi,
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
            cursor: 'pointer',
            //borderColor: 'rgba(255,255,255,.05)',
            //borderRadius: '10px',
            //borderSpacing: '10px',
            //borderStyle: 'solid',
            //borderWidth: '1px',
            light: {
                //color: '#FFF',
                overviewRulerColor: 'rgba(0,0,0,.1)',
                backgroundColor: 'rgba(0,0,0,.1)'
            },
            dark: {
                //color: '#FFF',
                overviewRulerColor: 'rgba(255,255,255,.1)',
                backgroundColor: 'rgba(255,255,255,.1)'
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
    OPTIONS: {
        TABSIZE: 8,
        INSERTSPACES: false
    },
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
    OPTIONS: {
        TABSIZE: 8,
        INSERTSPACES: true
    },
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
    OPTIONS: {
        TABSIZE: 8,
        INSERTSPACES: false
    },
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

export function activate(context: vscode.ExtensionContext) {
    let activeEditor = vscode.window.activeTextEditor;
    let language: string;
    language = vscode.window.activeTextEditor.document.languageId;
    if (DEBUG) console.log(`AGC Assembly: Detected '${vscode.window.activeTextEditor.document.languageId}' as active language`)

    if (vscode.window.activeTextEditor.document.languageId !== ('agc' || 'ags' || 'argus' || 'binsource')) {
        console.error(`AGC Assembly: Detected '${vscode.window.activeTextEditor.document.languageId}' as active language`);
        return;
    }
/*
    ┌──────────────────────────────────────────────────────────────────────┐
    │   Set options                                                        │
    └──────────────────────────────────────────────────────────────────────┘
*/
    switch (vscode.window.activeTextEditor.document.languageId) {
        case 'agc':
            updateOptions(AGC.OPTION);
            break;
        case 'ags':
            updateOptions(AGS.OPTION);
            break;
        case 'argus':
            updateOptions(ARGUS.OPTION);
            break;
        case 'binsource':
            updateOptions(ARGUS.OPTION);
            break;
    }

    vscode.window.onDidChangeTextEditorOptions(options => {
        if (options) updateOptions(AGC.OPTION)
    });
    function updateOptions(OPTION) {
        activeEditor.options.tabSize = OPTION.TABSIZE ? OPTION.TABSIZE : activeEditor.options.tabSize;
        activeEditor.options.insertSpaces = OPTION.INSERTSPACES ? OPTION.INSERTSPACES : activeEditor.options.insertSpaces;
        if (DEBUG) console.log(
            `AGC Assembly: Set tabSize to ${OPTION.TABSIZE}\n` +
            `AGC Assembly: Set insertSpaces to ${OPTION.INSERTSPACES}`)
    }

    if (language === ('agc' || 'ags' || 'argus' || 'binsource')) triggerUpdateDecorations()

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) triggerUpdateDecorations()
        //}, null, context.subscriptions);
    }, null, null);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) triggerUpdateDecorations()
    //}, null, context.subscriptions);
    }, null, null);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
    }

    function updateDecorations() {
        if (vscode.window.activeTextEditor.document.languageId !== ('agc' || 'ags' || 'argus' || 'binsource')) {
            console.error(`AGC Assembly: Detected '${language}' as active language`);
            return;
        }

        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'agc':
                console.log('AGC Assembly: Enabled AGC Helper');
                //agcHelper();
                for (let key in AGC.STYLE) {
                    let decorationType: Array<1>;
                    decorationType[key] = vscode.window.createTextEditorDecorationType(AGC.STYLE[key]);
                    console.log(`Key: ${key} | Type: ${decorationType}`);;
                }
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

        //function agcHelper() {
            let annotationDecorationType = vscode.window.createTextEditorDecorationType(AGC.STYLE.INVALID_DEPRECATED);

            let text = activeEditor.document.getText();
            let annotations = [];
            let match;

            while (match = AGC.PATTERN.ANNOTATION_COMMENTS.exec(text)) {
                    let startPos = activeEditor.document.positionAt(match.index);
                    let endPos = activeEditor.document.positionAt(match.index + match[0].length);
                    let decoration = {
                        range: new vscode.Range(startPos, endPos),
                        hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
                    };
                    annotations.push(decoration);
            }
            activeEditor.setDecorations(annotationDecorationType, annotations);
       // }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
/*
    TODO: Dispose of decorations
*/
//TextEditorDecorationType;
}
