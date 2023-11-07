const app = require('./src/app');
const db = require('./src/config/db');
require('dotenv').config();

(async function () {
  try {
    await db();
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
      process.stdout.write(`[INFO] Server in '${process.env.NODE_ENV}' mode\n`);
      process.stdout.write(`[INFO] Server listening on port: ${PORT}\n`);
    });
  } catch (error) {
    process.stdout.write(`[ERROR] Error starting server: ${error.message}`);
    process.exit(1);
  }
})();
