const express = require('express');
let mysql = require("mysql")
let cors = require("cors")
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors())
app.use(express.json())
// app.use(cors())

let connect = mysql.createConnection({
    host: "localhost",
    password: "1234",
    user: "root"
})
connect.connect((err => {
    if (err) console.log(err)
    else console.log("connected")
}))

// (code start 22)if upload folder is not created then automatic create it
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}
// code end 22


// create multer code start(30)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// end (30)

app.get('/', (req, res, next) => {
    const uploadDirectory = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
    }
    connect.query("select * from test.radhe", (err, result) => {
        if (err) {
            res.send("error", err)
            res.end()
        }
        else {
            res.send(result)
            res.end()
        }
    })
})
app.use(express.static(path.join(__dirname)));

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    const uploadDirectory = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
    }
    console.log(req.body)
    const host = req.get('host');
    let files = req.file

    let text = req.body.text
    obj = {
        files: `${req.protocol}://${host}/${files.path}`,
        types: files.mimetype,
        ...JSON.parse(text)
    }

    connect.query("insert into test.radhe set ?", obj, (err => {
        if (err) console.log(err)
        else console.log("saved")
    }))
    // console.log(req.body.text)
    res.send({ name: "radhe" });
    res.end()
});

app.listen(3010);


