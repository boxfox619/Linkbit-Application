export const dollarFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const fixed = (number, range) => {
  const str = String(number)
  const num = Number(number)
  if (str.length - str.lastIndexOf('.') > range) {
    return num.toFixed(range)
  }
  
  return num
}