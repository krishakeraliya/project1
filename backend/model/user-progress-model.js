const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    maxUnlockedLevel: {
        type: Number,
        default: 1 // Level 1 is unlocked by default
    },
    scores: [{
        level: Number,
        score: Number,
        attemptedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Compound index to ensure unique progress tracking per user per category/difficulty
progressSchema.index({ userId: 1, category: 1, difficulty: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', progressSchema);