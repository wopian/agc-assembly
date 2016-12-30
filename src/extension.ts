'use strict';
import * as vscode from 'vscode';
import agc from './syntax/agc';

let timeout = null,
    ANNOTATION_PATTERN = /##.*/gi,
    INVALID_DEPRECATED_STYLE = {
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

    let annotationDecorationType = vscode.window.createTextEditorDecorationType(INVALID_DEPRECATED_STYLE),
        activeEditor = vscode.window.activeTextEditor;

    if (activeEditor)
        triggerUpdateDecorations();

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor)
            triggerUpdateDecorations();
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document)
            triggerUpdateDecorations();
    }, null, context.subscriptions);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
    }

    function updateDecorations() {
        if (!activeEditor)
            return;

        let text = activeEditor.document.getText(),
            annotations = [],
            match;

        while (match = ANNOTATION_PATTERN.exec(text)) {
            let startPos = activeEditor.document.positionAt(match.index),
                endPos = activeEditor.document.positionAt(match.index + match[0].length),
                decoration = {
                    range: new vscode.Range(startPos, endPos),
                    hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
                };
            annotations.push(decoration);
        }

        activeEditor.setDecorations(annotationDecorationType, annotations);
    }

}

// this method is called when your extension is deactivated
//export function deactivate() {
//}