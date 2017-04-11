var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/login', (req, res, next) => {
  var lang = 'vi';
  var user_en = 'user_' + lang;
  console.log(req.body[user_en]);
  console.log(req.body.user_en);
});

module.exports = router;