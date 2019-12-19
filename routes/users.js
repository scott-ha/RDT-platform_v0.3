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
    res.redirect('/')
  } else {
    request.post(req_toBS.req_post('wallet/show/rest', req_data), function (error, response, body) {
      res_data = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        if (res_data.rcode == 'ok') {
          console.log("-pri_key : ", res_data.rpri_key);
          console.log("-pub_key : ", res_data.rpub_key);

          res.render('users/users', {
            title: 'RealDesignTech',
            session: session,
            user_name: user_name,
            pri_key: res_data.rpri_key,
            pub_key: res_data.rpub_key,
            coin: res_data.rcoin
          });
        }
      }
    }
  )
}
});

// /users/login
router.get('/login', function(req, res, next) {
  session = req.session.logined;

  if (session) {
    res.redirect('/')
  } else {
    res.render('users/login', {
      title: 'RealDesignTech'
    });
  }
})

// /users/login
router.post('/login', function(req, res) {
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
        res.redirect('/');
      } else {
        console.log("<--- log from : /login");
        console.log("Login failed");
        res.render('users/login', {
          title: 'check your ID/PW'
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
  res.clearCookie('MY_USER').redirect('/');
});


router.get('/reg', function(req, res, next) {
  user_name = req.cookies.MY_USER;
  session = req.session.logined;
  if (session) {
    res.redirect('/')
  } else {
    res.render('users/register', {
      title: 'RealDesignTech',
      session: session,
      user_name: user_name
    });
  }
});

// /users/reg
router.post('/reg', function(req, res) {
  name = req.body.username;
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
        res.render('users/register', {
          title: res_data.rmessage,
          session: session
        });
      }
    } else if (error) {
      console.log(error);
      res.redirect('/reg');
    }
  });
})

router.get('/unreg', function(req, res, next) {
  session = req.session.logined;
  if (!session) {
    res.redirect('/')
  } else {
    res.render('unregister', { title: 'RealDesignTech' });
  }
});

// request to python server
router.post('/unreg', function (req, res) {
  name = req.body.username;
  password = req.body.password;

  req_data = {
    'username' : name,
    'password' : password
  }

  request.post(req_toBS.req_post('unreg/rest', req_data), function (error, response, body) {
    // res_data in body (rcode,rmessage)
    var res_data = JSON.parse(body);

    if(!error && response.statusCode == 200) {
      if(res_data.rcode == 'ok') {
        console.log("<--- log from : /unreg");
        console.log("unRegister Success");

        // set session logined = false
        // clear cookies
        res.redirect('/logout');
      } else {
        console.log("<--- log from : /unreg");
        console.log(res_data.rmessage);
        res.render('users/unregister', {title: res_data.rmessage});
      }
    } else if (error) {
      console.log(error);
      res.redirect('/unreg');
    }
  });
})



module.exports = router;
