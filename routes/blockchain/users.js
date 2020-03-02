var express = require('express');
var router = express.Router();
var request = require('request');
var req_toBS = require('./req_toBS');

/* GET users listing. */
// users

var user_name, session, name, password, res_data, req_data;

// /users
router.get('/', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;

  req_data = {
    'username': user_name
  }
  if (!session) {
    res.redirect('/menu')
  } else {
    request.post(req_toBS.req_post('wallet/show/rest', req_data), function(error, response, body) {
      res_data = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        if (res_data.rcode == 'ok') {
          console.log("-pri_key : ", res_data.rpri_key);
          console.log("-pub_key : ", res_data.rpub_key);

          res.render('blockchain/users', {
            title: 'RealDesignTech',
            session: session,
            user_name: user_name,
            pri_key: res_data.rpri_key,
            pub_key: res_data.rpub_key,
            coin: res_data.rcoin
          });
        }
      }
    })
  }
});

// /users/addcoin
// done button / popup!
router.get('/addcoin', function(req, res) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;

  req_data = {
    'username': user_name
  }

  request.post(req_toBS.req_post('blockchain/mine/rest', req_data), function(error, response, body) {
    // response data
    res_data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        res.redirect('/users');
      } else {
        console.log("<--- log from : /wallet/generate");
        console.log("generate failed");
        res.redirect('/users');
      }
    } else if (error) {
      console.log(error);
    }
  })
});

// transaction ???

// /users/login
router.get('/login', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;

  if (session) {
    res.redirect('/menu')
  } else {
    res.render('blockchain/login', {
      title: 'RealDesignTech',
      session: session,
      user_name: user_name
    });
  }
})

// /users/login
router.post('/login', function(req, res) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  name = req.body.username;
  password = req.body.password;

  req_data = {
    'username': name,
    'password': password
  }

  request.post(req_toBS.req_post('login/rest', req_data), function(error, response, body) {
    // response data
    res_data = JSON.parse(body);
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
        res.redirect('/menu');
      } else {
        console.log("<--- log from : /login");
        console.log("Login failed");
        res.render('blockchain/login', {
          title: 'check your ID/PW',
          session: session,
          user_name: user_name
        })
      }
    } else if (error) {
      console.log(error);
    }
  })
})

// /users/logout

router.get('/logout', function(req, res, next) {
  // session false
  req.session.logined = false;
  // clear cookies
  res.clearCookie('MY_USER').redirect('/menu');
});


router.get('/reg', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  if (session) {
    res.redirect('/menu')
  } else {
    res.render('blockchain/register', {
      title: 'RealDesignTech',
      session: session,
      user_name: user_name
    });
  }
});

// /users/reg
router.post('/reg', function(req, res) {
  name = req.body.username;
  user_name = req.cookies.MY_USER;
  password = req.body.password;

  req_data = {
    'username': name,
    'password': password
  }

  request.post(req_toBS.req_post('reg/rest', req_data), function(error, response, body) {
    // res_data in body (rcode,rmessage)
    res_data = JSON.parse(body);
    session = req.session.logined;

    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log("<--- log from : /reg");
        console.log("Register Success");
        console.log("-ID : ", name);
        console.log("-PW : ", password);
        res.redirect('/users/login');
      } else {
        console.log("<--- log from : /reg");
        console.log(res_data.rmessage);
        res.render('blockchain/register', {
          title: res_data.rmessage,
          session: session,
          user_name: user_name
        });
      }
    } else if (error) {
      console.log(error);
      res.redirect('/users/reg');
    }
  });
})

router.get('/unreg', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  if (!session) {
    res.redirect('/menu')
  } else {
    res.render('blockchain/unregister', {
      title: 'RealDesignTech',
      session: session,
      user_name: user_name
    });
  }
});

// request to python server
router.post('/unreg', function(req, res) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  name = req.body.username;
  password = req.body.password;

  req_data = {
    'username': name,
    'password': password
  }

  request.post(req_toBS.req_post('unreg/rest', req_data), function(error, response, body) {
    // res_data in body (rcode,rmessage)
    res_data = JSON.parse(body);

    if (!error && response.statusCode == 200) {
      if (res_data.rcode == 'ok') {
        console.log("<--- log from : /unreg");
        console.log("unRegister Success");

        // set session logined = false
        // clear cookies
        res.redirect('/users/logout');
      } else {
        console.log("<--- log from : /unreg");
        console.log(res_data.rmessage);
        res.render('blockchain/unregister', {
          title: res_data.rmessage,
          session: session,
          user_name: user_name
        });
      }
    } else if (error) {
      console.log(error);
      res.redirect('/users/unreg');
    }
  });
})



module.exports = router;
