var express = require('express');
var router = express.Router();
var request = require('request');
var req_info = require('./req_info');

/* GET home page. */
// login
// need to check session

// var user;
router.get('/', function(req, res, next) {
  // cookie from req.cookies
  var session = req.session.logined;

  if (session) {
    res.redirect('/')
  } else {
    res.render('login', {
      title: 'RealDesignTech'
    });
  }
});

router.post('/', function(req, res) {

  var name = req.body.username;
  var password = req.body.password;

  request.post(req_info.request_to_BS('login/rest', name, password), function(error, response, body) {
    // response data
    var res_data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log("<--- log from : /login");
        console.log("Login Success");
        console.log("-ID : ", name);
        console.log("-PW : ", password);

        // set session logined
        req.session.logined = true;

        // set cookies
        res.cookie('MY_USER', name);
        console.log(req.cookies.MY_USER);
        // go to main
        res.redirect('/');
      } else {
        console.log("<--- log from : /login");
        console.log("Login failed");
        res.render('login', {
          title: 'check your ID/PW'
        })
      }
    } else if (error) {
      console.log(error);
    }
  })
});

module.exports = router;
