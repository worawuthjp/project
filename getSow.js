const sow = require('./db')

app.get('/sow', (req, res) => {
  res.json(sow)
})
app.get('/get/sow',(req,res) => {
  var sql = "SELECT * FROM sow";
  con.query(sql,function(err,result,field){
    if(err) throw err;
    res.send("ENTER");
  });
});

