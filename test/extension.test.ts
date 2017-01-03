import { expect, assert, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import { window, workspace, Uri, commands } from 'vscode';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, normalize } from 'path';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
import { FileController } from './../src/createFile';
import * as extension from './../src/extension';

use(chaiAsPromise);

suite('Chai Tests', () => {
    let foo = 'bar';

    test('expect foo be a string', () => {
        expect(foo).to.be.a('string');
    });

    test('expect foo to equal bar', () => {
        expect(foo).to.equal('bar');
    });

    test('expect foo to equal bar with promise', () => {
        return assert.eventually.equal(Promise.resolve(foo), 'bar');
    });

    test('expect foo to have length 3', () => {
        expect(foo).to.have.length(3);
    });

    test('expect foo to be a string length 3', () => {
        expect(foo).to.be.a('string')
            .with.length(3);
    });
});

const languages = [
    // { name: 'Foo Assembly', ext: [ 'foo', 'bar' ] },
    { name: 'AGC Assembly', ext: 'agc', lang: 'agc' },
    { name: 'AGS Assembly', ext: 'ags', lang: 'ags' },
    { name: 'AGS Assembly', ext: 'aea', lang: 'ags' },
    { name: 'ARGUS H800 Assembly Language', ext: 'argus', lang: 'argus' },
    { name: 'ARGUS H800 Assembly Language', ext: 'mitigus', lang: 'argus' },
    { name: 'AGC Binsource', ext: 'binsource', lang: 'binsource' }
];

const files = [
    { fileName: 'EXISTING_FILE', content: '# Comment' },
    { fileName: 'NEW_FILE', content: '' }
];

languages.forEach(l => {

    suite(`${l.name} Spec`, () => {
        const specPath = join(__dirname, 'spec', '/');
        const existingContent = '# Existing File!';

        setup(() => {
            mkdirp.sync(specPath);
            let fileName = `EXISTING_FILE.${l.ext}`;
            writeFileSync(join(specPath, fileName), '# Comment');
        });

        teardown(() => {
            if (specPath !== '/') {
                //rimraf.sync(specPath);
            }
        });

        suite('Create File', () => {

            files.forEach(f => {
                test(`create ${f.fileName}.${l.ext}`, () => {
                    let File = new FileController();
                    let fileName = `${f.fileName}.${l.ext}`;
                    let filePath = join(specPath, fileName);
                    File.createFile(filePath).then((returnedFileName) => {
                        expect(returnedFileName).to.equal(filePath);
                        expect(existsSync(filePath)).to.equal('true');
                        expect(readFileSync(filePath)).to.equal(f.content);
                    });
                });
            });
        });

        suite('Check File Language', () => {
            files.forEach(f => {
                test(`expect ${f.fileName}.${l.ext} to open as ${l.name}`, () => {
                    let fileName = `${f.fileName}.${l.ext}`;
                    let filePath = join(specPath, fileName);
                    return workspace.openTextDocument(`${normalize(filePath)}`).then(document => {
                        return assert.eventually.equal(Promise.resolve(document.languageId), l.lang);
                    });
                });
            });
        });

        /*
        suite('Check Language Options', () => {
            files.forEach(f => {
                test(`expect ${f.fileName}.${l.ext} to have tabSize 8`, () => {
                    let fileName = `${f.fileName}.${l.ext}`;
                    let filePath = join(specPath, fileName);
                    return workspace.openTextDocument(`${normalize(filePath)}`).then(document => {
                        //window.activeTextEditor.options.tabSize
                        return assert.eventually.equal(Promise.resolve(window.activeTextEditor.options.tabSize), 8);
                    });
                });
            });
        });
        */
    });
});
