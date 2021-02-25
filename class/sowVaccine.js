const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
const vaccine = require("./vaccine");
var now = new Date();
module.exports = function(app,con){

    app.post('/add/sowVaccine',(req,res)=>{
        var sowID = req.body.sowID;
        var vaccineID = req.body.vaccineID;
        var empID = req.body.empID;
        var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
      
        var sql = "INSERT INTO sowVaccine (sowID,vaccineID,empID,created_at,updated_at) VALUES('"+sowID+"','"+vaccineID+"','"+empID+"','"+date+"','"+date+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
    });
    
    app.get('/get/sowVaccine/All',(req,res) => {
      var sql = "SELECT * FROM sowVaccine INNER JOIN sow ON sow.sowID = sowVaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowVaccine.vaccineID INNER JOIN employee ON employee.empID = sowVaccine.empID ";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/sowVaccine/All/unit',(req,res) => {
      var unitID = req.body.id;
      var sql = "SELECT * FROM sowVaccine INNER JOIN sow ON sow.sowID = sowVaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowVaccine.vaccineID INNER JOIN employee ON employee.empID = sowVaccine.empID WHERE sow.sowID IN (SELECT sowblock.sowID FROM sowblock INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id WHERE sowblock.status = 1 and unit_block.unitID = '"+unitID+"')";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/sowVaccine/id',(req,res) => {
      var sowVaccineID = req.body.id;
      var sql = "SELECT * FROM sowVaccine INNER JOIN sow ON sow.sowID = sowVaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowVaccine.vaccineID INNER JOIN employee ON employee.empID = sowVaccine.empID WHERE sowVaccine.sowVaccineID='"+sowVaccineID+"' ";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.post('/delete/sowVaccine',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM sowVaccine WHERE sowVaccineID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      })
    });

    app.post('/update/sowVaccine',(req,res)=>{
      var sowVaccineID = req.body.id;
      var sowID = req.body.sowID;
      var vaccineID = req.body.vaccineID;
      var empID = req.body.empID;
      var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
      var sql = sprintf("UPDATE sowVaccine SET sowID='%s',vaccineID='%s',empID='%s',updated_at = '%s' WHERE sowVaccineID='%s'",sowID,vaccineID,empID,date,sowVaccineID);
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