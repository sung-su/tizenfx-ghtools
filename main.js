var log = require('./log');
var express = require('express');
var request = require('request');
var webhook = require('express-github-webhook');
var parser = require('body-parser');

var accessToken = process.env.GITHUB_TOKEN;
var webhookHandler = webhook({
  path: '/',
  secret: process.env.GITHUB_SECRET
});

var app = express();
app.set('port', process.env.PORT || 5555);
app.use(parser.json());
app.use(webhookHandler);


webhookHandler.on('pull_request', function(repo, data) {
  if (repo !== 'TizenFX' || data.action !== 'opened') return;

  var labels = [];

  // Label for API Version
  if (data.pull_request.base.ref === 'master') {
    labels.push('API5');
  } else if (data.pull_request.base.ref === 'API4') {
    labels.push('API4');
  }

  log.info('adding labels ' + JSON.stringify(labels) + ' to ' + data.pull_request.number);

  var opts = {
    method: 'POST',
    uri: data.pull_request.issue_url + '/labels',
    headers: {
      'User-Agent': 'tizenfx-ghtools',
      'Authorization': 'token ' + accessToken,
      'Content-Type': 'application/json'
    },
    form: JSON.stringify(labels)
  };
  request(opts, function(err, results, body) {
    if (err) log.error(err);
    log.debug(JSON.stringify(body, null, ' '));
  });

});


app.listen(app.get('port'), function() {
  log.info('tizenfx-ghtools is listening on port ' + app.get('port'))
});

