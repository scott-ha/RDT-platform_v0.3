var request = require('request');

// Blockchain Server
const url = 'http://localhost:5000/'

module.exports.reqto_BS = function(rest_url, data) {
  var req_set = {
    url: url + rest_url,
    headers: {
      "Content-Type": "application/json"
    },
    form: data
  }

  return req_set
}
