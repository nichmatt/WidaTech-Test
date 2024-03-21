export function stringOfSelectedProduct(selectedProduct) {
  let string = "";
  selectedProduct.forEach((el, index) => {
    if (index === selectedProduct.length - 1) {
      let word = el.qty + " of " + el.name + ".";
      string += word;
    } else {
      let word = el.qty + " of " + el.name + ", ";
      string += word;
    }
  });
  return string;
}
