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
      
}