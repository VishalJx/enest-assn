const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model('course', courseSchema);
