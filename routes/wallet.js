var express = require('express');
var router = express.Router();
var request = require('request');
var req_toBS = require('./req_toBS')

/* GET home page. */
// wallet_generate
// need to check session

var user_name, session, req_data, res_data, name, password, pri_key, pub_key

router.get('/', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  if (!session) {
    res.redirect('/')
  } else {
    res.render('wallet_generate', {
      title: 'RealDesignTech'
    });
  }
});

router.get('/generate', function(req, res) {
  user_name = req.cookies.MY_USER;
  name = req.body.username;
  password = req.body.password;

  request.get(req_toBS.req_get('wallet/generate/rest'), function(error, response, body) {
    // response data
    res_data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log("<--- log from : /wallet/generate");
        console.log("Wallet generate Success");
        console.log("--pri_key : ", res_data.rpri_key);
        console.log("--pub_key : ", res_data.rpub_key);
        res.render('wallet_save', {
          title: 'success',
          pri_key: res_data.rpri_key,
          pub_key: res_data.rpub_key
        })
      } else {
        console.log("<--- log from : /wallet/generate");
        console.log("generate failed");
        res.render('wallet_generate', {
          title: 'fail'
        })
      }
    } else if (error) {
      console.log(error);
    }
  })
});

router.post('/save', function(req, res, next) {
  name = req.cookies.MY_USER;
  pri_key = req.body.pri_key;
  pub_key = req.body.pub_key;
  req_data = {
    'user_name': name,
    'pri_key': pri_key,
    'pub_key': pub_key
  }

  request.post(req_toBS.req_post('wallet/save/rest', req_data), function(error, response, body) {
    // res_data in body (rcode,rmessage)
    res_data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log("<--- log from : /wallet/save");
        console.log("Wallet Save Success");
        console.log("-ID : ", name);
        console.log("-pri_key : ", pri_key);
        console.log("-pub_key : ", pub_key);
        // change to show
        res.redirect('/users');
      } else {
        console.log("<--- log from : /wallet/save");
        console.log("FAIL");
      }
    } else if (error) {
      console.log(error);
      res.redirect('/save');
    }
  })
  // res.redirect('/')
});

router.get('/show', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  req_data = {
    'username': user_name
  }

  request.post(req_toBS.req_post('wallet/show/rest', req_data), function(error, response, body) {
    // res_data in body (rcode,rmessage)
    res_data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log(res_data);
        console.log("<--- log from : /wallet/show");
        console.log("Wallet Show Success");
        console.log("-ID : ", user_name);
        console.log("-pri_key : ", res_data.rpri_key);
        console.log("-pub_key : ", res_data.rpub_key);
        // change to show
        res.render('wallet_show', {
          title: user_name,
          pri_key: res_data.rpri_key,
          pub_key: res_data.rpub_key
        });
      } else {
        console.log("<--- log from : /wallet/show");
        console.log("FAIL");
      }
    } else if (error) {
      console.log(error);
      res.redirect('/save');
    }
  })

});


module.exports = router;
