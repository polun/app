const express = require('express');
const fs = require('fs');
const axios = require('axios');
const process = require('process');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

if (!fs.existsSync('./config.js')) {
    console.log('`config.js` file does not exist!');
    process.exit(1);
}

const config = require('./config');

app.get('/getcode', (req, res, next) => {
    console.log('start get code.');
    res.redirect(`${config.url}?API_Key=${config.appKey}&redirect_uri=${config.redirectUrl}`);
});

app.post('/oatuh2/callback', urlencodedParser, (req, res, next) => {
    let code = req.body.code;
    console.log(`fetched code: ${code}`);

    axios({
        method: 'post',
        url: `${config.tokenUrl}?API_Key=${config.appKey}&Secret_Key=${config.secretKey}&Redirect_uri=${config.redirectUrl}&Code=${code}`
    }).then((res) => {
        console.log('-'.repeat(10));
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(8099, () => {
    console.log('Server start on port 8099');
});