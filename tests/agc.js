/* global suite, test */

const assert = require('assert'),
    vscode = require('vscode'),
    agc = require('../src/agc');

suite('Extension Tests', () => {
    test('Something 1', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});
