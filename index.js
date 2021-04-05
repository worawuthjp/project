const con = require('./connect_mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { request, json } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(function(req,res,next){
  //res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.send('BackEnd WEB SERVICE');
});

//user
require('./class/farm')(app,con)

//user
require('./class/users')(app,con)

//sow
require('./class/sow')(app,con)

//unit/block
require('./class/unit')(app,con)

//sow/semen
require('./class/semen')(app,con)

//sow/matting
require('./class/matting')(app,con)

//sow/sowbirth
require('./class/sowBirth')(app,con)

//sow/sowblock
require('./class/sowblock')(app,con)

//sow/vaccine
require('./class/vaccine')(app,con)

//sow/sowvaccine
require('./class/sowVaccine')(app,con)

app.listen(8001, () => {
  console.log('Start server at port 8000.')
})