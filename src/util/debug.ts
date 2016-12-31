import { window, StatusBarAlignment } from 'vscode';

export function debugStatusBar(DEBUG?: boolean) {
    if (DEBUG) {
        let statusBar = window.createStatusBarItem(StatusBarAlignment.Left, -100);
        statusBar.text = 'AGC Assembly Debug';
        statusBar.show();
    }
}
