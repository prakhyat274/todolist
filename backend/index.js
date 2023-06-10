const express = require("express")
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const cors = require('cors')

//Middleware and Initialising storage
const jsonParser = bodyParser.json()
const app = express();
app.use(cors())

//Setting Global Varibles for MySQL
const host = "127.0.0.1";
const port = "3306";
const user = "root";
const password = "2803";
const database = "test";

//Connecting To MySQL
const conn = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
})
conn.connect((err)=>{
    if(err){
        console.log("Connection not Established", err)
    }
    else{
        console.log("Connection Successfull")
    }
})



// POST Response To Frontend by storing it in storage
app.post('/', jsonParser, async(req,res)=>{
    const {task} = req.body;
    conn.query(`INSERT INTO taskList VALUES ("${task}", "${task}");`)
})

// GET Response To Frontend by sending data from storage
app.get('/', async (req, res) => {
    conn.query("SELECT * FROM taskList;",function(err,result,fields){
        res.send(result)
    })
});

// DELETE Response To Frontend by deleting data from storage
app.delete('/',jsonParser, async (req, res) => {
    const {deleteText} = req.body;
    conn.query(`DELETE FROM taskList WHERE taskText = "${deleteText}";`)
    conn.query("SELECT * FROM taskList;",function(err,result,fields){
        res.send(result)
    })
});

app.listen(5000, ()=>{
    console.log("Server has Started")
})