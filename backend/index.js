var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyparser = require("body-parser");
const cors = require("cors");

app.use(bodyparser.json());
app.use(cors());

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sampleDB'
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    } else {
        console.log('connected');
    }
})
// get all data
app.get('/data', function(req, res){
    connection.query("SELECT * FROM tutorial", function(error, rows, fields){
        if(!!error){
            console.log(error)
        } else {
            res.send(rows);
        }
    })
})

//get a data
app.get('/data/:id', function(req, res){
    const id = req.body.id;
    const sql = "SELECT * FROM tutorial WHERE id = ?";
    const values = [req.params.id];
    connection.query(sql, [values], function(error, rows, fields){
        if(!!error){
            console.log(error)
        } else {
            res.send(rows);
        }
    })
})

// delete data
app.delete('/data/delete', function(req, res){
    connection.query("DELETE FROM tutorial", function(error, rows, fields){
        if(!!error){
            console.log(error)
        } else {
            res.send("deleted");
        }
    })
})
// inserted data
app.post('/data', function(req, res){  
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    
    const sql = "INSERT INTO tutorial VALUES ?";
    const values = [[id, title, description, status]];
    connection.query(sql, [values],(error, rows, fields)=>{
        if(!!error){
            console.log(error)
        } else {
            res.send("inserted");
        }
    })
})

// update data 
app.put('/data/:id', function(req, res){  
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    
    const sql = "UPDATE tutorial SET ? ";
    const values = [[id, title, description, status]];
    connection.query(sql, [values],(error, rows, fields)=>{
        if(!!error){
            console.log(error)
        } else {
            res.send("inserted");
        }
    })
})

// search
app.get('/title', function(req, res){
    const titles = req.body.title;
    const sql = "SELECT * FROM tutorial WHERE title = ? ";
    const values = [titles];
    connection.query(sql, [values], function(error, rows, fields){
        if(!!error){
            console.log(error);
        } else {
            res.send(rows);
        }
    })
})


app.listen(5000, ()=>console.log("Express server is runnong on port number 5000"));