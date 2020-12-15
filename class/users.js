const { sprintf } = require("sprintf-js");

module.exports = function(app,con){

  app.post('/add/user',(req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    var pre = req.body.pre;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var birthDate = req.body.birthDate;
    var farmID = req.body.farmID;
    var typeUserID = req.body.typeUserID;
    var sql = "INSERT INTO user(username,password,email,fname,lname,pre,birthDate,farmID,typeUserID,created_at,updated_at) VALUES('"+username+"','"+password+"','"+email+"','"+fname+"','"+lname+"','"+pre+"','"+birthDate+"','"+farmID+"','"+typeUserID+"','"+dateFormat(now,"yyyy-mm-dd HH:MM:ss")+"','"+dateFormat(now,"yyyy-mm-dd HH:MM:ss")+"')"
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = {'status':'success'};
      res.send(JSON.stringify(data));
    });
  });
  
  app.post('/check/user',(req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM user WHERE username='"+username+"' and password = '"+password+"' and isDel = 0";
    console.log(sql);
    con.query(sql,function(err,result,field){
      if(err) throw err;
      if(result != []){
        var data = {'status':'success','username':result[0].username,'userID':result[0].userID,'farmID':result[0].farmID};
        console.log(result);
        res.send(JSON.stringify(data));
      }else{
        res.send(JSON.stringify({'status':'failed'}));
      }
    });
  });
  
  app.get('/get/user/All',(req,res) => {
    var sql = "SELECT userID,username,email,fname,lname,pre,birthDate,farmID,typeUserID FROM user WHERE isDel=0";
    con.query(sql,function(err,result,filed){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });
  
  app.get('/get/user/ID/:id',(req,res) => {
    var sql = "SELECT userID,username,email,fname,lname,pre,birthDate,farmID,typeUserID FROM user WHERE userID = '"+req.params.id+"' and isDel=0";
    console.log(req.params.id);
    con.query(sql,function(err,result,filed){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });
  
  app.get('/getID/user/barcode/:id',(req,res) => {
    var barcode = req.params.id;
    var sql = "SELECT userID FROM user WHERE username = '"+barcode+"' and isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
  
      if(result[0]){
        var data = JSON.parse(JSON.stringify(result));
        console.log(data[0].userID);
        var resu = data[0].userID;
        res.send(""+resu);
        
      }else{
        res.send("");
      }
      
    });
  
  });
  app.get('/get/user/barcode/:id',(req,res) => {
    var barcode = req.params.id;
    var sql = "SELECT * FROM user WHERE username = '"+barcode+"' and isDel = 0";
    con.query(sql,function(err,result,field){
      if(err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  
  });
  app.post('/update/user',(req,res)=>{
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var pre = req.body.pre;
    var birthDate = req.body.birthDate;
    var sql = sprintf("UPDATE user SET username='%s',password = '%s',email-'%s',fname='%s',lname='%s',pre='%s',birthDate='%s' WHERE userID='%s' ",username,password,email,fname,lname,pre,birthDate,id);
    con.query(sql,(err,result,field)=>{
      if (err) throw err;
      if(result){
        res.send({"status":"success"});
      }else{
        res.send({"status":"errors"});
      }
    })

  });

  app.post('/delete/user',(req,res)=>{
    var id = req.body.id;
    var sql = sprintf("UPDATE user SET isDel=1 WHERE userID='%s'",id);
    con.query(sql,(err,result,field)=>{
      if(err) throw err;
      if(result){
        res.send({"status":"success"});
      }else{
        res.send({"status":"errors"});
      }
    })
  });

  
}