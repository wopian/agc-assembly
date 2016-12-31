import { window, workspace, StatusBarAlignment, OverviewRulerLane, ExtensionContext, Range } from 'vscode';
import * as AGC from './helpers/agc';
import * as AGS from './helpers/ags';
import * as ARGUS from './helpers/argus';
import * as BINSOURCE from './helpers/binsource';

let DEBUG: boolean = true;
if (DEBUG) {
    let statusBar = window.createStatusBarItem(StatusBarAlignment.Left, -100);
    statusBar.text = 'AGC Assembly Debug Mode';
    statusBar.show();
}

let timeout = null;

export function activate(context: ExtensionContext) {


    let activeEditor = window.activeTextEditor;
    let language: string;
    language = window.activeTextEditor.document.languageId;
    if (DEBUG) console.log(`AGC Assembly: Detected '${language}' as active language`);

    if (language !== ('agc' || 'ags' || 'argus' || 'binsource')) {
        console.error(`AGC Assembly: Detected '${language}' as active language`);
        return;
    }

    switch (language) {
        case 'agc':
            var INVALID_DEPRECATED = window.createTextEditorDecorationType(AGC.STYLE.INVALID_DEPRECATED);
            var COMMENT_LINE_NUMBERSIGN = window.createTextEditorDecorationType(AGC.STYLE.COMMENT_LINE_NUMBERSIGN);
            var VARIABLE_PARAMETER = window.createTextEditorDecorationType(AGC.STYLE.VARIABLE_PARAMETER);
            var KEYWORD_CONTROL = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_CONTROL);
            var KEYWORD_OTHER = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_OTHER);
            var CONSTANT_NUMERIC = window.createTextEditorDecorationType(AGC.STYLE.CONSTANT_NUMERIC);
            var VARIABLE_LANGUAGE = window.createTextEditorDecorationType(AGC.STYLE.VARIABLE_LANGUAGE);
            var KEYWORD_OPERATOR = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_OPERATOR);
            break;
        case 'ags':
            var COMMENT_LINE_NUMBERSIGN = window.createTextEditorDecorationType(AGC.STYLE.COMMENT_LINE_NUMBERSIGN);
            var CONSTANT_NUMERIC = window.createTextEditorDecorationType(AGC.STYLE.CONSTANT_NUMERIC);
            var INVALID_DEPRECATED = window.createTextEditorDecorationType(AGC.STYLE.INVALID_DEPRECATED);
            var INVALID_ILLEGAL = window.createTextEditorDecorationType(AGC.STYLE.INVALID_ILLEGAL);
            var KEYWORD_CONTROL = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_CONTROL);
            var KEYWORD_OPERATOR = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_OPERATOR);
            var KEYWORD_OTHER = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_OTHER);
            var VARIABLE_LANGUAGE = window.createTextEditorDecorationType(AGC.STYLE.VARIABLE_LANGUAGE);
            var VARIABLE_PARAMETER = window.createTextEditorDecorationType(AGC.STYLE.VARIABLE_PARAMETER);
            break;
        case 'argus':
            var COMMENT_LINE_NUMBERSIGN = window.createTextEditorDecorationType(AGC.STYLE.COMMENT_LINE_NUMBERSIGN);
            var CONSTANT_NUMERIC = window.createTextEditorDecorationType(AGC.STYLE.CONSTANT_NUMERIC);
            var INVALID_DEPRECATED = window.createTextEditorDecorationType(AGC.STYLE.INVALID_DEPRECATED);
            break;
        case 'binsource':
            var COMMENT = window.createTextEditorDecorationType(AGC.STYLE.COMMENT);
            var CONSTANT_NUMERIC = window.createTextEditorDecorationType(AGC.STYLE.CONSTANT_NUMERIC);
            var KEYWORD_CONTROL = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_CONTROL);
            var KEYWORD_OPERATOR = window.createTextEditorDecorationType(AGC.STYLE.KEYWORD_OPERATOR);
            break;
    }
/*
    ┌──────────────────────────────────────────────────────────────────────┐
    │   Set options                                                        │
    └──────────────────────────────────────────────────────────────────────┘
*/
    switch (language) {
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

    window.onDidChangeTextEditorOptions(options => {
        if (options) updateOptions(AGC.OPTION);
    }, null, context.subscriptions);

    function updateOptions(OPTION) {
        activeEditor.options.tabSize = OPTION.TABSIZE ? OPTION.TABSIZE : activeEditor.options.tabSize;
        activeEditor.options.insertSpaces = OPTION.INSERTSPACES ? OPTION.INSERTSPACES : activeEditor.options.insertSpaces;
        if (DEBUG) console.log(
            `AGC Assembly: Set tabSize to ${OPTION.TABSIZE}\n` +
            `AGC Assembly: Set insertSpaces to ${OPTION.INSERTSPACES}`);
    }

    if (language === ('agc' || 'ags' || 'argus' || 'binsource')) triggerUpdateDecorations();

    window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) triggerUpdateDecorations();
    }, null, context.subscriptions);

    workspace.onDidChangeTextDocument(event => {
        console.log(event.document.languageId);
        if (activeEditor && event.document === activeEditor.document) triggerUpdateDecorations();
    }, null, context.subscriptions);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
    }

    function updateDecorations() {
        if (!activeEditor) return;

        if (language !== ('agc' || 'ags' || 'argus' || 'binsource')) {
            console.error(`AGC Assembly: Detected '${language}' as active language`);
            return;
        }

        switch (language) {
            case 'agc':
                console.log('AGC Assembly: Enabled AGC Helper');
                break;
            case 'ags':
                console.log('AGC Assembly: AGS Helper Not Implemented');
                break;
            case 'argus':
                console.log('AGC Assembly: Argus Helper Not Implemented');
                break;
            case 'binsource':
                console.log('AGC Assembly: Binsource Helper Not Implemented');
                break;
        }

        var text = activeEditor.document.getText();
        var helper = [];
        var match;

        while (match = AGC.PATTERN.ANNOTATION_COMMENTS.exec(text)) {
            var startPos = activeEditor.document.positionAt(match.index);
            var endPos = activeEditor.document.positionAt(match.index + match[0].length);
            var decoration = {
                range: new Range(startPos, endPos),
                hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
            }
            helper.push(decoration);
        }
        activeEditor.setDecorations(INVALID_DEPRECATED, helper);
    }
}

export function deactivate() {
window.createTextEditorDecorationType(AGC.STYLE.INVALID_DEPRECATED).dispose();
}
