# AGC Assembly
[Visual Studio Code][0] syntax-highlighting for
[Apollo Guidance Computer (AGC)][1] assembly [source code][2].

Based on [AGC Assembly][3] for Sublime Text.

## Languages

- `agc` - AGC (Command Module and Lunar Module) assembly language
- `ags` - AGS (Lunar Module Abort Guidance System) assembly language
- `argus` - ARGUS H800 Assembly Language
- `binsource` - AGC core rope memory binary source files

## Installation
<!--
### [Package Control][3]

 - Command Palette (OS X: `Cmd-Shift-P`, Linux/Windows: `Ctrl-Shift-P`)
 - Select `Package Control: Install Package`.
 - Select `AGC Assembly`

Package Control will automatically keep `AGC Assembly` up to date.

## Suggested Settings

Included are suggested settings files for the three supported filetypes.
Current [VirtualAGC][1] project conventions are to use hard tabs every 8
columns when entering source.

```
{
    "tab_size": 8,
    "translate_tabs_to_spaces": false,
    "use_tab_stops": true,
    "detect_indentation": false,
    "auto_indent": true,
    "smart_indent": false,
    "indent_to_bracket": false,
    "trim_automatic_white_space": false,
    "tab_completion": false
}
```

You can set the language-specific settings by opening an AGC/AGS source file
and selecting `Sublime Text` > `Preferences` > `Settings - Syntax-Specific`.
-->
### Manual Installation

- Download the latest [release](https://github.com/wopian/agc-assembly/releases)
- Extract the zip into `%HOMEPATH%/.vscode/extensions`
- Restart Visual Studio Code

## Extension Settings
<!--
Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something
-->
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
$ npm run build
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
