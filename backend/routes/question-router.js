const Router = require('express').Router;
const questionController = require('../controller/question-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

// All routes require authentication
router.use(authMiddleware);

// Get available levels for a category and difficulty
router.get('/levels/:category/:difficulty', questionController.getLevels);

// Get questions for a specific category, difficulty and level
router.get('/questions/:category/:difficulty/:level', questionController.getQuestions);

// Submit answers and get results
router.post('/submit', questionController.submitAnswers);

// Get user's progress for a category and difficulty
router.get('/progress/:category/:difficulty', questionController.getUserProgress);

module.exports = router;