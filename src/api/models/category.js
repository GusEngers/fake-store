const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  /**
   * Modelo para tabla `categories` para administrar información sobre
   * las categorías de productos de la API Web
   * * `id`: Tipo `number`, autoincremental -> Identificador de la categoría
   * * `name`: Tipo `string`, obligatorio -> Nombre de la categoría
   * * `description`: Tipo `string`, obligatorio -> Descripción de la categoría
   * * `paths`: Tipo `array` -> Hipervínculos de la categoría
   */
  class Category extends Model {}

  return Category.init(
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
              ref: 'self',
              href: `/api/categories/${this.id}`,
              action: 'GET',
            },
            {
              ref: 'self',
              href: `/api/categories/${this.id}`,
              action: 'PUT',
            },
            {
              ref: 'self',
              href: `/api/categories/${this.id}`,
              action: 'DELETE',
            },
            {
              ref: 'products',
              href: `/api/categories/${this.id}/products`,
              action: 'GET',
            },
          ];
        },
      },
    },
    { sequelize, modelName: 'categories', timestamps: false }
  );
};
