const Question = require('../model/question-model');
const UserProgress = require('../model/user-progress-model');
const ApiError = require('../utils/api-error');

class QuestionController {
    // Get available levels for a category and difficulty
    async getLevels(req, res, next) {
        try {
            const { category, difficulty } = req.params;
            
            // Validate inputs
            if (!category || !difficulty) {
                throw ApiError.BadRequest('Category and difficulty are required');
            }

            // Get distinct levels
            const levels = await Question.distinct('level', { category, difficulty });
            levels.sort((a, b) => a - b); // Sort numerically

            console.log(`Found ${levels.length} levels for ${category}/${difficulty}`);
            
            // Get user's progress to determine unlocked levels
            const userId = req.user._id;
            const userProgress = await UserProgress.findOne({
                userId,
                category,
                difficulty
            });

            const maxUnlockedLevel = userProgress ? userProgress.maxUnlockedLevel : 1;
            
            // Return levels with unlock status
            const levelStatus = levels.map(level => ({
                level,
                isUnlocked: level <= maxUnlockedLevel
            }));

            res.json({
                levels: levelStatus,
                maxUnlockedLevel
            });
        } catch (error) {
            console.error('Error in getLevels:', error);
            next(error);
        }
    }

    async getQuestions(req, res, next) {
        try {
            const { category, difficulty, level } = req.params;
            // Configurable number of questions per attempt
            const questionsPerLevel = Number(process.env.QUESTIONS_PER_LEVEL) || 10;
            
            console.log('Fetching questions with params:', { category, difficulty, level });
            
            // Validate inputs
            if (!category || !difficulty || !level) {
                throw ApiError.BadRequest('Category, difficulty and level are required');
            }

            // Verify user has unlocked this level
            const userId = req.user._id;
            const userProgress = await UserProgress.findOne({
                userId,
                category,
                difficulty
            });

            const maxUnlockedLevel = userProgress ? userProgress.maxUnlockedLevel : 1;
            if (Number(level) > maxUnlockedLevel) {
                return res.status(403).json({
                    message: 'This level is locked. Complete previous levels to unlock.'
                });
            }

                        // Get questions for this level. Use aggregation to filter and randomize.
                        // We first count matching docs to avoid $sample size > count errors.
                        const match = { category, difficulty, level: Number(level) };
                        const availableCount = await Question.countDocuments(match);

                        const sampleSize = Math.min(questionsPerLevel, availableCount);

                        const pipeline = [ { $match: match } ];
                        if (sampleSize > 0) pipeline.push({ $sample: { size: sampleSize } });
                        pipeline.push({
                            $project: {
                                questionText: 1,
                                options: 1,
                                category: 1,
                                difficulty: 1,
                                level: 1
                            }
                        });

                        const questions = sampleSize > 0 ? await Question.aggregate(pipeline) : [];

            console.log(`Returning ${questions.length} questions`);

            res.json(questions);
        } catch (error) {
            console.error('Error in getQuestions:', error);
            res.status(500).json({
                message: 'Internal server error while fetching questions',
                error: error.message
            });
        }
    }

    async submitAnswers(req, res, next) {
        try {
            const { questionIds, userAnswers, category, difficulty, level } = req.body;
            const userId = req.user._id; // Assuming auth middleware sets req.user

            // Validate input
            if (!Array.isArray(questionIds) || !Array.isArray(userAnswers)) {
                throw ApiError.BadRequest('Invalid submission format');
            }

            // Get correct answers
            const questions = await Question.find({ _id: { $in: questionIds } });
            
            // Calculate score
            let correctCount = 0;
            questions.forEach((question, index) => {
                if (question.correctAnswer === userAnswers[index]) {
                    correctCount++;
                }
            });

            const score = (correctCount / questions.length) * 100;
            const passed = score >= 60;

            // Update user progress and unlock next level if passed
            let userProgress = await UserProgress.findOne({
                userId,
                category,
                difficulty
            });

            const currentLevel = Number(level);

            if (!userProgress) {
                userProgress = new UserProgress({
                    userId,
                    category,
                    difficulty,
                    maxUnlockedLevel: passed ? currentLevel + 1 : 1,
                    unlockedLevels: [1]
                });
            }

            // Add score to history
            userProgress.scores.push({
                level: Number(level),
                score
            });

            // Unlock next level if passed
            if (passed && !userProgress.unlockedLevels.includes(Number(level) + 1)) {
                userProgress.unlockedLevels.push(Number(level) + 1);
            }

            await userProgress.save();

            res.json({
                score,
                passed,
                correctCount,
                totalQuestions: questions.length,
                unlockedLevels: userProgress.unlockedLevels
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserProgress(req, res, next) {
        try {
            const userId = req.user._id;
            const { category, difficulty } = req.params;

            const progress = await UserProgress.findOne({
                userId,
                category,
                difficulty
            });

            if (!progress) {
                return res.json({
                    unlockedLevels: [1],
                    scores: []
                });
            }

            res.json({
                unlockedLevels: progress.unlockedLevels,
                scores: progress.scores
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new QuestionController();