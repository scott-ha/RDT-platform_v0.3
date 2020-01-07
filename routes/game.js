var express = require('express');
var router = express.Router();
var {exec} = require('child_process');
// To get user's info
// test : this module shows server info
// var opsys = process.platform;
// var userInfo = require('user-info');
// // user-agent
// var useragent = require('express-useragent');
// command for web launcher
// game server 실행시 port 충돌 해결필요
// 여기서 할거냐 game의 서버 실행 부분에서 해결할거냐!
// var cmd_Avabranch = "PORT=40007 node public/game/Avabranch/app.js";
// var cmd_Wiggle = "PORT=40008 node public/game/Wiggle/dist-server/main.js";
// var cmd_1942 = "PORT=40009 node public/game/Wiggle/dist-server/main.js";
// var cmd_racer = "PORT=40010 node public/game/Wiggle/dist-server/main.js";
var cmd_open_wiggle = "open http://210.102.181.156:40010"
var cmd_open_40008 = "open http://localhost:40008"
// var cmd_open_40009 = "open http://localhost:40009"
// var cmd_open_40010 = "open http://localhost:40010"

var fs = require('fs');
// var path = require('path');
// var mime = require('mime');

/* GET home page. */
// 직접 실행 수행
router.get('/', function(req, res, next) {

  res.render('game', {
    title: 'RealDesignTech'
  });
});

// Avabranch
router.get('/ava', function (req, res, next) {
  exec(cmd_Avabranch, function (error, stdout, stderr) {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (error !== null) {
     console.log('exec error:', error);
    }
    exec(cmd_open_40007, function (error, stdout, stderr) {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
       console.log('exec error:', error);
      }
    });
  });

  res.redirect('/game')
});

//wiggle
router.get('/Wiggle', function (req, res, next) {
  exec(cmd_Wiggle, function (error, stdout, stderr) {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (error !== null) {
     console.log('exec error:', error);
    }
    exec(cmd_open_40008, function (error, stdout, stderr) {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
       console.log('exec error:', error);
      }
    });
  });

  res.redirect('/game')
});

// 1942
// router.get('/1942', function (req, res, next) {
//   exec(cmd_Wiggle, function (error, stdout, stderr) {
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//     if (error !== null) {
//      console.log('exec error:', error);
//     }
//     exec(cmd_open_40009, function (error, stdout, stderr) {
//       console.log('stdout:', stdout);
//       console.log('stderr:', stderr);
//       if (error !== null) {
//        console.log('exec error:', error);
//       }
//     });
//   });
//
//   res.redirect('/game')
// });

// racer
router.get('/RacerJS', function (req, res, next) {
  exec(cmd_Wiggle, function (error, stdout, stderr) {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (error !== null) {
     console.log('exec error:', error);
    }
    exec(cmd_open_40010, function (error, stdout, stderr) {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      if (error !== null) {
       console.log('exec error:', error);
      }
    });
  });

  res.redirect('/game')
});
// hn for next version
// router.get('/', function(req, res, next) {
//   // var agent = useragent.parse(req.headers['user-agent']);
//   // var source = req.headers['user-agent'];
//   // ua = useragent.parse(source);
//   // console.log(ua);
//   // console.log('------headers----');
//   // console.log(req);
//   // console.log('------headers----');
//   // // need ???
//   // // if (opsys == "darwin") {
//   // //   opsys = "MacOS"
//   // // } else if (opsys == "win32" || opsys == "win64") {
//   // //   opsys = "Windows"
//   // // } else if (opsys == "linux") {
//   // //   // linux 수정 필요
//   // //   opsys = "Linux"
//   // // }
//   console.log(opsys);
//   console.log(userInfo());
//   console.log(typeof(userInfo()));
//   var client = userInfo();
//   client = JSON.stringify(client);
//   console.log(client);
//   res.render('game', {
//     sys_platform: opsys,
//     client_Info: client
//   });
//   // var filename = 'test5.exe';
//   // // var savedpath = 'C:\'
//   //
//   // var file = "C:\\" + filename;
//   // console.log(file);
//   // res.download(file);
//   // var file = __dirname + '/test5.exe'
//   // res.download(file);
// });

module.exports = router;
