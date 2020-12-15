const { sprintf } = require("sprintf-js");

module.exports = function(app,con){

    app.post('/add/sowmating',(req,res)=>{
        var sowSemenID = req.body.sowSemenID;
        var sowID = req.body.sowID;
        var userID = req.body.userID;
      
        var sql = "INSERT INTO sowmating(sowSementID,sowID,userID,created_at,updated_at) Values('"+sowSemenID+"','"+sowID+"','"+userID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')"
        con.query(sql,function(err,result,filed){
          if(err) throw err;
          var data = JSON.stringify({"status":"success"});
          res.send(data);
        });
    });

    app.get('/get/sowmating/All',(req,res)=>{
      var sql = "SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN user ON user.userID = sowmating.userID WHERE sowmating.isDel = 0";
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          res.send({"status":"success"});
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/id',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN user ON user.userID = sowmating.userID WHERE sowmating.isDel = 0 and sowmating.sowMatingID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          res.send({"status":"success"});
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/sowDam',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN user ON user.userID = sowmating.userID WHERE sowmating.isDel = 0 and sow.recType='D' and sow.sowID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          res.send({"status":"success"});
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });

    app.get('/get/sowmating/sowSire',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("SELECT * FROM sowmating INNER JOIN sowsemen ON sowsemen.sowSemenID = sowmating.sowSemenID INNER JOIN sow ON sow.sowID = sowmating.sowID INNER JOIN user ON user.userID = sowmating.userID WHERE sowmating.isDel = 0 and sow.recType='S' and sow.sowID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err
        if(result){
          res.send({"status":"success"});
        }
        else{
          res.send({"status":"errors"});
        }
      })
    });
      
    app.post('/update/sowmating',(req,res)=>{
      var id = req.body.id;
      var sowSemenID = req.body.sowSemenID;
      var sowID = req.body.sowID;
      var userID = req.body.userID;
      var sql = sprintf("UPDATE sowmating SET sowSemenID='%s',sowID='%s',userID='%s' WHERE sowMatingID='%s",sowSemenID,sowID,userID.id);
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
      var sql = sprintf("UPDATE sowmating SET isDel=1 WHERE sowMatingID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result)
          res.send({"status":"success"});
        else
          res.send({"status":"errors"});
      })
    });
}