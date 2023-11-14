const { Model, DataTypes } = require('sequelize');
const CategoryInit = require('./category');

module.exports = (sequelize) => {
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
        set(value) {
          this.setDataValue('name', value.trim().toLowerCase());
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          this.setDataValue('description', value.trim().toLowerCase());
        },
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      paths: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.changed() === false) {
            return [
              {
                ref: 'self',
                href: `/api/products/${this.getDataValue('id')}`,
                action: 'GET',
              },
              {
                ref: 'self',
                href: `/api/products/${this.getDataValue('id')}`,
                action: 'PUT',
              },
              {
                ref: 'self',
                href: `/api/products/${this.getDataValue('id')}`,
                action: 'DELETE',
              },
              {
                ref: 'categories',
                href: `/api/categories/${
                  this.getDataValue('categoryId') ?? this.getDataValue('category').id
                }`,
                action: 'GET',
              },
              {
                ref: 'categories',
                href: `/api/categories/${
                  this.getDataValue('categoryId') ?? this.getDataValue('category').id
                }`,
                action: 'PUT',
              },
              {
                ref: 'categories',
                href: `/api/categories/${
                  this.getDataValue('categoryId') ?? this.getDataValue('category').id
                }`,
                action: 'DELETE',
              },
            ];
          }
          return false;
        },
      },
    },
    { sequelize, modelName: 'products', timestamps: false }
  );
};
