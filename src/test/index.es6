import testRunner from 'vscode/lib/testrunner';
import agc from 'agc';

testRunner.configure({
    ui: 'tdd',
    useColors: true
});
export default testRunner;