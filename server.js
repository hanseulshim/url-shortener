var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var db

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://hanseulshim:M5LfBte7LWra@ds149481.mlab.com:49481/url-shortener', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port, () => {
    console.log("Running on port: " + port)
  })
})

app.use(function(req,res,next){
    req.db = db;
    next();
});

var router = require('./routes/index');
app.use('/', router);

module.exports = app;