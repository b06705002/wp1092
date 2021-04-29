let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (!number || forceRestart === true)
    number = Math.floor(Math.random() * 101);
  return number
}

export default getNumber
