import express from 'express'
import getNumber from '../core/getNumber'
import getTime from '../core/getTime'

// TODO
// create folder
const timeNow = getTime()
const logFilePath = process.cwd() + '/server/log/' + timeNow + '.log'
const fs = require('fs')
fs.exists(process.cwd()+'/server/log', function(exists){
  if(!exists){
      fs.mkdir(process.cwd()+'/server/log', (err) => {
        if (err){
          throw err
        }
      })
  }
})
// create log file
fs.closeSync(fs.openSync(logFilePath, 'w'))

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true)
  fs.appendFile(logFilePath, 'start number=' + number.toString() + ' ' + getTime() + '\n', function (err) {
    if (err)
        console.log(err);
  });
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  fs.appendFile(logFilePath, 'guess ' + guessed.toString() + ' ' + getTime() + '\n', function (err) {
    if (err)
        console.log(err);
  });
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed > number) {
      res.status(200).send({ msg: 'Smaller'})
    }
    else if (guessed < number) {
      res.status(200).send({ msg: 'Bigger'})
    }
    else{
      fs.appendFile(logFilePath, 'end-game' + '\n', function (err) {
        if (err)
            console.log(err);
      });
      res.status(200).send({ msg: 'Equal'})
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const number = getNumber(true)
  fs.appendFile(logFilePath, 'restart number=' + number.toString() + ' ' + getTime() + '\n', function (err) {
    if (err)
        console.log(err);
  });
  res.json({ msg: 'The game has restarted.' })
})

export default router
