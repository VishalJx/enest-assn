const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    entranceExam: {
        type: String,
        enum: ['all', 'cftri', 'gate', 'cuet', 'ugc net', 'nin', 'icar', 'mba (gdpi)'],
        default: 'all'
    },
    competitiveExam: {
        type: String,
        enum: ['all', 'jae-sfa', 'cgpdtm', 'cfso', 'fci'],
        default: 'all'
    }
});

module.exports = mongoose.model('course', courseSchema);