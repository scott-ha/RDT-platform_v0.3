var express = require('express');
var router = express.Router();

// var user;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('intro/gallery', {
    title: 'RealDesignTech'
  });
});

module.exports = router;
