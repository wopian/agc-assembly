const fs = require('fs'),
    converter = require('converter'),
    options = {
        from: 'yml',
        to: 'plist'
    },
    language = (language, index, array) => {
        console.log(`Building ${language[1]} (${index+1}/${array.length})`);
        const from = fs.createReadStream(`./src/${language[0]}.yaml`),
            to = fs.createWriteStream(`./syntaxes/${language[0]}.tmLanguage`),
            via = converter(options);
        from.pipe(via).pipe(to);
    };

[
    ["agc", "AGC Assembly"],
    ["ags", "AGS Assembly"],
    ["argus", "ARGUS H800 Assembly Language"],
    ["binsource", "Binsource"]
].forEach(language);

console.log('\nDone');