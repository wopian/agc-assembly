import * as converter from 'converter';
import { createReadStream, createWriteStream, mkdir } from 'fs';

/*
    Create syntax directory
*/
mkdir('./out/syntax', (callback) => { return; });

const language = (l, i, a) => {
    console.info(`Building ${l[1]} (${i + 1}/${a.length})`);
    const options = { from: 'yml', to: 'plist' };
    const from = createReadStream(`./syntax/${l[0]}.yaml-tmlanguage`);
    const to = createWriteStream(`./out/syntax/${l[0]}.tmlanguage`);
    const via = converter(options);
    from.pipe(via).pipe(to);
};

const languageOption = (l, i, a) => {
    console.info(`Building ${l[1]} Options (${i + 1}/${a.length})`);
    const options = { from: 'yml', to: 'json' };
    const from = createReadStream(`./syntax/${l[0]}-config.yaml`);
    const to = createWriteStream(`./out/syntax/${l[0]}.json`);
    const via = converter(options);
    from.pipe(via).pipe(to);
};

const syntax = [
    ['agc', 'AGC Assembly'],
    ['ags', 'AGS Assembly'],
    ['argus', 'ARGUS H800 Assembly Language'],
    ['binsource', 'Binsource']
];

syntax.forEach(language);
syntax.forEach(languageOption);
