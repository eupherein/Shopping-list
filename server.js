var express = require('express');
var parser = require('body-parser');

var app = express();

var port = 3000;

//pase app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
