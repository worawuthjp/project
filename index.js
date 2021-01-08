const con = require('./connect_mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { request, json } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('BackEnd WEB SERVICE');
});

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

app.listen(8000, () => {
  console.log('Start server at port 8000.')
})