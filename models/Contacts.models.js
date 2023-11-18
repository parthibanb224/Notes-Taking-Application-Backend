const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactsSchema = new Schema({
    userName : {type:String},
    name : {type:String},
    email : {type:String},
    number : {type:String},
    address : {type:String},
})

module.exports = mongoose.model("Contacts",ContactsSchema);