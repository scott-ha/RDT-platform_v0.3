var express = require('express');
var router = express.Router();
var request = require('request');
var req_info = require('./req_info');

/* GET users listing. */
// users


// users?

// /users/login
router.get('/login', function(req, res, next) {
  var session = req.session.logined;

  if (session) {
    res.redirect('/')
  } else {
    res.render('login', {
      title: 'RealDesignTech'
    });
  }
})

// /users/login
router.post('/login', function(req, res) {
  var name = req.body.username;
  var password = req.body.password;

  var req_data = {
    'username': name,
    'password': password
  }

  request.post(req_info.reqto_BS('login/rest', req_data), function(error, response, body) {
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
})

// /users/logout

router.get('/logout', function(req, res, next) {
  // session false
  req.session.logined = false;
  // clear cookies
  res.clearCookie('MY_USER').redirect('/');
});


router.get('/reg', function(req, res, next) {
  var user_name = req.cookies.MY_USER;
  var session = req.session.logined;
  if (session) {
    res.redirect('/')
  } else {
    res.render('register', {
      title: 'RealDesignTech',
      session: session,
      user_name: user_name
    });
  }
});

// /users/reg
router.post('/reg', function(req, res) {
  var name = req.body.username;
  var password = req.body.password;

  var req_data = {
    'username': name,
    'password': password
  }

  request.post(req_info.reqto_BS('reg/rest', req_data), function(error, response, body) {
    // res_data in body (rcode,rmessage)
    var res_data = JSON.parse(body);
    var session = req.session.logined;

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
        res.render('register', {
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

// users origin
// router.get('/', function(req, res, next) {
//   var user_name = req.cookies.MY_USER;
//   var session = req.session.logined;
//   if (!session) {
//     res.redirect('/')
//   } else {
//     request.post({
//       url: 'http://localhost:5000/wallet/show/rest',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       form: {
//         'username': user_name
//       }
//     }, function (error, response, body) {
//       var res_data = JSON.parse(body);
//       if (!error && response.statusCode == 200) {
//         if (res_data.rcode == 'ok') {
//           console.log("-pri_key : ", res_data.rpri_key);
//           console.log("-pub_key : ", res_data.rpub_key);
//
//           res.render('users/users', {
//             title: 'RealDesignTech',
//             session: session,
//             user_name: user_name,
//             pri_key: res_data.rpri_key,
//             pub_key: res_data.rpub_key,
//             coin: res_data.rcoin
//           });
//         }
//       }
//     }
//   )
// }
// });

module.exports = router;
