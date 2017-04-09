const express = require('express');
const bodyParser = require('body-parser');
let simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs-extra')

const config = {
    targetDir: 'E:\\Code\\Test\\',
    targetName: 'polunzhtest',
    githubRepo: 'https://www.github.com/polunzh/test',
    githubBranch: 'master'
};


const app = express();
const PORT = '8099';

app.use(bodyParser.json());
app.post('/polunzh/test', (req, res, next) => {
    if (req.get('X-GitHub-Event').toUpperCase() === 'PUSH') {
        const tempDir = 'temp_' + config.targetName + Date.now();
        simpleGit = simpleGit(config.targetDir);
        try {
            simpleGit.clone(config.githubRepo,
                `${path.join(config.targetDir,tempDir)}`, {
                    bare: true
                },
                (err) => {
                    if (err) {
                        throw err;
                        return;
                    }

                    fs.move(path.join(config.targetDir, config.targetName),
                        path.join(config.targetDir, tempDir), err => {
                            if (err) return console.error(err);

                            console.log('success!');
                        });
                });
        } finally {
            console.log('finally')
            fs.removeSync(tempDir);
        }
    }

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});