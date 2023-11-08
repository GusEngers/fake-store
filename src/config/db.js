const { Sequelize } = require('sequelize');
const { PRODUCTION, DEVELOPMENT } = require('../utils/constants');
require('dotenv').config();

/**
 * Función para realizar la conexión a la base de datos,
 * utiliza diferentes enfoques si la conexión se realiza
 * en la aplicación en modo producción o en modo desarrollo
 */
async function db() {
  try {
    const MODE = process.env.NODE_ENV;
    if (MODE === PRODUCTION) {
      /**
       * Realiza la conexión en modo producción utilizando:
       * - DB_URI: String URI de acceso a la base de datos
       */
      const sequelize = new Sequelize(process.env.DB_URI, { logging: false });
      await sequelize.authenticate();
      process.stdout.write('[INFO] Database connected\n');
    } else if (MODE === DEVELOPMENT) {
      /**
       * Realiza la conexión en modo desarrollo utilizando:
       * - DB_NAME: Nombre de la base de datos
       * - DB_USER: Nombre de usuario que administra la base de datos
       * - DB_PASSWORD: Contraseña de acceso a la base de datos
       */
      const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
      const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
      });
      await sequelize.authenticate();
      process.stdout.write('[INFO] Database connected\n');
    } else {
      throw new Error('Missing information to make the connection to the database');
    }
  } catch (error) {
    process.stdout.write(`[ERROR] Error connected database: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = db;
