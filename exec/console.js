#!/usr/bin/env node

const RWSConsole = require('@rws-framework/console');
const path = require('path');

const bootstrap = RWSConsole.rwsCli.bootstrap(['run'], path.join(__dirname, 'actions'));

const argsMod = ['filePath'];
const actionArgs = process.argv.slice(3);

if(actionArgs.length > 1){
    argsMod.push('repoString');
}

if(actionArgs.length > 2){
    argsMod.push('repoPath');
}

if(actionArgs.length > 3){
    argsMod.push('ext');
}

(async () => {
    await bootstrap.run({        
        args: argsMod,
        options: [{
            short: 'c',
            long: 'clear-tmp',
            desc: 'Clear TMP directory after command',
            defaultValue: false,
            parseArg: (value, previous) => {
                return value === '1'
            }
        }]
    });
})();
