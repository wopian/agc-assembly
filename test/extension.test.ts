//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
//import * as assert from 'assert';
import { expect, assert, chai } from 'chai';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { workspace, Uri } from 'vscode';
import * as extension from './../src/extension';

suite('Chai Tests', () => {
    let foo = 'bar';
    test('expect foo be a string', () => {
        expect(foo).to.be.a('string');
    });
    test('expect foo to equal bar', () => {
        expect(foo).to.equal('bar');
    });
    test('expect foo to have length 3', () => {
        expect(foo).to.have.length(3);
    });
    test('expect foo to be a string length 3', () => {
        expect(foo).to.be.a('string')
            .with.length(3);
    });
});

suite('Array', () => {
    suite('#indexOf()', () => {
        test('should return -1 when the value is not present', () => {
            //[1, 2, 3].indexOf(5).should.equal(-1);
            //[1, 2, 3].indexOf(0).should.equal(-1);
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});

suite('Assembly Spec', () => {
    suite('AGC Assembly', () => {
        test('should open .agc', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.agc')).then((document) => {
            });
        });

        test('should detect the file as AGC', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.agc')).then((document) => {
                expect(document.languageId).to.equal('agc');
            });
        });
    });

    suite('AGS Assembly', () => {
        test('should open .aea', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.aea')).then((document) => {
            });
        });

        test('should detect the file as AGS', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.aea')).then((document) => {
                expect(document.languageId).to.equal('aea');
            });
        });
    });

    suite('Argus', () => {
        test('should open .argus', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.argus')).then((document) => {
            });
        });

        test('should detect the file as Argus', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.argus')).then((document) => {
                expect(document.languageId).to.equal('argus');
            });
        });
    });

    suite('Binsource', () => {
        test('should open .binsource', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.binsource')).then((document) => {
            });
        });

        test('should detect the file as Binsource', () => {
            workspace.openTextDocument(Uri.parse('./../spec/SPEC.binsource')).then((document) => {
                expect(document.languageId).to.equal('binsource');
            });
        });
    });
});