var express = require('express');
var router = express.Router();

/* GET home page. */
// need to check session

router.get('/', function(req, res, next) {
  // session false
  req.session.logined = false;
  // clear cookies
  res.clearCookie('MY_USER').redirect('/');
});

module.exports = router;
