var express = require('express')
var request = require('request')
var webhook = require('express-github-webhook')
var parser = require('body-parser')


var app = express()
app.set('port', 5555)
app.use(parser.json())


app.get('/', function(req, res) {
  res.send('Hello World')
})



app.listen(app.get('port'), function() {
  console.log('izenfx-autolabel is listening on port ' + app.get('port'))
})
