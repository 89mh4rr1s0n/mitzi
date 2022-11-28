export const fetchProducts = async () => {
  const products = await fetch("https://dummyjson.com/products?limit=100")
  const json = await products.json();
  return json;
}