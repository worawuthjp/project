const { sprintf } = require("sprintf-js");

module.exports = function(app,con){
    app.get('/get/sowbirth/All',(req,res)=>{
        var sql = "SELECT * FROM sowbirth INNER JOIN sow ON sow.sowID = sowbirth.sowID where sowbirth.isDel = 0";
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
      app.get('/get/sowbirth/:id',(req,res) => {
        var sowBirthID = req.params.id;
        var sql = "SELECT * FROM sowbirth INNER JOIN sow ON sow.sowID = sowbirth.sowID where sowbirth.isDel = 0 and sowbirth.sowBirthID = '"+sowBirthID +"'";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      app.get('/get/sowbirth/sowID/:id',(req,res) => {
        var sowID = req.params.id;
        var sql = "SELECT * FROM sowbirth INNER JOIN sow ON sow.sowID = sowbirth.sowID where sowbirth.isDel = 0 and sowbirth.sowID = '"+sowID +"'";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });

      app.post('/add/sowbirth',(req,res)=>{
        var sowID = req.body.sowID;
        var userID = req.body.userID;
        var alive = req.body.alive;
        var died = req.body.died;
        var mummy = req.body.mummy;
        var total_weight = req.body.total_weight;

        var sql = sprintf("INSERT INTO sowbirth(alive,died,mummy,total_weight,sowID,userID,isDel,created_at,updated_at) VALUES('%s','%s','%s,'%s','%s','%s,'%s','%s','%s')",alive,died,mummy,total_weight,sowID,userID,isDel,created_at,updated_at);
        con.query(sql,function(err,result,filed){
          if(err) throw err;
          var data = JSON.stringify({"status":"success"});
          res.send(data);
        });
    });
    app.post('delete/sowBirth',(req,res)=>{
        var id = req.body.id;
        var sql = sprintf("UPDATE sowbirth SET isDel=1 WHERE sowBirthID='%s'",id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          if(result)
            res.send({"status":"success"});
          else
            res.send({"status":"errors"});
        })
      });
      app.post('/update/sowBirth',(req,res)=>{
        var id = req.body.id;
        var alive = req.body.alive;
        var died = req.body.died;
        var mummy = req.body.mummy;
        var total_weight = req.body.total_weight;
        var sql = sprintf("UPDATE sowbirth SET alive='%s',died='%s',mummy='%s',total_weight='%s' WHERE sowBirthID='%s",alive,died,mummy,total_weight);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          if(result)
            res.send({"status":"success"});
          else
            res.send({"status":"errors"})
        })
      });
}