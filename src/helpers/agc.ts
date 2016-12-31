import { OverviewRulerLane } from 'vscode';
/*
    ┌──────────────────────────────────────────────────────────────────────┐
    │   AGC                                                                │
    └──────────────────────────────────────────────────────────────────────┘

        ※ Options
            tabSize             number
            insertSpaces        boolean

        ※ Patterns
            .                   regexps

        ※ Styles
            borderColor:        rgba|hex
            borderRadius:       px
            borderSpacing:      px
            borderStyle:        solid|dashed|dotted
            borderWidth:        px
            color:              rgba|hex
            backgroundColor:    rgba|hex
            overviewRulerColor: rgba|hex
            overviewRulerLane:  left|center|right|full
*/
const OPTION: any = {
    TABSIZE: 8,
    INSERTSPACES: false
}

const PATTERN: any = {
    ANNOTATION_COMMENTS: /##.*/gi,
    COMMENTS: /#.*/gi,
    LABEL: null,
    DECIMAL_INTERGERS: null,
    OCTAL_INTERGERS: null,
    OPERATORS: null,
    BLOCK_I_DIRECTIVES: null,
    BLOCK_II_DIRECTIVES: null,
    BLOCK_I_DOWNLINK_DIRECTIVES: null,
    BLOCK_II_DOWNLINK_DIRECTIVES: null,
    BLOCK_I_INTERPRETER: null,
    BLOCK_II_INTERPRETER: null,
    BLOCK_I_OPCODES: null,
    BLOCK_II_OPCODES: null,
    BLOCK_I_REGISTERS: null,
    BLOCK_II_REGISTERS: null
}

const STYLE: any = {
    INVALID_DEPRECATED: {
        overviewRulerLane: OverviewRulerLane.Full,
        //cursor: 'pointer',
        //borderColor: 'rgba(255,255,255,.05)',
        //borderRadius: '10px',
        //borderSpacing: '10px',
        //borderStyle: 'solid',
        //borderWidth: '1px',
        light: {
            //color: '#FFF',
            overviewRulerColor: 'rgba(0,0,255,.3)',
            backgroundColor: 'rgba(0,0,0,.05)'
        },
        dark: {
            //color: '#FFF',
            overviewRulerColor: 'rgba(0,0,255,.3)',
            backgroundColor: 'rgba(255,255,255,.05)'
        }
    },
    COMMENT_LINE_NUMBERSIGN: {},
    VARIABLE_PARAMETER: {},
    KEYWORD_CONTROL: {},
    KEYWORD_OTHER: {},
    CONSTANT_NUMERIC: {},
    VARIABLE_LANGUAGE: {},
    KEYWORD_OPERATOR: {}
}

export const AGC: any = {
    OPTION,
    PATTERN,
    STYLE
}
