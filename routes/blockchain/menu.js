var express = require('express');
var router = express.Router();

// var user;
/* GET home page. */
router.get('/', function(req, res, next) {
  // cookie from req.cookies
  var user_name = req.cookies.MY_USER;
  var session = req.session.logined;
  res.render('blockchain/menu', {
    title: 'RealDesignTech',
    session: session,
    user_name: user_name
  });
});

module.exports = router;
