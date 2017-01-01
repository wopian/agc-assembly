# AGC Assembly
[Visual Studio Code][0] extension for syntax highlighting [Apollo Guidance Computer (AGC)][1] assembly [source code][2].

Based on [AGC Assembly][3] for Sublime Text.

## Languages
- `agc` - AGC (Command Module and Lunar Module) assembly language,
- `ags` - AGS (Lunar Module Abort Guidance System) assembly language,
- `argus` - ARGUS H800 Assembly Language,
- `binsource` - AGC core rope memory binary source files.

## Marketplace
[![VS Code Version]][6]
[![VS Code Installs]][6]
[![VS Code Rating]][6]

Install AGC Assembly from [VS Code Marketplace][6].
- Launch VS Code Quick Open (<kbd>Ctrl</kbd>+<kbd>P</kbd>)
- Input `ext install agc-assembly`
- Reload VS Code

## Sideloading
[![GitHub Release]][7]
[![Github All Releases]][7]

### From Source
- Download the [latest release][7]
- Extract the zip into:
    - **Windows** `%HOMEPATH%/.vscode/extensions`
    - **Mac** `~/.vscode/extensions`
    - **Linux** `~/.vscode/extensions`
- Reload VS Code

### From VSIX
- Download the VSIX binary from the [latest release][7]
- Launch VS Code Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or <kbd>F1</kbd>)
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

## Development

[![Travis]][8]
[![David]][9]
[![DavidDev]][10]

### Setup
```bash
# Check you're using NodeJS 7.0.0 or above
node -v
# Check you're using npm 4.0.0 or above
npm -v
# Download source code
git clone https://github.com/wopian/agc-assembly.git
cd agc-assembly
# Install dependencies
npm i
```

### Building
```bash
# Compile typescript & yaml
npm run b
```

### Testing
```bash
npm t
```

## Known Issues
- Decoration is still applied if the file's language is changed. 
  - This can temporarily be fixed by just switching tabs.

## Releases
## 0.1.3 - 2016-12-30
### Changed
- Rewrote source code in TypeScript
- Merged `languages` back into `syntax`

### Added
- Barebones helper for AGC

### 0.1.2 - 2016-12-29
#### Fixed
- Typo causing AGS and Argus to fail

### 0.1.1 - 2016-12-29
#### Added
- Missing comment definitions

#### Changed
- Moved language test files to samples
- Moved images into `./images`
- Moved build script into `./src`

#### Fixed
- Argus language tokenizer failure

### 0.1.0 - 2016-12-29
#### Changed
- Reorganised source files

### 0.0.3 - 2016-12-29
#### Added
- Remainder of documentation
- Package icon

#### Fixed
- Typo in settings

[Travis]:https://img.shields.io/travis/wopian/agc-assembly.svg?style=flat-square
[GitHub Release]:https://img.shields.io/github/release/wopian/agc-assembly.svg?style=flat-square
[GitHub All Releases]:https://img.shields.io/github/downloads/wopian/agc-assembly/total.svg?style=flat-square
[VS Code Version]:http://vsmarketplacebadge.apphb.com/version-short/wopian.agc-assembly.svg?style=flat-square
[VS Code Installs]:http://vsmarketplacebadge.apphb.com/installs/wopian.agc-assembly.svg?style=flat-square
[VS Code Rating]:http://vsmarketplacebadge.apphb.com/rating-short/wopian.agc-assembly.svg?style=flat-square
[David]:https://img.shields.io/david/wopian/agc-assembly.svg?style=flat-square
[DavidDev]:https://img.shields.io/david/dev/wopian/agc-assembly.svg?style=flat-square

[0]:https://code.visualstudio.com/
[1]:http://www.ibiblio.org/apollo/
[2]:https://github.com/rburkey2005/virtualagc
[3]:https://github.com/jimlawton/AGC-Assembly
[4]:https://nodejs.org/en/
[5]:https://www.npmjs.com/
[6]:https://marketplace.visualstudio.com/items?itemName=wopian.agc-assembly
[7]:https://github.com/wopian/agc-assembly/releases
[8]:https://travis-ci.org/wopian/agc-assembly
[9]:https://david-dm.org/wopian/agc-assembly
[10]:https://david-dm.org/wopian/agc-assembly?type=dev
