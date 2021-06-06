const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){
    app.get('/get/sowblock/All',(req,res)=>{
        var sql = "SELECT * FROM sowblock INNER JOIN sow ON sow.sowID = sowblock.sowID INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id";
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

      app.get('/get/sowblock/sow',(req,res) => {
        var sowBlockID = req.query.code;
        var ID = req.query.id;
        var unitID = req.query.unitID;
        var sql = "SELECT * FROM sowblock INNER JOIN sow ON sow.sowID = sowblock.sowID INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id where (unit_block.blockcode = '"+sowBlockID +"' OR sowblock.sowBlockID = '"+ID+"' OR unit_block.unitID = '"+unitID+"' ) and sowblock.status <> 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      
      app.get('/get/sowblock',(req,res) => {
        var sowBlockID = req.query.code;
        var ID = req.query.id;
        var unitID = req.query.unitID;
        var sql = "SELECT * FROM sowblock INNER JOIN sow ON sow.sowID = sowblock.sowID INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id where (unit_block.blockcode = '"+sowBlockID +"' OR sowblock.sowBlockID = '"+ID+"' OR unit_block.unitID = '"+unitID+"' ) and sowblock.status <> 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });

      app.get('/get/sowblock/active',(req,res) => {
        var sowBlockID = req.query.id;
        var sql = "SELECT * FROM sowblock INNER JOIN sow ON sow.sowID = sowblock.sowID INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id where sowblock.sow_block_id = '"+sowBlockID +"' and sowblock.status = 1";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });

      app.get('/get/sowblock/deactive',(req,res) => {
        var sowBlockID = req.query.id;
        var sql = "SELECT * FROM sowblock INNER JOIN sow ON sow.sowID = sowblock.sowID INNER JOIN unit_block ON unit_block.unit_block_id = sowblock.unit_block_id where sowblock.sow_block_id = '"+sowBlockID +"' and sowblock.status = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      
      app.post('/add/sowblock',(req,res)=>{
        var sowID = req.body.sowID;
        var unitBlockID = req.body.unitBlockID;
        var date = dateFormat(now,'yyyy-mm-dd');
        let sql = sprintf("UPDATE sowblock SET status='0' WHERE sowID = '%s' or unit_block_id = '%s'",sowID,unitBlockID);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
        });
        sql = sprintf("INSERT INTO sowblock(sowID,unit_block_id,created_at,updated_at,status) VALUES('%s','%s','%s','%s','1')",sowID,unitBlockID,date,date);
        con.query(sql,function(err,result,filed){
          if(err) throw err;
          var data = JSON.stringify({"status":"success"});
          res.send(data);
        });
    });
    app.post('delete/sowblock',(req,res)=>{
        var id = req.body.id;
        var sql = sprintf("DELETE FROM sowblock WHERE sowBlockID='%s'",id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          if(result)
            res.send({"status":"success"});
          else
            res.send({"status":"errors"});
        })
      });
      app.put('/update/sowblock',(req,res)=>{
        var id = req.body.id;
        var sowID = req.body.sowID;
        var unitBlockID = req.body.unitBlockID;
        var status = req.body.status;
        var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
        var sql = sprintf("UPDATE sowblock SET sowID='%s',unit_block_id='%s',status='%s',updated_at='%s' WHERE sowBlockID='%s",sowID,unitBlockID,status,date,id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          if(result)
            res.send({"status":"success"});
          else
            res.send({"status":"errors"})
        })
      });

      app.put('/update/sowblock/status',(req,res)=>{
        var id = req.body.id;
        var status = req.body.status;
        var date = dateFormat(now,'yyyy-mm-dd HH:MM:ss');
        var sql = sprintf("UPDATE sowblock SET status='%s',updated_at='%s' WHERE sowBlockID='%s",status,date,id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          if(result)
            res.send({"status":"success"});
          else
            res.send({"status":"errors"})
        })
      });
}