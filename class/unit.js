module.exports = function(app,con){

    app.post('/save/unit',(req,res)=>{
        var unitCode = req.body.unitCode;
        var farmID = req.body.farmID;
        var unitName = req.body.unitName;
      
        var sql = "INSERT INTO unit (unitCode,farmID,unitName,created_at,updated_at) VALUES('"+unitCode+"','"+farmID+"','"+unitName+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"','"+dateFormat(now,'yyyy-mm-dd HH:MM:ss')+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
      });
      app.post('/save/block',(req,res)=>{
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
      app.get('/get/unit/All',(req,res) => {
        var sql = "SELECT * FROM unit WHERE isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        });
      });
      
      app.get('/get/unit/:id',(req,res) => {
        var unitID = req.params.id;
        var sql = "SELECT * FROM unit WHERE unitID='"+unitID+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      app.get('/get/block/All',(req,res) => {
        var sql = "SELECT * FROM block WHERE isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        });
      });
      
      app.get('/get/block/:id',(req,res) => {
        var blockID = req.params.id;
        var sql = "SELECT * FROM block WHERE blockID='"+blockID+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      app.get('/get/block/RFID/:id',(req,res) => {
        var blockCode = req.params.id;
        var sql = "SELECT * FROM block WHERE blockCode='"+blockCode+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        })
      });
      
}