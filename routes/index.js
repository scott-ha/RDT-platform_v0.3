var express = require('express');
var router = express.Router();

// var user;
/* GET home page. */
router.get('/', function(req, res, next) {
  // cookie from req.cookies
  var user_name = req.cookies.MY_USER;
  var session = req.session.logined;
  console.log(user_name);
  res.render('index', {
    title: 'RealDesignTech',
    session: session,
    user_name: user_name
  });
});

module.exports = router;
