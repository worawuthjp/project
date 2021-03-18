const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){

  app.post('/add/sow',(req,res)=>{
    var recType = req.body.recType;
    var birthDate = req.body.birthDate;
    var breed = req.body.breed;
    var origin = req.body.origin;
    var farmID = req.body.farmID;
    var sowCode = req.body.sowCode;
  
    var sql = "INSERT INTO sow (sowCode,farmID,recType,birthDate,breed,origin,created_at,updated_at) VALUES('"+sowCode+"','"+farmID+"','"+recType+"','"+birthDate+"','"+breed+"','"+origin+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({'status':'success'});
      res.send(data);
    });
  });

  app.put('/update/sow/pair',(req,res)=>{
      var sowcode = req.query.sowcode;
      var uhf = req.query.uhf;
  
      if(req.body.sowcode){
        sowcode = req.body.sowcode;
      }
      if(req.body.uhf){
        uhf = req.body.uhf;
      }
      console.log(req);
      var sql = "UPDATE sow SET uhf='"+uhf+"' WHERE sowCode= '"+sowcode+"'";
      con.query(sql,function(err,result,field){
        var data = JSON.stringify({'status':'success'});
        res.send(data);
      });
    });
  
  app.get('/get/sow/All',(req,res) => {
    var sql = "SELECT * FROM sow";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  
  });
  
  app.get('/get/sow/id',(req,res) => {
    var sowID = req.query.id;
    var sql = "SELECT * FROM sow WHERE sowID='"+sowID+"' ";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.get('/get/sow/UHF',(req,res) => {
    var UHF = req.query.id;
    var sql = "SELECT * FROM sow WHERE uhf='"+UHF+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.get('/get/sow/sowCode',(req,res) => {
    var sowCode = req.query.id;
    var sql = "SELECT * FROM sow WHERE sowCode='"+sowCode+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.post('/delete/sow',(req,res) => {
    var sowID =  req.body.id
    var sql = "UPDATE sow SET isDel = 1 WHERE sowID = '"+sowID+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      if(result){
        res.send({"status":"success"})
      }
      else{
        res.send({"status":"false"})
      }
    })
  });
      
}