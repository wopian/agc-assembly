/* global suite, test */

import assert from 'assert';
import vscode from 'vscode';
import agc from './lib/agc'; // Valid for compiled location

describe('Extension Tests', () => {
    it('should do something', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});