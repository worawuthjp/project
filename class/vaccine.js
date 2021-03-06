const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();
module.exports = function(app,con){

    app.post('/add/vaccine',(req,res)=>{
        var vaccineName = req.body.vaccineName;
        var vaccineCode = req.body.vaccineCode;
        var roundTime = req.body.roundTime;
        var farmID = req.body.farmID;
        var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
      
        var sql = "INSERT INTO vaccine (vaccineName,vaccineCode,roundTime,farmID,created_at,updated_at) VALUES('"+vaccineName+"','"+vaccineCode+"','"+roundTime+"','"+farmID+"','"+date+"','"+date+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'success'});
          res.send(data);
        });
    });
    
    app.get('/get/vaccine/All',(req,res) => {
      var sql = "SELECT * FROM vaccine INNER JOIN farm ON farm.farmID = vaccine.farmID";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/vaccine',(req,res) => {
      var vaccineID = req.query.id;
      var sql = "SELECT * FROM vaccine INNER JOIN farm ON farm.farmID = vaccine.farmID WHERE vaccineID='"+vaccineID+"'";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/vaccine/search',(req,res) => {
      var searchTxt = req.query.search;
      var sql = "SELECT * FROM vaccine INNER JOIN farm ON farm.farmID = vaccine.farmID WHERE vaccineName LIKE '%"+searchTxt+"%' OR vaccineCode LIKE '%"+searchTxt+"%'";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/vaccine/Barcode',(req,res) => {
      var vaccineCode = req.query.id;
      var sql = "SELECT * FROM vaccine WHERE vaccineCode='"+vaccineCode+"' ";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.delete('/delete/vaccine',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM vaccine WHERE vaccineID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      })
    });

    app.put('/update/vaccine',(req,res)=>{
      var vaccineID = req.body.id;
      var vaccineName = req.body.vaccineName;
      var vaccineCode = req.body.vaccineCode;
      var farmID = req.body.farmID;
      var roundTime = req.body.roundTime;
      var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
      var sql = sprintf("UPDATE vaccine SET roundTime='%s',vaccineCode='%s',farmID='%s',vaccineName='%s',updated_at = '%s' WHERE vaccineID='%s'",roundTime,vaccineCode,farmID,vaccineName,date,vaccineID);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      });
    });

}