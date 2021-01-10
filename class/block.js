const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();
module.exports = function(app,con){

    app.post('/add/block',(req,res)=>{
        var blockCode = req.body.blockCode;
        var row = req.body.row;
        var col = req.body.col;
        var unitID = req.body.unitID;
      
        var sql = "INSERT INTO block (blockCode,row,col,unitID,created_at,updated_at) VALUES('"+blockCode+"','"+row+"','"+col+"','"+unitID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
    });
    
    app.get('/get/block/All',(req,res) => {
      var sql = "SELECT * FROM block INNER JOIN unit ON unit.unitID = block.unitID WHERE block.isDel = 0";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/block/ID',(req,res) => {
      var blockID = req.query.id;
      var sql = "SELECT * FROM block INNER JOIN unit ON unit.unitID = block.unitID WHERE blockID='"+blockID+"' and block.isDel = 0";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });
    app.get('/get/block/barcode',(req,res) => {
      var blockCode = req.query.id;
      var sql = "SELECT * FROM block INNER JOIN unit ON unit.unitID = block.unitID WHERE blockCode='"+blockCode+"' and block.isDel = 0";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.post('/delete/block',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM block WHERE blockID='%s'",id);
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
      var sql = sprintf("UPDATE block SET blockCode='%s',row='%s',col='%s' WHERE blockID='%s'",blockCode,row,col,id);
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