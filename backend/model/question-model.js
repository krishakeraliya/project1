const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(options) {
                return options.length === 4;
            },
            message: 'Question must have exactly 4 options'
        }
    },
    correctAnswer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['quantitative', 'logical', 'verbal', 'technical', 'programming']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    level: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('Question', questionSchema);