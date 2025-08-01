const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const {user , contact} = require('./config');
const { Collection } = require("mongoose");

const app = express();

app.use(express.json());

app.use(express.static("public"));
app.use('/MEDIA', express.static('MEDIA'));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("HOME");
});

app.get("/home", (req, res) => {
    res.render("HOME");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/inscrire", (req, res) => {
    res.render("inscrire");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/equipe", (req, res) => {
    res.render("equipe");
});

app.get("/services", (req, res) => {
    res.render("services");
});

app.post("/inscrire" , async(req , res)=>{
    console.log("Donnees recues :", req.body);
    const data = {
        name: req.body.name,
        email: req.body.email,
        PhoneNumber: req.body.PhoneNumber,
        Password: req.body.Password,
        confirmPassword: req.body.confirmPassword
    }
    if (data.Password !== data.confirmPassword){
        return res.send("Passwords do not match");
    }
    const existingUser = await user.findOne({name : data.name});

    if(existingUser){
        return res.send('User already exists. Please choose a different username.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
    data.Password = hashedPassword;
    delete data.confirmPassword;

    const userdata = await user.create(data);
    console.log("User inserted:", userdata);

    res.redirect("/");
});

app.post("/login" , async(req , res)=> {
    try{
        const check = await user.findOne({name : req.body.name});
        if(!check){
            res.send("User name cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.Password,check.Password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("home");
        }
    }
    catch{
        res.send("wrong Details");
    }
});

app.post("/contact" ,async(req , res) => {
    console.log("Donnees recues :", req.body);
    const dataC = {
        nomComplet: req.body.nomComplet,
        emailC: req.body.emailC,
        sujet: req.body.sujet,
        explication: req.body.explication
    };
    const existingUser = await user.findOne({name : dataC.nomComplet});
    if(!existingUser){
        return res.send('Please inscrivez vous');
    }
    const newContact = await contact.create(dataC);
    console.log("User inserted:", newContact);

    res.redirect("/");
});
const port = 1000;   
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});             