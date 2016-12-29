# AGC Assembly
[Visual Studio Code][0] syntax-highlighting for [Apollo Guidance Computer (AGC)][1] assembly [source code][2].

Based on [AGC Assembly][3] for Sublime Text.

## Languages

- `agc` - AGC (Command Module and Lunar Module) assembly language
- `ags` - AGS (Lunar Module Abort Guidance System) assembly language
- `argus` - ARGUS H800 Assembly Language
- `binsource` - AGC core rope memory binary source files

## Installation

### [Marketplace][3]

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

## Extension Settings

Included are suggested settings files for the three supported filetypes.
Current [VirtualAGC][1] project conventions are to use hard tabs every 8 columns when entering source.

```
{
    "editor.tabSize": 4,
    "editor.insertSpaces": false,
    "editor.detectIndentation": false,
    "editor.acceptSuggestionOnEnter": false,
    "editor.tabCompletion": false,
    "editor.useTabStops": true,
    "editor.trimAutoWhitespace": true,
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

## Release Notes

### 0.0.1

Initial release of AGC Assembly
