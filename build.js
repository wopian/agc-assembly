var fs        = require('fs'),
    converter = require('converter'),
    options   = {
        from: 'yml',
        to: 'plist'
    },
    syntax = [
        [ "agc", "AGC Assembly"],
        [ "ags", "AGS Assembly"],
        [ "argus", "ARGUS H800 Assembly Language"],
        [ "binsource", "Binsource"]
    ];

syntax.forEach((language) => {
    console.log(`Building ${language[1]}`);
    const from = fs.createReadStream(`./syntaxes/${language[0]}.yaml-tmLanguage`),
          to   = fs.createWriteStream(`./syntaxes/${language[0]}.tmLanguage`),
          via  = converter(options);
    from.pipe(via).pipe(to);
});