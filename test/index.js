'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _testrunner = require('vscode/lib/testrunner');

var _testrunner2 = _interopRequireDefault(_testrunner);

var _agc = require('agc');

var _agc2 = _interopRequireDefault(_agc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_testrunner2.default.configure({
    ui: 'tdd',
    useColors: true
});
exports.default = _testrunner2.default;