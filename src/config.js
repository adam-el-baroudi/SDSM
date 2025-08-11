require("dotenv").config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });




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
    },
    createdAtt : {
        type:Date,
        default: () => new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })
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
    },

});


const user = new mongoose.model("users",Loginschema);
const contact = new mongoose.model("contact",contactshema);


module.exports = {user , contact};