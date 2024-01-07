const express = require('express');
let cors = require("cors")
let mysql = require("mysql")
let con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1234"
})

con.connect(err => {
    if (err) console.log("error")
    else console.log("connected")
})
// base64.baseb4test;
const app = express();
app.use(express.json({ limit: '1gb' }))
app.use(cors())
app.set('port', process.env.PORT || 3000)
app.use(express.urlencoded({ extended: true, limit: '1gb' }));
app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})
app.post('/post', (req, res, next) => {
    console.log(req.body)
    con.query("insert into base64.baseb4test set ?",req.body,(err,result)=>{
        if(err)console.log("err")
        else console.log("done")
    })
    res.send("radhe shyam")
    res.end()
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})