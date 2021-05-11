import express from 'express'
import { guess } from '../../src/axios'
import getNumber from '../core/getNumber'
import Logger from '../Logger'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

let message_log = ''

var d = new Date()
var dformat = [
    d.getFullYear(),
    d.getMonth()+1,
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
].join('-');

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
    // write log
    message_log = `start number=${getNumber()} ${dformat}`
    Logger(message_log)
    getNumber(true)
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
      // TODO: check if number and guessed are the same,
      // and response with some hint "Equal", "Bigger", "Smaller"
      message_log = `guess ${guessed} ${dformat}`
      Logger(message_log)
      if (guessed > number){
        res.json({ msg: 'Smaller' })
      }
      else if(guessed < number){
        res.json({ msg: 'Bigger' })
      }
      else if(guessed === number){
        // write log
        message_log = 'End game.'
        Logger(message_log)
        res.json({ msg: 'Equal' })
      }
  }
})

router.post('/restart', (_, res) => {
    // write new log
    Logger(`restart number=${getNumber()} ${dformat}`)
    getNumber(true)
    res.json({ msg: 'The game has restarted.' })
  })

export default router
