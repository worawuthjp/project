const con = require('./connect_mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var dateFormat = require('dateformat');
var now = new Date();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => {
  res.send('BackEnd WEB SERVICE');
});

//user
require('./class/users')(app,con);
//sow
require('./class/sow')(app,con)
//unit/block
require('./class/unit')(app,con)
//sow/semen
require('./class/semen')(app,con)

app.listen(8000, () => {
  console.log('Start server at port 8000.')
})