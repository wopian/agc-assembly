'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.activate = undefined;

var _vscode = require('vscode');

var _vscode2 = _interopRequireDefault(_vscode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = null,
    ANNOTATION_PATTERN = /##.*/gi,
    INVALID_DEPRECATED_STYLE = {
    overviewRulerLane: _vscode2.default.OverviewRulerLane.Right,
    overviewRulerColor: '#FF0000',
    backgroundColor: '#FF0000',
    light: {
        color: '#FFF'
    },
    dark: {
        color: '#FFF'
    }
};

function activate(context) {
    var annotationDecorationType = _vscode2.default.window.createTextEditorDecorationType(INVALID_DEPRECATED_STYLE),
        activeEditor = _vscode2.default.window.activeTextEditor;

    if (activeEditor) triggerUpdateDecorations();

    _vscode2.default.window.onDidChangeActiveTextEditor(function (editor) {
        activeEditor = editor;
        if (editor) triggerUpdateDecorations();
    }, null, context.subscriptions);

    _vscode2.default.workspace.onDidChangeTextDocument(function (event) {
        if (activeEditor && event.document === activeEditor.document) triggerUpdateDecorations();
    }, null, context.subscriptions);

    function triggerUpdateDecorations() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(updateDecorations, 0);
    }

    function updateDecorations() {
        if (!activeEditor) return;

        var text = activeEditor.document.getText(),
            annotations = [],
            match = void 0;

        while (match = ANNOTATION_PATTERN.exec(text)) {
            var startPos = activeEditor.document.positionAt(match.index),
                endPos = activeEditor.document.positionAt(match.index + match[0].length),
                decoration = {
                range: new _vscode2.default.Range(startPos, endPos),
                hoverMessage: 'Deprecated: Annotation comments.\n\nUse single # for comments'
            };
            annotations.push(decoration);
        }

        activeEditor.setDecorations(annotationDecorationType, annotations);
    }
}
exports.activate = activate;