let express = require('express');
let router = express.Roiuter();

router.get('/third/github', function (req, res, next) {
    res.redirect('https://github.com/login/oauth/authorize?'
        + 'client_id=e6fae9923f064fa2687f&redirect_uri=http://polun.me.tunnel.qydev.com:8082/third/github/oauth2callback'
    );
});

router.get('/third/github/oauth2callback', function (req, res) {
    console.log(req);
});
module.exports = router;