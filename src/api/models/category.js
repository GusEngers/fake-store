const { PRODUCTION, DEVELOPMENT } = require('../../utils/constants');
require('dotenv').config();
const MODE = process.env.NODE_ENV;

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

/**
 * Modelo para tabla `categories` para crear información sobre
 * las categorías de productos de la API Web
 * * `id`: Tipo `number`, autoincremental -> Identificador de la categoría
 * * `name`: Tipo `string`, obligatorio -> Nombre de la categoría
 * * `description`: Tipo `string`, obligatorio -> Descripción de la categoría
 * * `paths`: Tipo `array` -> Hipervínculos de la categoría
 */
class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paths: {
      type: DataTypes.VIRTUAL,
      get() {
        return [
          {
            href: `/${this.id}`,
            action: 'GET',
          },
          {
            href: `/${this.id}`,
            action: 'PUT',
          },
          {
            href: `/${this.id}`,
            action: 'DELETE',
          },
          {
            href: `/${this.id}/products`,
            action: 'GET',
          },
        ];
      },
    },
  },
  { sequelize, modelName: 'categories', timestamps: false }
);

/**
 * Función de sincronización de la tabla 'categories' según su
 * entorno de ejecución
 */
(async function () {
  if (MODE === PRODUCTION) {
    await Category.sync();
  }
  if (MODE === DEVELOPMENT) {
    await Category.sync({ alter: true });
  }
})();

module.exports = Category;
