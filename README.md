# AGC Assembly
[![GitHub release](https://img.shields.io/github/release/wopian/agc-assembly.svg?style=flat-square)]()
[![Current Version](http://vsmarketplacebadge.apphb.com/version/wopian.agc-assembly.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=wopian.agc-assembly)
[![Install Count](http://vsmarketplacebadge.apphb.com/installs/wopian.agc-assembly.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=wopian.agc-assembly)
[![Github All Releases](https://img.shields.io/github/downloads/wopian/agc-assembly/total.svg?style=flat-square)](https://github.com/wopian/agc-assembly/releases)
[![David](https://img.shields.io/david/dev/wopian/agc-assembly.svg?style=flat-square)]()

[Visual Studio Code][0] syntax-highlighting for [Apollo Guidance Computer (AGC)][1] assembly [source code][2].

Based on [AGC Assembly][3] for Sublime Text.

## Languages

- `agc` - AGC (Command Module and Lunar Module) assembly language
- `ags` - AGS (Lunar Module Abort Guidance System) assembly language
- `argus` - ARGUS H800 Assembly Language
- `binsource` - AGC core rope memory binary source files

## Installation

### [Marketplace][6]

- Launch VS Code Quick Open (Ctrl+P)
- Input `ext install agc-assembly`
- Reload VS Code

### Sideloading

#### From Source

- Download the [latest release](https://github.com/wopian/agc-assembly/releases)
- Extract the zip into:
    - **Windows** `%HOMEPATH%/.vscode/extensions`
    - **Mac** `~/.vscode/extensions`
    - **Linux** `~/.vscode/extensions`
- Reload VS Code

#### From VSIX

- Download the VSIX binary from the [latest release](https://github.com/wopian/agc-assembly/releases)
- Launch VS Code Command Palette (F1)
- Input `install vsix`
- Navigate to VSIX binary
- Reload VS Code

## Suggested Settings

Current [VirtualAGC][1] project conventions are to use hard tabs every 8 columns when entering source.

### AGC, AGS & Binsource
```json
{
    "editor.detectIndentation": false,
    "editor.insertSpaces": false,
    "editor.tabCompletion": false,
    "editor.tabSize": 8,
    "editor.trimAutoWhitespace": true,
    "editor.useTabStops": true,
    "editor.wordSeparators": " 	",
    "files.trimTrailingWhitespace": true
}
```
### Argus
```json
{
    "editor.detectIndentation": false,
    "editor.insertSpaces": true,
    "editor.rulers": [1, 8, 19, 32, 46, 60, 75, 80, 120],
    "editor.tabCompletion": false,
    "editor.tabSize": 8,
    "editor.trimAutoWhitespace": true,
    "editor.useTabStops": true,
    "files.trimTrailingWhitespace": true
}
```

## Contributing

Pull requests are welcome.

- Install [Node.js][4] v7.x.x or above
- Install [npm][5] v4.x.x or above
- Install package dependencies:
```
$ npm i
```
- Make your changes in the `.yaml-tmLanguage` files—**DO NOT** modify `.tmLanguage` files
- Build your changes:
```
$ npm start
```

[0]:https://code.visualstudio.com/
[1]:http://www.ibiblio.org/apollo/
[2]:https://github.com/rburkey2005/virtualagc
[3]:https://github.com/jimlawton/AGC-Assembly
[4]:https://nodejs.org/en/
[5]:https://www.npmjs.com/
[6]:https://marketplace.visualstudio.com/items?itemName=wopian.agc-assembly

## Known Issues

- AGS and Argus languages fail to tokenise

## Release Notes

### 0.1.0

Changes:
- Reorganised source files

### 0.0.3

Changes:
- Added remainder of documentation

### 0.0.2

Minor bug fixes

### 0.0.1

Initial release of AGC Assembly
