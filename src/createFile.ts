import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as Q from 'q';
import { commands, ExtensionContext, QuickPickItem, QuickPickOptions, TextEditor, window, workspace } from 'vscode';

export class FileController {
    public createFile(newFileName): Q.Promise<string> {
        const deferred: Q.Deferred<string> = Q.defer<string>();
        let dirname: string = path.dirname(newFileName);
        let fileExists: boolean = fs.existsSync(newFileName);

        if (!fileExists) {
            mkdirp.sync(dirname);

            fs.appendFile(newFileName, '', (err) => {
                if (err) {
                    deferred.reject(err);
                    return;
                }

                deferred.resolve(newFileName);
            });
        } else {
            deferred.resolve(newFileName);
        }

        return deferred.promise;
    }
}