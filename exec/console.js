#!/usr/bin/env node

const RWSConsole = require('@rws-framework/console');
const path = require('path');

const bootstrap = RWSConsole.rwsCli.bootstrap(['run'], path.join(__dirname, 'actions'));

const argsMod = ['filePath'];
const actionArgs = process.argv.slice(3);

console.log(actionArgs);

if(actionArgs.length > 1){
    argsMod.push('repoString');
}

if(actionArgs.length > 2){
    argsMod.push('repoPath');
}

console.log(argsMod);

(async () => {
    await bootstrap.run({        
        args: argsMod
    });
})();
