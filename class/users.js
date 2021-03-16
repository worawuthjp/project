const { sprintf } = require("sprintf-js");
var dateFormat = require("dateformat");
var now = new Date();

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

  app.get("/get/employee/All", (req, res) => {
    var sql ="SELECT * FROM employee INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID";
    con.query(sql, (err, result, filed) => {
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
    var isAmin = req.body.isAmin;
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
    var birthDate = req.body.birthDate;
    var farmID = req.body.farmID;
    var sql ="INSERT INTO employee(fname,lname,preID,empCode,farmID,created_at,updated_at) VALUES('" +fname +"','" +lname +"','" +pre +"','" +farmID +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"','" +dateFormat(now, "yyyy-mm-dd HH:MM:ss") +"')";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      var data = { status: "success" };
      res.send(JSON.stringify(data));
    });
  });

  app.post("/check/user", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql =
    "SELECT * FROM user WHERE username='" +username +"' and password = '" +password +"'";
    console.log(sql);
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      if (result.length != 0) {
        console.log(result.length);
        var data = {status: "success",username: result[0].username,empID: result[0].empID};
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
    var sql = "SELECT employee.fname,employee.lname,employee.empCode,employee.created_at,employee.updated_at,user.username,user.password,user.isAdmin ,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID";
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

  app.get("/get/user", (req, res) => {
    var sql ="SELECT employee.fname,employee.lname,employee.empCode,employee.created_at,employee.updated_at,user.username,user.password,user.isAdmin,position.pos_name FROM employee INNER JOIN user ON user.empID = employee.empID INNER JOIN pos_emp ON pos_emp.empID = employee.empID INNER JOIN position ON position.posID = pos_emp.posID WHERE employee.empID = '" +req.query.id +"'";
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
    "SELECT * FROM employee INNER JOIN user ON user.empID = employee.empID WHERE employee.empCode = '" +barcode +"'";
    con.query(sql, function (err, result, field) {
      if (err) throw err;
      var data = JSON.stringify(result);
      res.send(data);
    });
  });

  app.post("/update/employee", (req, res) => {
    var id = req.body.id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var pre = req.body.pre;
    var empCode = req.body.empCode;
    var sql = sprintf("UPDATE employee SET fname='%s',lname = '%s',pre='%s',empCode-'%s' WHERE empID='%s' ",fname,lname,pre,id,empCode);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        res.send({ status: "success" });
      } else {
        res.send({ status: "errors" });
      }
    });
  });
  app.post("/update/user", (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.isAdmin;
    var sql = sprintf("UPDATE user SET username='%s',password = '%s',isAdmin='%s' WHERE empID='%s' ",username,password,isAdmin,id);
    con.query(sql, (err, result, field) => {
      if (err) throw err;
      if (result) {
        res.send({ status: "success" });
      } else {
        res.send({ status: "errors" });
      }
    });
  });

  app.post("/delete/employee", (req, res) => {
    var id = req.body.id;
    var sql = sprintf("DELETE FROM employee WHERE empID='%s'", id);
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