const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const cors = require('cors');
const mysql= require('mysql2')

const db = mysql.createPool({
host:"localhost",
user:"root",
password:"Amaan@123098",
database:"crud_contact",
});
app.use(cors());

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get',(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (err,result)=>{
        res.json(result);
    })
});
app.post('/api/post',(req,res)=>{
    const{name,email,contact} = req.body;
    const sqlInsert=
    "INSERT INTO contact_db (name,email,contact) VALUES(?,?,?)";
    db.query(sqlInsert,[name, email, contact],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
});

app.delete('/api/delete/:id',(req,res)=>{
    const{id} = req.params;
    const sqlRemove=
    "DELETE FROM contact_db WHERE ID=?"
    db.query(sqlRemove,id,(err,result)=>{
        if(err){
            console.log(err);
        }
    })
});
app.get('/api/get/:id',(req,res)=>{
    const{id}= req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet,id ,(e,result)=>{
        if(e){
            console.log(e);
        }
        res.send(result);
    })
});

app.put('/api/put/:id',(req,res)=>{
    const{id}= req.params;
    const{name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    })
});


app.get("/",(req,res)=>{
   /* const sqlInsert =
     "INSERT INTO contact_db (name,email,contact) VALUES('tanmay','tanan55@gmail.com',874546464)";
    db.query(sqlInsert,(err, result)=>{
        console.log("eror", err);
        console.log("data", result)
        res.send("hello");

    })*/
})

app.listen(5000, ()=>{
    console.log('server is running');
})