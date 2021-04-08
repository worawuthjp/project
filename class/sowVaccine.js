const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){
    app.post('/add/sowvaccine',(req,res)=>{
        var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
        var jsn = req.body;
        var data = [];
        for (var key in jsn){
          var obj = jsn[key];
          console.log(obj.sowID);
          data.push([obj.sowID,obj.vaccineID,obj.empID,obj.comment,date,date]);
        }
        var sql = "INSERT INTO sowvaccine (sowID,vaccineID,empID,comment,created_at,updated_at) VALUES ? ";
        con.query(sql,[data],function(err,result,field){
          if(err) throw err;

          var d = JSON.stringify({'status':'success'});
          res.send(d);
        });
    });
    
    app.get('/get/sowvaccine/All',(req,res) => {
      var sql = "SELECT * FROM sowvaccine INNER JOIN sow ON sow.sowID = sowvaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowvaccine.vaccineID INNER JOIN employee ON employee.empID = sowvaccine.empID ORDER BY sowvaccine.sowVaccineID";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/sowvaccine/All/unit',(req,res) => {
      var unitID = req.query.id;
      var sql = "SELECT * FROM sowvaccine INNER JOIN sow ON sow.sowID = sowvaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowvaccine.vaccineID INNER JOIN employee ON employee.empID = sowvaccine.empID WHERE sow.sowID IN (SELECT sowblock.sowID FROM sowblock INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id WHERE sowblock.status = 1 and unit_block.unitID = '"+unitID+"')";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/sowvaccine',(req,res) => {
      var sowVaccineID = req.query.id;
      var sql = "SELECT * FROM sowvaccine INNER JOIN sow ON sow.sowID = sowvaccine.sowID INNER JOIN vaccine ON vaccine.vaccineID = sowvaccine.vaccineID INNER JOIN employee ON employee.empID = sowvaccine.empID WHERE sowvaccine.sowVaccineID='"+sowVaccineID+"' ";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.delete('/delete/sowvaccine',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM sowvaccine WHERE sowVaccineID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      })
    });

    app.put('/update/sowvaccine',(req,res)=>{
      var sowVaccineID = req.body.id;
      var sowID = req.body.sowID;
      var vaccineID = req.body.vaccineID;
      var empID = req.body.empID;
      var comment = req.body.comment;
      var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
      var sql = sprintf("UPDATE sowvaccine SET sowID='%s',vaccineID='%s',empID='%s',comment='%s',updated_at = '%s' WHERE sowVaccineID='%s'",sowID,vaccineID,empID,comment,date,sowVaccineID);
      console.log(sql);
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