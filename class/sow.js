const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){

  app.post('/add/sow',(req,res)=>{
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
    var sql = "SELECT * FROM sow WHERE isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  
  });
  
  app.get('/get/sow/ID',(req,res) => {
    var sowID = req.body.id;
    var sql = "SELECT * FROM sow WHERE sowID='"+sowID+"' and isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.get('/get/sow/UHF',(req,res) => {
    var UHF = req.body.id;
    var sql = "SELECT * FROM sow WHERE uhf='"+UHF+"' and isDel = 0";
    console.log(sql)
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.get('/getID/sow/UHF',(req,res) => {
    var UHF = req.body.id;
    var sql = "SELECT sowID FROM sow WHERE uhf='"+UHF+"' and isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.parse(JSON.stringify(result));
      if(data[0]){
        res.send(""+data[0].sowID);
      }
      else{
        res.send("");
      }
    })
  });
  
  app.get('/get/sow/sowCode',(req,res) => {
    var sowCode = req.body.id;
    var sql = "SELECT * FROM sow WHERE sowCode='"+sowCode+"' and isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.post('/delete/sow',(req,res) => {
    var sowID =  req.body.id
    var sql = "DELETE FROM sow WHERE sowID = '"+sowID+"' and isDel = 0";
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