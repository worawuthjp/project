module.exports = function(app,con){
    app.post('/save/user',(req,res) => {
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
            var data = {'status':'success'};
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
      
      app.get('/get/user/barcode/:id',(req,res) => {
        var barcode = req.params.id;
        var sql = "SELECT * FROM user WHERE username = '"+barcode+"' and isDel = 0";
        con.query(sql,function(err,result,field){
          if(err) throw err;
          var data = JSON.stringify(result);
          res.send(data);
        });
      
      });
      
}