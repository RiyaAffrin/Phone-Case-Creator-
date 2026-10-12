const BASE_PRICE = 10 // plain case

// add up all picked options
// prices come back as strings so we use Number()
export const calcPrice = ({ color, pattern, stickers, charm }) => {
  let total = BASE_PRICE
  if (color) total += Number(color.price)
  if (pattern) total += Number(pattern.price)
  if (charm) total += Number(charm.price)
  stickers.forEach((s) => (total += Number(s.price)))
  return total
}