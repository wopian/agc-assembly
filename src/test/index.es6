import testRunner from 'vscode/lib/testrunner';

testRunner.configure({
    ui: 'tdd',
    useColors: true
});
export default testRunner;