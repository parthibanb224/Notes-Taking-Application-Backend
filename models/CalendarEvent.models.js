const mongoose = require('mongoose');
const {Schema} = mongoose;

const CalendarEventSchema = new Schema({
    fullName: {type:String},
    title: {type:String},
    date: {type:String},
    time: {type:String},
    type: {type:String},
    details: {type:String},
    start: {type:Date},
    end: {type:Date},
    day: {type:String},
})

module.exports = mongoose.model("CalendarEvent",CalendarEventSchema);