const { PRODUCTION, DEVELOPMENT } = require('../utils/constants');
require('dotenv').config();
const MODE = process.env.NODE_ENV;

const { Sequelize } = require('sequelize');

/**
 * Función para crear una instancia Sequelize para la conexión
 * de la base de datos, utiliza diferentes enfoques teniendo
 * en cuenta si la conexión se realiza en modo producción o
 * en modo desarrollo
 */
function createInstance() {
  if (MODE === PRODUCTION) {
    /**
     * Realiza la conexión en modo producción utilizando:
     * - DB_URI: String URI de acceso a la base de datos
     */
    return new Sequelize(process.env.DB_URI, { logging: false });
  } else if (MODE === DEVELOPMENT) {
    /**
     * Realiza la conexión en modo desarrollo utilizando:
     * - DB_NAME: Nombre de la base de datos
     * - DB_USER: Nombre de usuario que administra la base de datos
     * - DB_PASSWORD: Contraseña de acceso a la base de datos
     */
    const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
    });
  } else {
    throw new Error('Missing information to make the connection to the database');
  }
}
const sequelize = createInstance();

/**
 * Función que verifica si se estableció la conexión a la base de datos
 */
async function db() {
  try {
    await sequelize.authenticate();
    process.stdout.write('[INFO] Database connected\n');
  } catch (error) {
    process.stdout.write(`[ERROR] Error connected database: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = { db, sequelize };
