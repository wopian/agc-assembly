var vscode = require('vscode');

var timeout = null;

var ANNOTATION_PATTERN = /##.*/gi;

var INVALID_DEPRECATED_STYLE = {
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    overviewRulerColor: '#FF0000',
    backgroundColor: '#FF0000',
    light: {
        color: '#FFF'
    },
    dark: {
        // this color will be used in dark color themes
        color: '#FFF'
    }
};

function activate(context) {
    var annotationDecorationType = vscode.window.createTextEditorDecorationType(INVALID_DEPRECATED_STYLE);
    var activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
        triggerUpdateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        activeEditor = editor;
        if (editor) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(function (event) {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
    }

    function updateDecorations() {
        if (!activeEditor) {
            return;
        }
        var text = activeEditor.document.getText();
        var annotations = [];
        var match;
        while (match = ANNOTATION_PATTERN.exec(text)) {
            var startPos = activeEditor.document.positionAt(match.index);
            var endPos = activeEditor.document.positionAt(match.index + match[0].length);
            var decoration = {
                range: new vscode.Range(startPos, endPos),
                //TODO: parse and show fixme content
                hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
            };
            annotations.push(decoration);
        }

        activeEditor.setDecorations(annotationDecorationType, annotations);
    }
}
exports.activate = activate;