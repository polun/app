const vscode = require('vscode');
const spawn = require('child_process').spawn;

function activate(context) {
    var disposable = vscode.commands.registerCommand('extension.startGit', function () {
        const {
            shellPath,
            cwd
        } = readOptions();

        const child = spawn('cmd.exe', ['/c', 'start', shellPath], {
            cwd
        });

        child.on('error', (err) => {
            console.error('start git shell error:' + err);
        });
    });

    context.subscriptions.push(disposable);
}

function readOptions() {
    const config = vscode.workspace.getConfiguration('startgit');
    const shellPath = config.get('shellPath');
    let cwd = config.get('cwd');

    if (!shellPath) {
        vscode.window.showErrorMessage('Please set git shell path first!');
        return;
    }

    if (!cwd) {
        cwd = vscode.workspace.rootPath;
    }

    return {
        shellPath,
        cwd
    };
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;