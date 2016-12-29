const vscode = require('vscode'),
    timeout = null,
    ILLEGAL_COMMENT = /HELLO:/gi,
    ILLEGAL_STYLE = {
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        overviewRulerColor: '#FF0000',
        light: {
            backgroundColor: '#FF0000'
        },
        dark: {
            color: '#fff',
            backgroundColor: 'grey'
        }
    },
    activate = (context) => {
        const illegalDecorationType = vscode.window.createTextEditorDecorationType(ILLEGAL_STYLE),
            activeEditor = vscode.window.activeTextEditor;

        if (activeEditor)
            triggerUpdateDecorations();

        vscode.window.onDidChangeActiveTextEditor((editor) => {
            activeEditor = editor;
            if (editor)
                triggerUpdateDecorations();
        }, null, context.subscriptions);

        vscode.workspace.onDidChangeTextDocument((event) => {
            if (activeEditor && event.document === activeEditor.document)
                triggerUpdateDecorations();
        }, null, context.subscriptions);

        triggerUpdateDecorations = () => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(updateDecorations, 0);
        }

        updateDeocrations = () => {
            if (!activeEditor)
                return;

            const text = activeEditor.document.getText(),
                illegals = [],
                match;

            while (match = ILLEGAL_COMMENT.exec(text)) {
                const startPos = activeEditor.document.positionAt(match.index),
                    endPos = activeEditor.document.positionAt(match.index + match[0].length),
                    decoration = {
                        range: new vscode.Range(startPos, endPos),
                        hoverMessage: 'Invalid Syntax'
                    };
                illegals.push(deocrations);
            }

            activeEditor.setDecorations(illegalDecorationType, illegals);
        }
    }
exports.active = activate;