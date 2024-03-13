const mongoose = require("mongoose")
const {Schema , model} = mongoose

//create the user schema
const userSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true,
        default : 0
    }
})
//creates the user model
const User = model("User" , userSchema);
//exports the user model
module.exports = User;
