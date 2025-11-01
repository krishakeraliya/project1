require('dotenv').config();
const connectdb = require('../utils/db');
const Question = require('../model/question-model');

async function verify() {
  await connectdb();
  const categories = ['quantitative','logical','verbal','technical','programming'];
  const diffs = ['easy','medium','hard'];

  for (const c of categories) {
    for (const d of diffs) {
      const cnt = await Question.countDocuments({ category: c, difficulty: d });
      console.log(`${c} - ${d}: ${cnt}`);
    }
  }
  process.exit(0);
}

verify().catch(e=>{console.error(e); process.exit(1)});