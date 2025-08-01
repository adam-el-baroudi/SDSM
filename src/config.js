require("dotenv").config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Database cannot be Connected:", error);
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