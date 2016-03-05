var urlParse = require('url').parse
var express = require('express')
var suddenDeath = require('./utils').suddenDeath
var http = require('http')
/*
  redirectURL: '',
  callbackURL: '',
  message: 'Please authorize access to your account'
*/
module.exports = function (opts, callback) {
  var app = express()
  var server = http.createServer(app)

  if (!opts.callbackURL) {
    throw 'Must pass `callbackURL` option to callbackServer'
  }

  if (!opts.redirectURL) {
    throw 'Must pass `redirectURL` option to callbackServer'
  }

  var redirectURL = opts.redirectURL
  var url = urlParse(opts.callbackURL)

  app.get('/', function (req, res) {
    var msg = opts.message || 'Please authorize access to your account'
    var body = '<a href="' + redirectURL + '">' + msg +
      '</a>'
    res.send(body)
  })

  app.get(url.path, function (req, res) {
    var token = req.query['code']

    console.log('Query data:', req.query)
    console.log('Token:', token)
    var body = 'we received a token, you may close this page'
    if (!token) {
      var j = JSON.stringify(req.query, null, 2)
      body = 'something went wrong receiving your token'
      body += '\nrequest:\n' + j
      suddenDeath('something went wrong receiving your token' + j)
    }

    res.send(body)
    res.end()
    server.close()
    callback(token)
  })

  server.listen(url.port)

  console.log('OAuth response handler listening on ' + opts.callbackURL)

  return 'http://localhost:' + url.port
}
