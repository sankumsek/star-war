var serverPort  = 3000;
var http        = require('http');
var path        = require('path');
var express     = require('express');
var app         = express();
var request     = require('superagent');
var log         = require('bunyan')
  .createLogger({
    name: 'miniProject',
    streams: [
      {
        stream: process.stderr
      },
      {
        path: path.resolve(__dirname, './log', 'development.log')
      }
    ]
  });

app.use(express.static(path.resolve(__dirname, './public')));

require('babel-register')({
  ignore: false,
  presets: ['es2015', 'react'],
  extensions: ['.jsx']
});
var React       = require('react');
var ReactServer = require('react-dom/server');
var Layout      = require('./server/components/Layout');

app.get('/', function (req, res) {
  var markup = ReactServer.renderToString(React.createElement(Layout, {
    title: 'Sample App'
  }));

  res.send('<!DOCTYPE html>' + markup);
});

app.get('/api/neo', function (req, res) {
  let startDate = req.query.start_date;
  let endDate   = req.query.end_date;
  let query     = {api_key: 'DEMO_KEY'};
  let url       = `https://api.nasa.gov/neo/rest/v1/feed`;

  if(typeof startDate !== 'undefined') query.start_date = startDate;
  if(typeof endDate !== 'undefined') query.end_date = endDate;

  //make request to api
  request
    .get(url)
    .query(query)
    .end((err, response)=>{
      res.send(response.text);
    });
});

var server = http.createServer(app);
server.listen(serverPort);
server.on('listen', function (err) {
  log.info('Spinning up server. Access via localhost:' + serverPort);
  log.info(err);
});
