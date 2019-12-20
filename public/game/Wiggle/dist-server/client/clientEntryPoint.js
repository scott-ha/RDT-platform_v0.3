"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

var _lanceGg = require("lance-gg");

var _WiggleClientEngine = _interopRequireDefault(require("../client/WiggleClientEngine"));

var _WiggleGameEngine = _interopRequireDefault(require("../common/WiggleGameEngine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//---- kong ----
var log;
var host = "ws://localhost:5331/echo";
var socket;
exports.socket = socket;
var cnt = 0; //

$(document).ready(function () {
  function connect() {
    exports.socket = socket = new WebSocket(host);
    log = document.getElementById("krlog");
    log.innerHTML += "socket created = " + socket.readyState + "<br/>";
    window.W_fr = 0;

    socket.onopen = function () {
      log.innerHTML += "socket opened = " + socket.readyState + "<br/>";
      socket.send("hello server");
    };

    socket.onmessage = function (event) {
      cnt++;
      var msg = new String(event.data);
      log.innerHTML = "RX " + cnt + " = " + msg + "<br/>";
      var str = msg.split('V');

      if (str[1].length != 9) {
        return;
      }

      var val = str[1].split('D');

      if (isNaN(val[0]) || isNaN(val[1])) {
        return;
      }

      window.W_speed = parseInt(val[0]);
      window.W_dir = 19 - parseInt(val[1]);
      log.innerHTML += "speed: " + window.W_speed + "<br/>";
      log.innerHTML += "dir: " + window.W_dir + "<br/>";
      log.innerHTML += "fr: " + window.W_fr + "<br/>";
    };

    socket.onclose = function () {
      log.innerHTML += "socket closed = +++++++++++++++++++++++++++++++++++" + socket.readyState + "<br/>";
      socket.close();
    };

    socket.onerror = function () {
      log.innerHTML += "socket error = " + socket.readyState + "<br/>";
    };
  }

  $('#krlog').click(function () {
    connect();
  });
});
$(window).load(function () {
  $('#krlog').click();
}); //----

var qsOptions = _queryString.default.parse(location.search); // default options, overwritten by query-string options
// is sent to both game engine and client engine


var defaults = {
  traceLevel: _lanceGg.Lib.Trace.TRACE_NONE,
  delayInputCount: 5,
  scheduler: 'render-schedule',
  syncOptions: {
    sync: qsOptions.sync || 'extrapolate',
    localObjBending: 0.8,
    remoteObjBending: 0.8,
    bendingIncrements: 6
  }
};
var options = Object.assign(defaults, qsOptions); // create a client engine and a game engine

var gameEngine = new _WiggleGameEngine.default(options);
var clientEngine = new _WiggleClientEngine.default(gameEngine, options);
document.addEventListener('DOMContentLoaded', function (e) {
  clientEngine.start();
}); //
//# sourceMappingURL=clientEntryPoint.js.map