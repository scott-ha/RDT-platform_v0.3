var express = require('express');
var router = express.Router();

/* GET home page. */
// /intro/about_rdt
router.get('/ultiracer', function(req, res, next) {
  // no need in intro
  // var user_name = req.cookies.MY_USER;
  // var session = req.session.logined;

  res.render('intro/ultiracer', {
    title: 'RealDesignTech'
    // session: session,
    // user_name: user_name
  });
});

// /intro/about_rdt
router.get('/about_rdt', function (req, res, next) {
  res.render('intro/about_rdt', {
    title: 'RealDesignTech'
  });
});

// /intro/gallery
router.get('/gallery', function (req, res, next) {
  console.log(__dirname);
  res.render('intro/gallery', {
    title: 'RealDesignTech'
  });
});

// /intro/team&partners
router.get('/team&partners', function (req, res, next) {
  res.render('intro/team&partners', {
    title: 'RealDesignTech'
  });
});

module.exports = router;
