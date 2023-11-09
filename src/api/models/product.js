const { Model, DataTypes } = require('sequelize');
const CategoryInit = require('./category');

module.exports = (sequelize) => {
  const Category = CategoryInit(sequelize);
  /**
   * Modelo para tabla `products` para administrar información sobre
   * los productos de la API Web
   * * `id`: Tipo `number`, autoincremental -> Identificador del producto
   * * `name`: Tipo `string`, obligatorio -> Nombre del producto
   * * `description`: Tipo `string`, obligatorio -> Descripción del producto
   * * `price`: Tipo `number` -> Precio del producto
   * * `paths`: Tipo `array` -> Hipervínculos del producto
   */
  class Product extends Model {}

  return Product.init(
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
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      paths: {
        type: DataTypes.VIRTUAL,
        get() {
          return [
            {
              href: `/api/products/${this.id}`,
              action: 'GET',
            },
            {
              href: `/api/products/${this.id}`,
              action: 'PUT',
            },
            {
              href: `/api/products/${this.id}`,
              action: 'DELETE',
            },
          ];
        },
      },
    },
    { sequelize, modelName: 'products', timestamps: false }
  );
};
