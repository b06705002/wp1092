import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  let returnstr,errcode;
  try{
    const {data: { msg },status:{err}} = await instance.get('/guess', { params: { number } })
    returnstr=msg;
    errcode=err;
    if(msg == "Not a legal number.") returnstr = `Error: ${number} is not a valid number (1 - 100)`
  }catch(error){
    returnstr="server not responding or not connected";
  }
  return returnstr;
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
