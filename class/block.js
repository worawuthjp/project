const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();
module.exports = function(app,con){

    app.post('/add/block',(req,res)=>{
        var blockCode = req.body.blockCode;
        var row = req.body.row;
        var col = req.body.col;
        var unitID = req.body.unitID;
      
        var sql = "INSERT INTO unit_block (blockCode,row,col,unitID,created_at,updated_at) VALUES('"+blockCode+"','"+row+"','"+col+"','"+unitID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
    });
    
    app.get('/get/block/All',(req,res) => {
      var sql = "SELECT * FROM unit_block INNER JOIN unit ON unit.unitID = unit_block.unitID";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/block/id',(req,res) => {
      var blockID = req.query.id;
      var sql = "SELECT * FROM unit_block INNER JOIN unit ON unit.unitID = unit_block.unitID WHERE unit_block_id='"+blockID+"' ORDER BY unit_block.unit_block_id DESC";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/block/unit',(req,res) => {
      var unitID = req.query.id;
      var sql = "SELECT * FROM unit_block INNER JOIN unit ON unit.unitID = unit_block.unitID WHERE unit_block.unitID='"+unitID+"'";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.get('/get/block/barcode',(req,res) => {
      var blockCode = req.query.id;
      var sql = "SELECT * FROM unit_block INNER JOIN unit ON unit.unitID = unit_block.unitID WHERE blockCode='"+blockCode+"' ORDER BY unit_block.unit_block_id DESC";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.post('/delete/block',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM unit_block WHERE blockID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      })
    });

    app.post('/update/block',(req,res)=>{
      var id = req.body.id;
      var blockCode = req.body.blockCode;
      var row = req.body.row;
      var col = req.body.col;
      var sql = sprintf("UPDATE unit_block SET blockCode='%s',row='%s',col='%s',updated_at = '%s' WHERE blockID='%s'",blockCode,row,col,dateFormat(now,'yyyy-mm-dd HH:MM:ss'),id);
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