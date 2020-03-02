var request = require('request');

// Blockchain Server
const url = 'http://localhost:8000/'

var req_set = '';

module.exports.req_post = function(rest_url, data) {
  req_set = {
    url: url + rest_url,
    headers: {
      "Content-Type": "application/json"
    },
    form: data
  }
  return req_set
}

module.exports.req_get = function (rest_url) {
  req_set = {
    url: url + rest_url,
    headers: {
      "Content-Type": "application/json"
    }
  }
  return req_set
}
