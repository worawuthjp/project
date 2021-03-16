const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){

  app.post('/add/unit',(req,res)=>{
    var farmID = req.body.farmID;
    var unitName = req.body.unitName;
  
    var sql = "INSERT INTO unit (unitName,farmID,created_at,updated_at) VALUES('"+unitName+"','"+farmID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({'status':'sucess'});
      res.send(data);
    });
  });
 
  app.get('/get/unit/All',(req,res) => {
    var sql = "SELECT * FROM unit";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });
  
  app.get('/get/unit',(req,res) => {
    var unitID = req.query.id;
    var sql = "SELECT * FROM unit WHERE unitID='"+unitID+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.post('/delete/unit',(req,res)=>{
    var id = req.body.unit;
    var sql = sprintf("DELETE FROM block WHERE unitID='%s'",id);
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      if(result){
        sql = sprintf("DELETE FROM unit WHERE unitID='%s'",id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err
          if(result){
            res.send({"status":"success"});
          }else{
            res.send({"status":"errors"});
          }
        })
      }else{
        res.send({"status":"errors"});
      }
    })
  });

  app.post('/update/unit',(req,res)=>{
    var id = req.body.id;
    var unitCode = req.body.unitCode;
    var unitName = req.body.unitName;
    var sql = sprintf("UPDATE unit SET unitCode='%s',unitName='%s' WHERE unitID='%s'",unitCode,unitName,id);
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      if(result){
        res.send({"status":"success"});
      }else{
        res.send({"status":"errors"});
      }
    });
  });

  require('./block')(app,con)

}