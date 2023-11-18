const mongoose = require('mongoose');
const {Schema} = mongoose;

const TodoSchema = new Schema({
    fullName : {type:String},
    title : {type:String},
    description : {type:String},
    status : {type:String},
})

module.exports = mongoose.model("Todo",TodoSchema);