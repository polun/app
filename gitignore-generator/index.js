const REPO_URL = 'https://github.com/github/gitignore.git';
const path = require('path');
const simpleGit = require('simple-git')(__dirname);
const fs = require('fs');
const argv = require('yargs').argv;

const dataPath = path.join(__dirname, 'data');

function getData(callback) {
    if (fs.existsSync(dataPath)) {
        const dataFileList = fs.readdirSync(dataPath);
        const dict = {};
        dataFileList.forEach((d) => {
            if (path.extname(d) === '.gitignore') {
                dict[d.slice(0, -10)] = path.join(dataPath, d);
            }
        });

        callback(null, dict);
    } else {
        simpleGit.clone(REPO_URL, dataPath, (err) => {
            if (err) throw err;
        });
    }
}

getData();