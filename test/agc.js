'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _vscode = require('vscode');

var _vscode2 = _interopRequireDefault(_vscode);

var _agc = require('./lib/agc');

var _agc2 = _interopRequireDefault(_agc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Valid for compiled location

describe('Extension Tests', function () {
    it('should do something', function () {
        _assert2.default.equal(-1, [1, 2, 3].indexOf(5));
        _assert2.default.equal(-1, [1, 2, 3].indexOf(0));
    });
}); /* global suite, test */