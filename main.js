var express = require('express')
var request = require('request')
var webhook = require('express-github-webhook')
var parser = require('body-parser')

var accessToken = process.env.GITHUB_TOKEN
var webhookHandler = webhook({
  path: '/',
  secret: process.env.GITHUB_SECRET
})

var app = express()
app.set('port', process.env.SERVER_PORT || 5555)
app.use(parser.json())
app.use(webhookHandler)


webhookHandler.on('pull_request', function(repo, data) {

})


app.listen(app.get('port'), function() {
  console.log('tizenfx-ghtools is listening on port ' + app.get('port'))
})
