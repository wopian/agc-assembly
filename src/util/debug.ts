import { StatusBarAlignment, window } from 'vscode';

export function debugStatusBar(DEBUG?: boolean) {
    if (DEBUG) {
        const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, -100);
        statusBar.text = 'AGC Assembly Debug';
        statusBar.show();
    }
}
