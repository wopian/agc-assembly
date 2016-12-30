'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _converter = require('converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
    from: 'yml',
    to: 'plist'
};

var language = function language(_language, index, array) {
    console.log('Building ' + _language[1] + ' (' + (index + 1) + '/' + array.length + ')');
    var from = _fs2.default.createReadStream('./languages/' + _language[0] + '.yaml');
    var to = _fs2.default.createWriteStream('./syntaxes/' + _language[0] + '.tmLanguage');
    var via = (0, _converter2.default)(options);
    from.pipe(via).pipe(to);
};

[["agc", "AGC Assembly"], ["ags", "AGS Assembly"], ["argus", "ARGUS H800 Assembly Language"], ["binsource", "Binsource"]].forEach(language);

console.log('\nDone');