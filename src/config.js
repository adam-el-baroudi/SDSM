require("dotenv").config();
const mongoose = require('mongoose');


const connect = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
connect.then(() => {
    console.log("Database Connected Succesfully");
})
.catch(()=>{
    console.log("Database cannot be Connected");
})


const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
   

});

const contactshema = new mongoose.Schema({
    nomComplet : {
        type : String,
        require : true
    },
    emailC : {
        type : String,
        require : true
    },
    sujet : {
        type: String,
        required: true
    },
    explication : {
        type: String,
        required: true
    }
});

const user = new mongoose.model("users",Loginschema);
const contact = new mongoose.model("contact",contactshema);

module.exports = {user , contact};