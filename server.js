const con = require('./connect_mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var dateFormat = require('dateformat');
const { request } = require('express');
var now = new Date();
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
app.post('/save/user',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var pre = req.body.pre;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var birthDate = req.body.birthDate;
  var farmID = req.body.farmID;
  var typeUserID = req.body.typeUserID;
  var sql = "INSERT INTO user(username,password,email,fname,lname,pre,birthDate,farmID,typeUserID,created_at,updated_at) VALUES('"+username+"','"+password+"','"+email+"','"+fname+"','"+lname+"','"+pre+"','"+birthDate+"','"+farmID+"','"+typeUserID+"','"+dateFormat(now,"yyyy-mm-dd HH:MM:ss")+"','"+dateFormat(now,"yyyy-mm-dd HH:MM:ss")+"')"
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = {'status':'success'};
    res.send(JSON.stringify(data));
  });
});

app.post('/check/user',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var sql = "SELECT * FROM user WHERE username='"+username+"' and password = '"+password+"' and isDel = 0";
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    if(result != []){
      var data = {'status':'success','username':result[0].username,'userID':result[0].userID,'farmID':result[0].farmID};
      console.log(result);
      res.send(JSON.stringify(data));
    }else{
      res.send(JSON.stringify({'status':'failed'}));
    }
  });
});

app.get('/get/user/All',(req,res) => {
  var sql = "SELECT userID,username,email,fname,lname,pre,birthDate,farmID,typeUserID FROM user WHERE isDel=0";
  con.query(sql,function(err,result,filed){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });
});

app.get('/get/user/ID/:id',(req,res) => {
  var sql = "SELECT userID,username,email,fname,lname,pre,birthDate,farmID,typeUserID FROM user WHERE userID = '"+req.params.id+"' and isDel=0";
  console.log(req.params.id);
  con.query(sql,function(err,result,filed){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });
});

app.get('/get/user/barcode/:id',(req,res) => {
  var barcode = req.params.id;
  var sql = "SELECT * FROM user WHERE username = '"+barcode+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });

});

//sow
app.post('/save/sow',(req,res)=>{
  var recType = req.body.recType;
  var birthDate = req.body.birthDate;
  var breed = req.body.breed;
  var sire = req.body.sire;
  var dam = req.body.dam;
  var origin = req.body.origin;
  var farmID = req.body.farmID;
  var sowCode = req.body.sowCode;

  var sql = "INSERT INTO sow (sowCode,recType,birthDate,breed,sire,dam,origin,farmID,created_at,updated_at) VALUES('"+sowCode+"','"+recType+"','"+birthDate+"','"+breed+"','"+sire+"','"+dam+"','"+origin+"','"+farmID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify({'status':'success'});
    res.send(data);
  });
});
app.post('/update/sow/pair',(req,res)=>{
    var sowcode = req.query.sowcode;
    var uhf = req.query.uhf;
    console.log(req.query);
    var sql = "UPDATE sow SET uhf='"+uhf+"' WHERE sowCode= '"+sowcode+"'";
    con.query(sql,function(err,result,field){
      var data = JSON.stringify({'status':'success'});
      res.send(data);
    });
  });



app.get('/get/sow/All',(req,res) => {
  var sql = "SELECT * FROM sow WHERE isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });

});

app.get('/get/sow/:id',(req,res) => {
  var sowID = req.params.id;
  var sql = "SELECT * FROM sow WHERE sowID='"+sowID+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});

app.get('/get/sow/UHF/:id',(req,res) => {
  var UHF = req.params.id;
  var sql = "SELECT * FROM sow WHERE uhf='"+UHF+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});

app.get('/get/sow/sowCode/:id',(req,res) => {
  var sowCode = req.params.id;
  var sql = "SELECT * FROM sow WHERE sowCode='"+sowCode+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});

//unit/block
app.post('/save/unit',(req,res)=>{
  var unitCode = req.body.unitCode;
  var farmID = req.body.farmID;
  var unitName = req.body.unitName;

  var sql = "INSERT INTO unit (unitCode,farmID,unitName,created_at,updated_at) VALUES('"+unitCode+"','"+farmID+"','"+unitName+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify({'status':'sucess'});
    res.send(data);
  });
});
app.post('/save/block',(req,res)=>{
  var blockCode = req.body.blockCode;
  var row = req.body.row;
  var col = req.body.col;
  var unitID = req.body.unitID;

  var sql = "INSERT INTO block (blockCode,row,col,unitID,created_at,updated_at) VALUES('"+blockCode+"','"+row+"','"+col+"','"+unitID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify({'status':'sucess'});
    res.send(data);
  });
});
app.get('/get/unit/All',(req,res) => {
  var sql = "SELECT * FROM unit WHERE isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });
});

app.get('/get/unit/:id',(req,res) => {
  var unitID = req.params.id;
  var sql = "SELECT * FROM unit WHERE unitID='"+unitID+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});
app.get('/get/block/All',(req,res) => {
  var sql = "SELECT * FROM block WHERE isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });
});

app.get('/get/block/:id',(req,res) => {
  var blockID = req.params.id;
  var sql = "SELECT * FROM block WHERE blockID='"+blockID+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});
app.get('/get/block/RFID/:id',(req,res) => {
  var blockCode = req.params.id;
  var sql = "SELECT * FROM block WHERE blockCode='"+blockCode+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});

//sow/semen
app.get('/get/sowsemen/All',(req,res) => {
  var sql = "SELECT * FROM sowsemen WHERE isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  });
});
app.get('/get/sowsemen/:id',(req,res) => {
  var sowSemenID = req.params.id;
  var sql = "SELECT * FROM sowsemen WHERE sowSemenID='"+sowSemenID+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});
app.get('/get/sowsemen/barcode/:id',(req,res) => {
  var barcode = req.params.id;
  var sql = "SELECT * FROM sowsemen WHERE barcode='"+barcode+"' and isDel = 0";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify(result);
    res.send(data);
  })
});
app.post('/save/sowsemen',(req,res)=>{
  var barcode = req.body.barcode;
  var sowID = req.body.sowID;
  var userID = req.body.userID;

  var sql = "INSERT INTO sowsemen (barcode,sowID,userID,created_at,updated_at) VALUES('"+barcode+"','"+sowID+"','"+userID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
  console.log(sql);
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify({'status':'sucess'});
    res.send(data);
  });
});
app.get('/ADD/NFC',(req,res)=>{
  var NFC = req.query.nfcid;

  var sql = "INSERT INTO nfc_record(nfc,created_at) values ('"+NFC+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    var data = JSON.stringify({'status':'sucess'});
    res.send(data);
  });
});
app.listen(8000, () => {
  console.log('Start server at port 8000.')
})