const mongoose = require('mongoose');
const { Schema } = mongoose;

const FestivalSchema = new Schema({
    name: {
        type: String,
    },
    date: {
        type: Object,
    },
    country: {
        type: Object,
    },
    locations: {
        type: String,
    },
    type: {
        type: Array
    }
})

module.exports = mongoose.model("Festival", FestivalSchema);