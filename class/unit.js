module.exports = function(app,con){

  app.post('/add/unit',(req,res)=>{
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
  
  require('./block')(app,con)
      
}