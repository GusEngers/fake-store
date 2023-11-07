const app = require('./src/app');
require('dotenv').config();

async function main() {
  try {
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
      process.stdout.write(`[INFO] Server listening on port: ${PORT}\n`);
    });
  } catch (error) {
    process.stdout.write(`[ERROR] Error starting server: ${error.message}`);
    process.exit(1);
  }
}

main();
