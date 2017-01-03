import { mkdir, createReadStream, createWriteStream } from 'fs';
import * as converter from 'converter';

/*
    Create syntax directory
*/
mkdir('./lib/syntax', (callback) => {});

const language = (l, i, a) => {
    console.log(`Building ${l[1]} (${i + 1}/${a.length})`);
    let options = { from: 'yml', to: 'plist' };
    let from = createReadStream(`./syntax/${l[0]}.yaml-tmlanguage`);
    let to = createWriteStream(`./lib/syntax/${l[0]}.tmLanguage`);
    let via = converter(options);
    from.pipe(via).pipe(to);
};

const languageOption = (l, i, a) => {
    console.log(`Building ${l[1]} Options (${i + 1}/${a.length})`);
    let options = { from: 'yml', to: 'json' };
    let from = createReadStream(`./syntax/${l[0]}-config.yaml`);
    let to = createWriteStream(`./lib/syntax/${l[0]}.json`);
    let via = converter(options);
    from.pipe(via).pipe(to);
};

const syntax = [
    ["agc", "AGC Assembly"],
    ["ags", "AGS Assembly"],
    ["argus", "ARGUS H800 Assembly Language"],
    ["binsource", "Binsource"]
];

syntax.forEach(language);
syntax.forEach(languageOption);
