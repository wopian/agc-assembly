var vscode = require('vscode');

var timeout = null;

var COMMENT_PATTERN = /##/gi;

var COMMENT_STYLE = {
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    overviewRulerColor: '#F06292',
    backgroundColor: '#F06292',
    light: {
        color: '#fff'
    },
    dark: {
        // this color will be used in dark color themes
        color: '#fff'
    }
};

function activate(context) {
    var commentDecorationType = vscode.window.createTextEditorDecorationType(COMMENT_STYLE);
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
        var comments = [];
        var match;
        while (match = COMMENT_PATTERN.exec(text)) {
            var startPos = activeEditor.document.positionAt(match.index);
            var endPos = activeEditor.document.positionAt(match.index + match[0].length);
            var decoration = {
                range: new vscode.Range(startPos, endPos),
                //TODO: parse and show fixme content
                hoverMessage: 'Deprecated: Annotation comments. Use # instead'
            };
            comments.push(decoration);
        }

        activeEditor.setDecorations(commentDecorationType, comments);
    }
}
exports.activate = activate;