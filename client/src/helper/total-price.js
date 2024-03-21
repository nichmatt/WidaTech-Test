export function totalPrice(selectedProduct) {
  let totalPrice = 0;
  selectedProduct.forEach((element) => {
    const price = element.qty * element.price;
    totalPrice += price;
  });
  return totalPrice;
}
