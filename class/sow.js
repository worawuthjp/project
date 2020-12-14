module.exports = function(app,con){

    app.post('/save/sow',(req,res)=>{
        var recType = req.body.recType;
        var birthDate = req.body.birthDate;
        var breed = req.body.breed;
        var sire = req.body.sire;
        var dam = req.body.dam;
        var origin = req.body.origin;
        var farmID = req.body.farmID;
      
        var sql = "INSERT INTO sow (recType,birthDate,breed,sire,dam,origin,farmID,created_at,updated_at) VALUES('"+recType+"','"+birthDate+"','"+breed+"','"+sire+"','"+dam+"','"+origin+"','"+farmID+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
      });
      app.get('/get/sow/:id',(req,res) => {
        var sowID = req.params.id;
        var sql = "SELECT * FROM sow WHERE sowID='"+sowID+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      
      app.get('/get/sow/UHF/:id',(req,res) => {
        var UHF = req.params.id;
        var sql = "SELECT * FROM sow WHERE uhf='"+UHF+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      
      app.get('/get/sow/sowCode/:id',(req,res) => {
        var sowCode = req.params.id;
        var sql = "SELECT * FROM sow WHERE sowCode='"+sowCode+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      app.get('/get/sow/All',(req,res) => {
        var sql = "SELECT * FROM sow WHERE isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        });
      
      });
      
}