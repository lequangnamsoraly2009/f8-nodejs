'use strict';

var express = require('express');

var path = require('path');

var morgan = require('morgan');

var handlebars = require('express-handlebars');

var app = express();
var port = 3000; // HTTP Logger

app.use(morgan('combined'));
app.use(express['static'](path.join(__dirname, 'public'))); // Template Engines

app.engine(
  'hbs',
  handlebars({
    // extname: change last name of handlebars is hbs
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // API home

app.get('/', function (req, res) {
  res.render('home');
});
app.get('/game', function (req, res) {
  res.render('game');
});
app.listen(port, function () {
  console.log('App listening at http://localhost:'.concat(port));
});
