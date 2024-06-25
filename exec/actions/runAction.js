const RWSConsole = require('@rws-framework/console');
const RWSManagedConsole = RWSConsole.RWSManagedConsole;
const { runCommand } = RWSConsole.rwsShell;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const rwsLog = console.log;
const { copyFiles } = RWSConsole.rwsFS;
const rwsError = console.error;

const { generateTXTFromGH } = require('../../dist/index');

const defaultArgs = {
    filePath: './tmp/fluentui.txt',
    repoPath: '/',
    repoOwner: 'microsoft',
    repoName: 'fluentui',
    repoBranch: 'master'
}

module.exports = async function (output) {    
    const program = output.program;
    const commandOptions = output.options;
    const command = output.command;    
    const commandArgs = output.rawArgs || [];    
    const args = output.args || defaultArgs;

    const repoStringSplit = args.repoString.split('/');
    const repoDetailsStringSplit = repoStringSplit[1].split(':');

    const repoOwner = args.repoString ? repoStringSplit[0] : defaultArgs.repoOwner;
    const repoName = args.repoString ? repoDetailsStringSplit[0] : defaultArgs.repoName;
    const repoBranch = args.repoString ? repoDetailsStringSplit[1] : defaultArgs.repoBranch;

    const repoPath = args.repoPath || defaultArgs.repoPath;

    if (!commandArgs.length) {
        throw new Error('Command args needed');
    }    

    console.log(chalk.blue('PARSED RUN COMMAND:'), command);
    console.log(chalk.yellow('Command args: '), args);

    generateTXTFromGH(args.filePath, repoPath, {
        owner: repoOwner,
        repo: repoName,
        ref: repoBranch
    });

    return program;
}