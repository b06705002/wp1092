let number

const getNumber = (forceRestart) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  number=forceRestart?Math.round(Math.random()*100):number
  return number;
}

export default getNumber
