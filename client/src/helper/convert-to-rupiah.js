export default function formatRupiah(amount) {
  const numberString = String(amount);
  const characters = numberString.split("");

  let result = "";
  let count = 0;
  for (let i = characters.length - 1; i >= 0; i--) {
    result = characters[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = "." + result;
    }
  }

  result = "Rp " + result;

  return result;
}
