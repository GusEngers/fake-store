/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de categorías
 * @param {{ limit: number, offset: number }} limit Límite de productos por consulta
 * @param offset Número de categorías a omitir
 * @returns Lista de vínculos de categorias
 */
function categoriesHypermedia({ limit = 10, offset = 0 }) {
  return [
    {
      ref: 'self',
      href: `/api/categories?limit=${limit}&offset=${offset}`,
      action: 'POST',
    },
    {
      ref: 'self',
      href: `/api/categories?limit=${limit}&offset=${offset}`,
      action: 'GET',
    },
    {
      ref: 'self',
      href: `/api/categories?limit=${limit}&offset=${offset}`,
      action: 'PUT',
    },
    {
      ref: 'self',
      href: `/api/categories?limit=${limit}&offset=${offset}`,
      action: 'DELETE',
    },
  ];
}

/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de productos
 * @param {{ limit: number, offset: number }} limit Límite de productos por consulta
 * @param offset Número de categorías a omitir
 * @returns Lista de vínculos de productos
 */
function productsHypermedia({ limit = 10, offset = 0 }) {
  return [
    {
      ref: 'self',
      href: `/api/products?limit=${limit}&offset=${offset}`,
      action: 'POST',
    },
    {
      ref: 'self',
      href: `/api/products?limit=${limit}&offset=${offset}`,
      action: 'GET',
    },
    {
      ref: 'self',
      href: `/api/products?limit=${limit}&offset=${offset}`,
      action: 'PUT',
    },
    {
      ref: 'self',
      href: `/api/products?limit=${limit}&offset=${offset}`,
      action: 'DELETE',
    },
  ];
}

/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de productos por categoría
 * @param {{ id: number, limit: number, offset: number }} id Identificador de la categoría
 * @param limit Límite de productos por consulta
 * @param offset Número de categorías a omitir
 * @returns Lista de vínculos de productos por categoría
 */
function productsByCategoryHypermedia({ id, limit = 10, offset = 0 }) {
  return [
    {
      ref: 'self',
      href: `/api/categories/${id}/products?limit=${limit}&offset=${offset}`,
      action: 'GET',
    },
  ];
}

module.exports = { categoriesHypermedia, productsHypermedia, productsByCategoryHypermedia };
