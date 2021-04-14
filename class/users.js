const { sprintf } = require("sprintf-js");
var dateFormat = require("dateformat");
var now = new Date();
var dateNow = dateFormat(now,"yyyy-mm-dd HH:MM:ss")

module.exports = function (app, con) {

  app.get("/get/prename/All", (req, res) => {
    var sql = "SELECT * FROM prename";
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/position/All", (req, res) => {
    var sql = "SELECT * FROM position";
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/position/search", (req, res) => {
    var search = req.query.search;
    var sql = "SELECT * FROM position WHERE position.pos_name LIKE '%"+search+"%'";
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.post("/add/position", (req, res) => {
    var name = req.body.name;
    var farmID = req.body.farmID;
    var sql = sprintf("INSERT INTO `position` (pos_name,created_at,updated_at,farmID) VALUES('%s','%s','%s','%s')",name,dateNow,dateNow,farmID);
    console.log(sql);
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      res.send(JSON.stringify({"status":"success"}));
    });
  });

  app.put("/update/position", (req, res) => {
    var name = req.body.name;
    var id = req.body.id;
    var sql = sprintf("UPDATE position SET pos_name = '%s' WHERE posID = '%s' ",name,id);
    console.log(sql);
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      res.send(JSON.stringify({"status":"success"}));
    });
  });

  app.delete("/delete/position", (req, res) => {
    var id = req.body.id;
    var sql = sprintf("DELETE FROM position WHERE posID = '%s' ",id);
    console.log(sql);
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      res.send(JSON.stringify({"status":"success"}));
    });
  });

  app.get("/get/employee/All", (req, res) => {
    var sql ="SELECT position.*,employee.*,employee.empID as ID,(SELECT username FROM user WHERE empID = ID) As username FROM employee LEFT JOIN pos_emp ON pos_emp.empID = employee.empID LEFT JOIN position ON position.posID = pos_emp.posID LEFT JOIN unit ON unit.unitID = employee.unitID";
    console.log(sql);
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/employee/search", (req, res) => {
    var searchTxt = req.query.search;
    var sql ="SELECT position.*,employee.*,employee.empID as ID,(SELECT username FROM user WHERE empID = ID) As username FROM employee LEFT JOIN pos_emp ON pos_emp.empID = employee.empID LEFT JOIN position ON position.posID = pos_emp.posID LEFT JOIN unit ON unit.unitID = employee.unitID WHERE employee.empCode LIKE '%"+searchTxt+"%' OR employee.fname LIKE '%"+searchTxt+"%' OR employee.lname LIKE '%"+searchTxt+"%' OR position.pos_name LIKE '%"+searchTxt+"%'";
    console.log(sql);
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/employee", (req, res) => {
    var id = req.query.id;
    var sql ="SELECT position.*,employee.*,employee.empID as ID,(SELECT username FROM user WHERE empID = ID) As username FROM employee INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID WHERE employee.empID = '"+id+"'";
    con.query(sql, (err, result, filed) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/employee/barcode", (req, res) => {
    var id = req.query.barcode;
    var sql ="SELECT position.*,employee.*,employee.empID as ID,(SELECT username FROM user WHERE empID = ID) As username FROM employee INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID WHERE employee.empCode = '"+id+"'";
    con.query(sql, (err, result, filed) => {
      console.log(sql);
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.get("/get/employee/unit", (req, res) => {
    var id = req.query.unit;
    var sql ="SELECT position.*,employee.*,employee.empID as ID,(SELECT username FROM user WHERE empID = ID) As username FROM employee INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID WHERE unit.unitID = '"+id+"'";
    con.query(sql, (err, result, filed) => {
      console.log(sql);
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result));
      } else {
        res.send({ status: "not found data" });
      }
    });
  });

  app.post("/add/user", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var isAmin = req.body.isAdmin;
    var id = req.body.id;
    var sql ="INSERT INTO user(empID,username,password,isAdmin,created_at,updated_at) VALUES('" +id +"','" +username +"','" +password +"','" +isAmin +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"')";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      var data = { status: "success" };
    res.send(JSON.stringify(data));
    });
  });

  app.post("/add/employee", (req, res) => {
    var pre = req.body.pre;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var empCode = req.body.empCode;
    var unitID = req.body.unitID;
    var farmID = req.body.farmID;
    var posID = req.body.posID
    var sql ="INSERT INTO employee(fname,lname,preID,empCode,farmID,created_at,updated_at,unitID) VALUES('" +fname +"','" +lname +"','" +pre +"','"+empCode+"','" +farmID +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"','"+unitID+"')";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      console.log(result);
      var insert_id = result.insertId;
      sql = sprintf("INSERT INTO pos_emp (posID,empID,created_at,updated_at) VALUES('%s','%s','%s','%s')",posID,insert_id,dateNow,dateNow);
      con.query(sql,function(err,result,field){
        if(err) throw err;
        var data = { status: "success" };
        res.send(JSON.stringify(data));
      });
      
    });
  });

  app.post("/check/user", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (req.query.username && req.query.password){
      username = req.query.username;
      password = req.query.password;
    }
    var sql ="SELECT * FROM user INNER JOIN employee ON employee.empID = user.empID WHERE username='" +username +"' and password = '" +password +"'";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      if (result.length != 0) {
        console.log(result.length);
        var data = {status: "success",username: result[0].username,empID: result[0].empID,farmID : result[0].farmID};
        res.send(JSON.stringify(data));
      } else {
        res.send(JSON.stringify({ status: "not found data" }));
      }
    });
  });

  app.post("/check/Admin", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql ="SELECT * FROM user WHERE username='" +username +"' and password = '" +password +"' and isAdmin = '1' ";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      if (result.length != 0) {
        console.log(result.length);
        var data = {status: "success",username: result[0].username,empID: result[0].empID,login: true};
        res.send(JSON.stringify(data));
      } else {
        res.send(JSON.stringify({ status: "not found data", login: false }));
      }
    });
  });

  app.get("/get/user/All", (req, res) => {
    var sql = "SELECT unit.unitID,unit.unitName,employee.fname,employee.lname,employee.empCode,employee.farmID,employee.created_at,employee.updated_at,user.empID,user.isAdmin,user.username,user.isAdmin ,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID LEFT JOIN pos_emp ON pos_emp.empID = employee.empID LEFT JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID ";
    console.log(sql);
    con.query(sql, function (err, result, filed) {
      if (err) throw err;
      if (result.length != 0) {
        console.log(result.length);
        var data = JSON.stringify(result);
        res.send(data);
      } else {
        res.send(JSON.stringify({ status: "not found data" }));
      }
    });
  });

  app.get("/get/user/search", (req, res) => {
    var searchTxt = req.query.search;
    var sql = "SELECT unit.unitID,unit.unitName,employee.fname,employee.lname,employee.empCode,employee.farmID,employee.created_at,employee.updated_at,user.empID,user.isAdmin,user.username,user.isAdmin ,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID LEFT JOIN pos_emp ON pos_emp.empID = employee.empID LEFT JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID WHERE user.username LIKE '%"+searchTxt+"%' OR employee.fname LIKE '%"+searchTxt+"%' OR employee.lname LIKE '%"+searchTxt+"%' OR position.pos_name LIKE '%"+searchTxt+"%' OR employee.empCode LIKE '%"+searchTxt+"%'";
    console.log(sql);
    con.query(sql, function (err, result, filed) {
      if (err) throw err;
      if (result) {
        console.log(result.length);
        var data = JSON.stringify(result);
        res.send(data);
      } else {
        res.send(JSON.stringify({ status: "not found data" }));
      }
    });
  });

  app.get("/get/user", (req, res) => {
    var sql ="SELECT unit.unitID,unit.unitName,employee.fname,employee.lname,employee.empCode,employee.farmID,employee.created_at,employee.updated_at,user.empID,user.isAdmin,user.username,user.isAdmin,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID INNER JOIN unit ON unit.unitID = employee.unitID WHERE employee.empID = '" +req.query.id +"'";
    console.log(req.query.id);
    con.query(sql, function (err, result, filed) {
      if (err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });

  app.get("/get/user/barcode", (req, res) => {
    var barcode = req.query.id;
    var sql =
    "SELECT unit.unitID,unit.unitName,employee.fname,employee.lname,employee.empCode,employee.farmID,employee.created_at,employee.updated_at,user.empID,user.isAdmin,user.username,user.isAdmin,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID INNER JOIN unit ON unit.unitID = employee.unitID  WHERE employee.empCode = '" +barcode +"'";
    con.query(sql, function (err, result, field) {

      if (err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });

  app.put("/update/employee", (req, res) => {
    var id = req.body.id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var pre = req.body.pre;
    var empCode = req.body.empCode;
    var unitID = req.body.unitID;
    var posID = req.body.posID;
    var sql = sprintf("UPDATE employee SET fname='%s',lname = '%s',preID='%s',empCode='%s',unitID='%s' WHERE empID='%s' ",fname,lname,pre,empCode,unitID,id);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        sql = sprintf("UPDATE pos_emp SET posID='%s' WHERE empID = '%s'",posID,id);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          res.send({ status: "success" });
        });
      } else {
        res.send({ status: "errors" });
      }
    });
  });
  app.put("/update/user", (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.isAdmin;
    if(password){
      var sql = sprintf("UPDATE user SET username='%s',password = '%s',isAdmin='%s' WHERE empID='%s' ",username,password,isAdmin,id);
    }else{
      var sql = sprintf("UPDATE user SET username='%s',isAdmin='%s' WHERE empID='%s' ",username,isAdmin,id);
    }
    console.log(sql);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        res.send({ status: "success" });
      } else {
        res.send({ status: "errors" });
      }
    });
  });

  app.delete("/delete/employee", (req, res) => {
    var id = req.body.id;
    var sql = sprintf("DELETE FROM employee WHERE empID='%s'", id);
    console.log(sql);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        sql = sprintf("DELETE FROM user WHERE empID='%s'", id);
        console.log(sql);
        con.query(sql,(err,result,field)=>{
          if(err) throw err;
          sql = sprintf("DELETE FROM pos_emp WHERE empID='%s'", id);
          console.log(sql);
          con.query(sql,(err,result,field)=>{
            if(err) throw err;
            res.send({ status: "success" });
          })
        });
       
      } else {
        res.send({ status: "errors" });
      }
    });
  });

  app.post("/delete/user", (req, res) => {
    var id = req.body.id;
    var sql = sprintf("DELETE FROM user WHERE empID='%s'", id);
    console.log(sql);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        res.send({ status: "success" });
      } else {
        res.send({ status: "errors" });
      }
    });
  });
};