const mongoose = require("mongoose")
const {Schema , model} = mongoose

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

const User = model("User" , userSchema);
module.exports = User;