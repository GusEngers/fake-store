const { PRODUCTION, DEVELOPMENT } = require('../utils/constants');
require('dotenv').config();
const MODE = process.env.NODE_ENV;

const pg = require('pg');
const { Sequelize } = require('sequelize');
const ProductInit = require('../api/models/product');
const CategoryInit = require('../api/models/category');

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
    return new Sequelize(process.env.DB_URI, { logging: false, dialectModule: pg });
  } else if (MODE === DEVELOPMENT) {
    /**
     * Realiza la conexión en modo desarrollo utilizando:
     * - DB_NAME: Nombre de la base de datos
     * - DB_USER: Nombre de usuario que administra la base de datos
     * - DB_PASSWORD: Contraseña de acceso a la base de datos
     */
    const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
    return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'postgres',
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false,
      //   },
      // },
    });
  } else {
    throw new Error('Missing information to make the connection to the database');
  }
}
const sequelize = createInstance();
const Product = ProductInit(sequelize);
const Category = CategoryInit(sequelize);

/**
 * Función que verifica si se estableció la conexión a la base de datos
 * y sincroniza los modelos de las tablas de la base de datos
 */
async function db() {
  try {
    Category.hasMany(Product, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Product.belongsTo(Category);
    if (MODE === PRODUCTION) {
      await Category.sync();
      await Product.sync();
    }
    if (MODE === DEVELOPMENT) {
      await Category.sync({ alter: true });
      await Product.sync({ alter: true });
    }

    await sequelize.authenticate();
    process.stdout.write('[INFO] Database connected\n');
  } catch (error) {
    process.stdout.write(`[ERROR] Error connected database: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = { db, Product, Category };
