# AGC Assembly

[![VS Code Version]][6]
[![VS Code Installs]][6]
[![VS Code Rating]][6]
[![donate badge]][donate]

[![Travis]][8]
[![AppVeyor]][11]
[![David]][9]
[![DavidDev]][10]

[Visual Studio Code][0] extension for syntax highlighting [Apollo Guidance Computer (AGC)][1] assembly [source code][2].

Based on [AGC Assembly][3] for Sublime Text.

## Contents
1. [Languages](#languages)
1. [Marketplace](#marketplace)
1. [Sideloading](#sideloading)
1. [Development](#development)
1. [Releases](#releases)

## Languages
- `agc` - AGC (Command Module and Lunar Module) assembly language,
- `ags` - AGS (Lunar Module Abort Guidance System) assembly language,
- `argus` - ARGUS Honeywell 800 assembly language,
- `binsource` - AGC core rope memory binary source files.

## Marketplace

Install AGC Assembly from [VS Code Marketplace][6].
- Launch VS Code Quick Open (<kbd>Ctrl</kbd>+<kbd>P</kbd>)
- Input `ext install agc-assembly`
- Reload VS Code

## Sideloading

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

## Development

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

### Packaging
```bash
npm i -g vsce
vsce package
```

## Releases
See [CHANGELOG](https://github.com/wopian/agc-assembly/blob/master/CHANGELOG.md)

[Travis]:https://flat.badgen.net/travis/wopian/agc-assembly
[VS Code Version]:http://vsmarketplacebadge.apphb.com/version-short/wopian.agc-assembly.svg?style=flat-square
[VS Code Installs]:http://vsmarketplacebadge.apphb.com/installs/wopian.agc-assembly.svg?style=flat-square
[VS Code Rating]:http://vsmarketplacebadge.apphb.com/rating-short/wopian.agc-assembly.svg?style=flat-square
[David]:https://flat.badgen.net/david/dep/wopian/agc-assembly
[DavidDev]:https://flat.badgen.net/david/dev/wopian/agc-assembly
[AppVeyor]:https://flat.badgen.net/appveyor/ci/wopian/agc-assembly

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
[11]:https://ci.appveyor.com/project/wopian/agc-assembly

[donate]:https://paypal.me/wopian
[donate badge]:https://flat.badgen.net/badge/support%20me%20on/paypal.me/pink
