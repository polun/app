const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
let simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs-extra')

const config = {
    targetDir: '/home/polunzh/code',
    targetName: 'polunzhtest',
    githubRepo: 'https://www.github.com/polunzh/test',
    githubBranch: 'master'
};

const app = express();
const PORT = '8099';

app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    if (!req.get('X-GitHub-Event')) {
        return res.status(400).send('Invalid request');
    }

    next();
});

app.post('/polunzh/test', (req, res, next) => {
    if (req.get('X-GitHub-Event') === 'push' || req.get('X-GitHub-Event') === 'commit') {
        log(`Event type: [${req.get('X-GitHub-Event')}]`);

        pullLatestRepo((err, result) => {
            if (err) log(err.message);

            res.status(204).send();
        });
    } else {
        log(`Invalid event type: [${req.get('X-GitHub-Event')}]`);
        res.status(400).send('Invalid event type');
    }
});

app.listen(PORT, () => {
    log(`listen on port ${PORT}`);
});

function pullLatestRepo(callback) {
    const tempDir = 'githubhook_temp_' + config.targetName + Date.now();
    simpleGit = simpleGit(config.targetDir);
    simpleGit.clone(config.githubRepo,
        `${path.join(config.targetDir,tempDir)}`, {
            bare: true
        },
        (err) => {
            if (err) {
                return callback(err);
            }

            fs.move(path.join(config.targetDir, tempDir),
                path.join(config.targetDir, config.targetName), {
                    overwrite: true
                },
                err => {
                    if (err) return callback(err);

                    fs.removeSync(tempDir);
                    callback(null);
                });
        });
}

function log(msg) {
    msg = `[${new Date().toLocaleString()}] ${msg} ${os.EOL}`;
    if (app.get('env') === 'development') {
        console.log(msg);
    }

    fs.appendFileSync('log.txt', msg);
}