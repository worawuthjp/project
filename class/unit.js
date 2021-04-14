const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();

module.exports = function(app,con){

  app.post('/add/unit',(req,res)=>{
    var farmID = req.body.farmID;
    var unitName = req.body.unitName;
    var col = req.body.col;
    var row = req.body.row;
  
    var sql = "INSERT INTO unit (unitName,farmID,created_at,updated_at) VALUES('"+unitName+"','"+farmID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var unitID = result.insertId;
      var code = '';
      for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
          code = farmID+''+unitID+(i+1)+(j+1);
          sql = "INSERT INTO unit_block (blockCode,row,col,unitID,created_at,updated_at) VALUES('"+code+"','"+(i+1)+"','"+(j+1)+"','"+unitID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
          con.query(sql,function(err,result,field){
            
          });
        }
      }
      var data = JSON.stringify({'status':'success'});
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

  app.get('/get/unit/search',(req,res) => {
    var searchTxt = req.query.search;
    var sql = "SELECT * FROM unit WHERE unitID LIKE'%"+searchTxt+"%' OR unitName LIKE '%"+searchTxt+"%'";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    })
  });
  
  app.delete('/delete/unit',(req,res)=>{
    var id = req.body.unit;
    var sql = sprintf("DELETE FROM unit_block WHERE unitID='%s'",id);
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

  app.put('/update/unit',(req,res)=>{
    var id = req.body.id;
    var unitName = req.body.unitName;
    var sql = sprintf("UPDATE unit SET unitName='%s' WHERE unitID='%s'",unitName,id);
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