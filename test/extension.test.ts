import { expect, assert, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';
import { window, workspace, Uri, commands } from 'vscode';
import * as extension from './../src/extension';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { FileController } from './../src/createFile';

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
    { name: 'AGC Assembly', ext: 'agc' },
    { name: 'AGS Assembly', ext: 'ags' },
    { name: 'AGS Assembly', ext: 'aea' },
    { name: 'ARGUS H800 Assembly Language', ext: 'argus' },
    { name: 'ARGUS H800 Assembly Language', ext: 'mitigus' },
    { name: 'AGC Binsource', ext: 'binsource' }
];

const files = [
    { fileName: 'EXISTING_FILE', content: '# Comment' },
    { fileName: 'NEW_FILE', content: '' }
];

languages.forEach(l => {

    suite(`${l.name} Spec`, () => {
        const specPath = path.join(__dirname, 'spec', '/');
        const existingContent = '# Existing File!';

        setup(() => {
            mkdirp.sync(specPath);
            let fileName = `EXISTING_FILE.${l.ext}`;
            fs.writeFileSync(path.join(specPath, fileName), '# Comment');
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
                    let filePath = path.join(specPath, fileName);

                    File.createFile(filePath).then((returnedFileName) => {
                        expect(returnedFileName).to.equal(filePath);
                        expect(fs.existsSync(filePath)).to.equal('true');
                        expect(fs.readFileSync(filePath)).to.equal(f.content);
                    });
                });
            });
        });

        suite('Check File Language', () => {
            files.forEach(f => {
                test(`expect ${f.fileName}.${l.ext} to open as ${l.name}`, () => {
                    let fileName = `${f.fileName}.${l.ext}`;
                    let filePath = path.join(specPath, fileName);
                    return workspace.openTextDocument(`${path.normalize(filePath)}`).then(document => {
                        return assert.eventually.equal(Promise.resolve(document.languageId), l.ext);
                        //let PromisesA = document.languageId;
                        //return Promise.all([
                        //    assert.eventually.equal(Promise.resolve(document.languageId), 'agc')
                        //]);
                        //return assert.eventually.equal(Promise.resolve(document.languageId), 'agc');
                    });
                });
            });
        });

        suite('Check Language Options', () => {
            files.forEach(f => {
                test(`expect ${f.fileName}.${l.ext} to have tabSize 8`, () => {
                    let fileName = `${f.fileName}.${l.ext}`;
                    let filePath = path.join(specPath, fileName);
                    return workspace.openTextDocument(`${path.normalize(filePath)}`).then(document => {
                        //window.activeTextEditor.options.tabSize
                        return assert.eventually.equal(Promise.resolve(window.activeTextEditor.options.tabSize), 8);
                    });
                });
            });
        });
    });
});
