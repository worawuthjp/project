const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){
 
  app.get('/get/summary/sowmating/All',(req,res) => {
    var sql = "SELECT sow.*,SIRE.sowCode,employee.* AS SIRECODE FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow AS SIRE ON sowsemen.sowID = SIRE.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      if(result){
        var data = JSON.stringify(result);
        res.send(data);
      }
      
    });
  });
  
  app.get('/get/count/sowmating/today',(req,res) => {
    var dateNow = dateFormat(now,'yyyy-mm-dd');
    var sql = "SELECT COUNT(*) AS NUM FROM sowmating WHERE DATE(created_at) = '"+dateNow+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({"num":result[0].NUM});
      res.send(data);
    });
  });

  app.get('/get/count/sowbirth/today',(req,res) => {
    var dateNow = dateFormat(now,'yyyy-mm-dd');
    var sql = "SELECT COUNT(*) AS NUM FROM sowbirth WHERE DATE(created_at) = '"+dateNow+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({"num":result[0].NUM});
      res.send(data);
    });
  });

  app.get('/get/numbirth/today',(req,res) => {
    var dateNow = dateFormat(now,'yyyy-mm-dd');
    var sql = "SELECT IF(SUM(sowbirth.alive+sowbirth.died+sowbirth.mummy) IS NULL,0,SUM(sowbirth.alive+sowbirth.died+sowbirth.mummy)) AS SUM FROM sowbirth WHERE DATE(created_at) = '"+dateNow+"'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify({"sum":result[0].SUM});
      res.send(data);
    });
  });

  app.get('/get/report/sire',(req,res)=>{
    var sql = "SELECT sow.*,Sire.sowCode As Sire,sowmating.*,employee.*,sowsemen.SemenBarcode FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE Sire.recType = 'S'";
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.get('/get/report/dam',(req,res)=>{
    var sql = "SELECT sow.*,sowbirth.* FROM sowbirth INNER JOIN sow ON sow.sowID = sowbirth.sowID WHERE sow.recType = 'D'";
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.get('/get/summary/mating/sire',(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID WHERE Sire.sowID = '"+id+"'";
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.get('/get/summary/mating/dam',(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT * FROM sowmating INNER JOIN sow ON sow.sowID = sowmating.sowID WHERE sow.sowID = '"+id+"'";
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

  app.get('/get/summary/birth',(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT * FROM sowbirth INNER JOIN sow ON sow.sowID = sowbirth.sowID WHERE sow.sowID = '"+id+"'";
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });

}