var express = require('express');
var router = express.Router();
var exec = require('child_process').execFile;
// To get user's info
// test : this module shows server info
var opsys = process.platform;
var userInfo = require('user-info');
// user-agent
var useragent = require('express-useragent');
// command for web launcher
// var cmd = 'JEJEJE0416.exe';

var fs = require('fs');
var path = require('path');
var mime = require('mime');

/* GET home page. */
// 직접 실행 수행
// router.get('/', function(req, res, next) {
//   exec(cmd, function (error, stdout, stderr) {
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//     if (error !== null) {
//      console.log('exec error:', error);
//     }
//   })
// });
router.get('/', function(req, res, next) {
  // var agent = useragent.parse(req.headers['user-agent']);
  // var source = req.headers['user-agent'];
  // ua = useragent.parse(source);
  // console.log(ua);
  // console.log('------headers----');
  // console.log(req);
  // console.log('------headers----');
  // // need ???
  // // if (opsys == "darwin") {
  // //   opsys = "MacOS"
  // // } else if (opsys == "win32" || opsys == "win64") {
  // //   opsys = "Windows"
  // // } else if (opsys == "linux") {
  // //   // linux 수정 필요
  // //   opsys = "Linux"
  // // }
  console.log(opsys);
  console.log(userInfo());
  console.log(typeof(userInfo()));
  var client = userInfo();
  client = JSON.stringify(client);
  console.log(client);
  res.render('game', {
    sys_platform: opsys,
    client_Info: client
  });
  // var filename = 'test5.exe';
  // // var savedpath = 'C:\'
  //
  // var file = "C:\\" + filename;
  // console.log(file);
  // res.download(file);
  // var file = __dirname + '/test5.exe'
  // res.download(file);
});

module.exports = router;
