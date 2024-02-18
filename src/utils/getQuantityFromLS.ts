export const quantity = (id: string) => {
  const productJson = localStorage.getItem(id)
  if (productJson) {
    const product = JSON.parse(productJson)
   return product.quantity;
  }
}