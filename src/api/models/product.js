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
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      paths: {
        type: DataTypes.VIRTUAL,
        get() {
          return [
            {
              ref: 'self',
              href: `/api/products/${this.id}`,
              action: 'GET',
            },
            {
              ref: 'self',
              href: `/api/products/${this.id}`,
              action: 'PUT',
            },
            {
              ref: 'self',
              href: `/api/products/${this.id}`,
              action: 'DELETE',
            },
            {
              ref: 'categories',
              href: `/api/categories/${this.categoryId ?? this.category.id}`,
              action: 'GET',
            },
            {
              ref: 'categories',
              href: `/api/categories/${this.categoryId ?? this.category.id}`,
              action: 'PUT',
            },
            {
              ref: 'categories',
              href: `/api/categories/${this.categoryId ?? this.category.id}`,
              action: 'DELETE',
            },
          ];
        },
      },
    },
    { sequelize, modelName: 'products', timestamps: false }
  );
};
