'use strict';
import * as fs from 'fs';
import * as converter from 'converter';

const options = {
    from: 'yml',
    to: 'plist'
};

const language = (language, index, array) => {
    console.log(`Building ${language[1]} (${index+1}/${array.length})`);
    const from = fs.createReadStream(`./languages/${language[0]}.yaml`);
    const to = fs.createWriteStream(`./syntaxes/${language[0]}.tmLanguage`);
    const via = converter(options);
    from.pipe(via).pipe(to);
};

[
    ["agc", "AGC Assembly"],
    ["ags", "AGS Assembly"],
    ["argus", "ARGUS H800 Assembly Language"],
    ["binsource", "Binsource"]
].forEach(language);

console.log('\nDone');
