var express = require('express');
var router = express.Router();

// var user;
/* GET home page. */
router.get('/', function(req, res, next) {
  // cookie from req.cookies
  res.render('index', {
    title: 'RealDesignTech'
  });
});

module.exports = router;
