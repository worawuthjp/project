const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){

  app.get('/get/sowsemen/All',(req,res) => {
    var sql = "SELECT * FROM sowsemen INNER JOIN sow ON sow.sowID = sowsemen.sowID ";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });
  

  app.get('/get/sowsemen',(req,res) => {
    var sowSemenID = req.query.id;
    var sql = "SELECT * FROM sowsemen WHERE sowSemenID='"+sowSemenID+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.get('/get/sowsemen/barcode',(req,res) => {
    var barcode = req.query.id;
    var sql = "SELECT * FROM sowsemen WHERE SemenBarcode='"+barcode+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  app.post('/add/sowsemen',(req,res)=>{
    var barcode = req.body.barcode;
    var sowID = req.body.sowID;
    var userID = req.body.userID;
  
    var sql = "INSERT INTO sowsemen (sowID,empID,semenBarcode,created_at,updated_at) VALUES('"+sowID+"','"+userID+"','"+barcode+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({'status':'sucess'});
      res.send(data);
    });
  });

  app.post('/delete/sowsemen',(req,res)=>{
    var id = req.body.id;
    var sql = sprintf("DELETE FROM sowsemen WHERE sowSemenID='%s'",id);
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      if(result){
        res.send({"status":"success"});
      }else{
        res.send({"status":"errors"});
      }
    })
  });
      
}