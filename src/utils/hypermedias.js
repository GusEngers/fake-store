/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de categorías
 * @returns Lista de vínculos de categorias
 */
function categoriesHypermedia() {
  return [
    {
      ref: 'self',
      href: `/api/categories`,
      action: 'POST',
    },
    {
      ref: 'self',
      href: `/api/categories`,
      action: 'GET',
    },
    {
      ref: 'self',
      href: `/api/categories`,
      action: 'PUT',
    },
    {
      ref: 'self',
      href: `/api/categories`,
      action: 'DELETE',
    },
  ];
}

/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de productos
 * @returns Lista de vínculos de productos
 */
function productsHypermedia() {
  return [
    {
      ref: 'self',
      href: `/api/products`,
      action: 'POST',
    },
    {
      ref: 'self',
      href: `/api/products`,
      action: 'GET',
    },
    {
      ref: 'self',
      href: `/api/products`,
      action: 'PUT',
    },
    {
      ref: 'self',
      href: `/api/products`,
      action: 'DELETE',
    },
  ];
}

/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de productos por categoría
 * @param id Identificador de la categoría
 * @returns Lista de vínculos de productos por categoría
 */
function productsByCategoryHypermedia(id) {
  return [
    {
      ref: 'self',
      href: `/api/categories/${id}/products`,
      action: 'GET',
    },
  ];
}

module.exports = { categoriesHypermedia, productsHypermedia, productsByCategoryHypermedia };
