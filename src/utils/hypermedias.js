/**
 * Función para generar un array con los vínculos hypermedia de
 * las solicitudes de categorías
 * @returns Lista de vínculos de categorias
 */
function categoriesHypermedia() {
  return [
    {
      href: `/api/categories`,
      action: 'POST',
    },
    {
      href: `/api/categories`,
      action: 'GET',
    },
    {
      href: `/api/categories`,
      action: 'PUT',
    },
    {
      href: `/api/categories`,
      action: 'DELETE',
    },
  ];
}

module.exports = { categoriesHypermedia };
