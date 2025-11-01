// seed-questions.js - minimal wrapper that delegates to the canonical seeder (seed.js)
// Replaces previous malformed content.
require('dotenv').config();

try {
  // seed.js handles connection, deletion and insertion.
  require('./seed');
} catch (err) {
  console.error('Failed to run seed.js from seed-questions.js:', err);
  process.exit(1);
}