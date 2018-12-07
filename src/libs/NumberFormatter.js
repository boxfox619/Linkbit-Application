
export const dollarFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}