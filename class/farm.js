const { sprintf } = require("sprintf-js");
var dateFormat = require('dateformat');
var now = new Date();
var dateNow = dateFormat(now,"yyyy-mm-dd HH:MM:ss");
module.exports = function(app,con){

    app.post('/add/farm',(req,res)=>{
        var farmname = req.body.farmname;
        var lat = req.body.lat;
        var lon = req.body.lon;
        var ownerID = req.body.ownerID;
        if(lat){
            lat = '';
        }
        if(lon){
            lon = '';
        }
        var sql = "INSERT INTO farm (farmname,lat,lon,ownerID,created_at,updated_at) VALUES('"+farmname+"','"+lat+"','"+lon+"','"+ownerID+"','"+dateNow+"','"+dateNow+"')";
        console.log(sql);
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify({'status':'sucess'});
          res.send(data);
        });
    });
    
    app.get('/get/farm/All',(req,res) => {
      var sql = "SELECT * FROM farm INNER JOIN owner ON owner.ownerID = farm.ownerID";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      });
    });
    
    app.get('/get/farm',(req,res) => {
      var farmID = req.query.id;
      var sql = "SELECT * FROM farm INNER JOIN owner ON owner.ownerID = farm.ownerID WHERE farmID='"+farmID+"'";
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = JSON.stringify(result);
        res.send(data);
      })
    });

    app.post('/delete/farm',(req,res)=>{
      var id = req.body.id;
      var sql = sprintf("DELETE FROM farm WHERE farmID='%s'",id);
      con.query(sql,(err,result,field)=>{
        if(err) throw err;
        if(result){
          res.send({"status":"success"});
        }else{
          res.send({"status":"errors"});
        }
      })
    });

    app.put('/update/farm',(req,res)=>{
      var id = req.body.id;
      var farmname = req.body.farmname;
      var lat = req.body.lat;
      var lon = req.body.lon;
      var sql = sprintf("UPDATE farm SET farmname='%s',lat='%s',lon='%s',updated_at = '%s' WHERE farmID='%s'",farmname,lat,lon,dateFormat,id);
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