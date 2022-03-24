const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance');

const bodyparser = require("body-parser");

const port = 3000;

//Schema for mongoose document
const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    age: String,
    hobby: String
});
const Contact = mongoose.model('Contact', contactSchema);
// const bodyparser = require("body-parser");

//Saving User info in our data base

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the databse")
    })
    // res.status(200).render('contact.pug')
})


//Important syntax to get user information
app.use(express.urlencoded());

//Engine define
app.set('view engine','pug');

//Defining staic Files
app.use('static',express.static('static'));

//Get Request
app.get("/", (req,res)=>{
    const content = {'title': "DANCE WEBSITE"};
    res.status(200).render('home.pug',content);
})

app.get("/contact", (req,res)=>{
    const content = {'title': "DANCE WEBSITE : CONTACT"};
    res.status(200).render('contact.pug',content);
})

// app.post("/contact", (req,res)=>{
//     let name = req.body.name;
//     let age = req.body.age;
//     let address= req.body.address;
//     let hobby = req.body.hobby;
//     OutPutText = 
//    `Name : ${name}
//     Age  : ${age}
//     Hobby : ${hobby}
//     Address : ${address}`;
//     fs.writeFileSync('Output.txt',OutPutText);
//     const content = {'title': "DANCE WEBSITE : CONTACT"};
//     res.status(200).render('submit.pug',content);
// })

//Server start
app.listen(port , ()=>{
    console.log(`The application started successfully at port ${port}`);
})