import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
    try { 
        const {
            data: { msg }
        } = await instance.post('/start')
        return msg
    } catch(error) {
        console.log(error.message)
        if (error.message === 'Network Error'){
            return error.message
        }
    }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
    try {
        const {
            data: { msg }
        } = await instance.get('/guess', { params: { number } })
        console.log("message from server: ", msg)
        return msg
    } catch(error) {
        console.log(error.message)
        if (error.message === 'Network Error'){
            return error.message
        }

        var err_msg = `Error: ${number} is not a valid number (1 - 100)`
        console.log(err_msg)
        return err_msg;
    }
}

const restart = async () => {
    try {
        const {
            data: { msg }
        } = await instance.post('/restart')
        return msg
    } catch(error) {
        console.log(error.message)
        if (error.message === 'Network Error'){
            return error.message
        }
    }
}

export { startGame, guess, restart }
