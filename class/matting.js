var dateFormat = require('dateformat');
const { sprintf } = require("sprintf-js");
var now = new Date();

module.exports = function(app,con){

    app.post('/add/sowmating',(req,res)=>{
        var sowSemenID = req.query.sowSemenID;
        var sowID = req.query.sowID;
        var userID = req.query.userID;
        var unit_block_id = req.query.unitBlockID;

        if(req.body.sowSemenID){
          sowSemenID = req.body.sowSemenID;
        }

        if(req.body.sowID){
          sowID = req.body.sowID;
        }

        if(req.body.userID){
          userID = req.body.userID;
        }

        if(req.body.unitBlockID){
          unit_block_id = req.body.unitBlockID;
        }
        
        var sql = "INSERT INTO sowmating(sowSemenID,sowID,unit_block_id,empID,created_at,updated_at) Values('"+sowSemenID+"','"+sowID+"','"+unit_block_id+"','"+userID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')"
        con.query(sql,function(err,result,filed){
          if(err) throw err;
          var data = JSON.stringify({"status":"success"});
          res.send(data);
        });
    });

    app.get('/get/sowmating/All',(req,res)=>{
      var sql = "SELECT sow.*,Sire.sowCode As SIRE,DATE(sowmating.created_at) AS date_mating,employee.*,unit_block.*,unit.*,sowmating.status,sowmating.* FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN unit_block ON unit_block.unit_block_id = sowmating.unit_block_id INNER JOIN unit ON unit.unitID = unit_block.unitID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID ORDER BY sowmating.sowMatingID DESC";
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/search',(req,res)=>{
      var searchTxt = req.query.search;
      var sql = "SELECT sow.*,Sire.sowCode As SIRE,DATE(sowmating.created_at) AS date_mating,employee.*,unit_block.*,unit.*,sowmating.status,sowmating.* FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN unit_block ON unit_block.unit_block_id = sowmating.unit_block_id INNER JOIN unit ON unit.unitID = unit_block.unitID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE sow.sowCode LIKE '%"+searchTxt+"%' OR Sire.sowCode LIKE '%"+searchTxt+"%' ORDER BY sowmating.sowMatingID DESC";
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating',(req,res)=>{
      var id = req.query.id;
      var sql = sprintf("SELECT sow.*,Sire.sowCode As SIRE,DATE(sowmating.created_at) AS date_mating,employee.*,unit_block.*,unit.*,sowmating.status,sowmating.* FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN unit_block ON unit_block.unit_block_id = sowmating.unit_block_id INNER JOIN unit ON unit.unitID = unit_block.unitID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE sowmating.sowMatingID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/status/All',(req,res)=>{
      var UHF = req.query.UHF;
      var sql = sprintf("SELECT sow.*,Sire.sowCode As SIRE,DATE(sowmating.created_at) AS date_mating,employee.*,unit_block.*,unit.*,sowmating.status,sowmating.* FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN unit_block ON unit_block.unit_block_id = sowmating.unit_block_id INNER JOIN unit ON unit.unitID = unit_block.unitID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE sow.uhf='%s'",UHF);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/status/lastest',(req,res)=>{
      var UHF = req.query.UHF;
      var id = req.query.id;
      var sql = sprintf("SELECT sow.*,Sire.sowCode As SIRE,DATE(sowmating.created_at) AS date_mating,employee.*,unit_block.*,unit.*,sowmating.status,sowmating.* FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN unit_block ON unit_block.unit_block_id = sowmating.unit_block_id INNER JOIN unit ON unit.unitID = unit_block.unitID INNER JOIN sow As Sire ON Sire.sowID = sowsemen.sowID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE (sow.uhf='%s' OR sow.sowID = '%s') ORDER BY sowmating.sowMatingID DESC LIMIT 1",UHF,id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/sowDam',(req,res)=>{
      var id = req.query.id;
      var sql = sprintf("SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.empID = sowmating.empID WHERE sow.recType='D' and sow.sowID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/sowSire',(req,res)=>{
      var id = req.query.id;
      var sql = sprintf("SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN employee ON employee.employee = sowmating.empID WHERE sow.recType='S' and sow.sowID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          var data = JSON.stringify(result);
          res.send(data);
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });
      
    app.put('/update/sowmating',(req,res)=>{
      var id = req.body.id;
      var sowSemenID = req.body.sowSemenID;
      var sowID = req.body.sowID;
      var userID = req.body.userID;
      var status = req.body.status;
      var sql = sprintf("UPDATE sowmating SET sowSemenID='%s',sowID='%s',empID='%s',status='%s' WHERE sowMatingID='%s'",sowSemenID,sowID,userID,status,id);
      console.log(sql)
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result)
          res.send({"status":"success"});
        else
          res.send({"status":"errors"})
      })
    });

    app.put('/update/sowmating/status',(req,res)=>{
      var id = req.body.id;
      var status = req.body.status;
      var sql = sprintf("UPDATE sowmating SET status='%s' WHERE sowMatingID='%s'",status,id);
      console.log(sql)
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result)
          res.send({"status":"success"});
        else
          res.send({"status":"errors"})
      })
    });

    app.post('delete/sowmating',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM sowmating WHERE sowMatingID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result)
          res.send({"status":"success"});
        else
          res.send({"status":"errors"});
      })
    });
}