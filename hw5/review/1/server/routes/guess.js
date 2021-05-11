import express from 'express'
import getNumber from '../core/getNumber'
let fs = require('fs')
let nowtime = new Date();
let logname = `./server/log/${nowtime.getFullYear()}-${nowtime.getMonth()+1}-${nowtime.getDate()}-${nowtime.getHours()}-${nowtime.getMinutes()}.log`

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start',(_, res) => {
  getNumber(true);
  let ttime = new Date();
  fs.appendFile(logname,`start number=${getNumber(false)} ${ttime.getFullYear()}-${ttime.getMonth()+1}-${ttime.getDate()}-${ttime.getHours()}-${ttime.getMinutes()}-${ttime.getSeconds()}\n`,()=>{});

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  
  let ttime = new Date();
  fs.appendFile(logname,`guess ${guessed} ${ttime.getFullYear()}-${ttime.getMonth()+1}-${ttime.getDate()}-${ttime.getHours()}-${ttime.getMinutes()}-${ttime.getSeconds()}\n`,()=>{});


  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(200).send({ msg: 'Not a legal number.' })
  }
  else{
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(guessed<getNumber(false)) res.status(200).send({ msg: 'Bigger' })
    else if(guessed>getNumber(false)) res.status(200).send({ msg: 'Smaller' })
    else {
      res.status(200).send({ msg: 'Equal' })
      
      fs.appendFile(logname,'end-game\n',()=>{});

    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart',(_,res)=>{
  getNumber(true);
  res.json({ msg: 'The game has restarted.' })
  
  let ttime = new Date();
  fs.appendFile(logname,`restart number=${getNumber(false)} ${ttime.getFullYear()}-${ttime.getMonth()+1}-${ttime.getDate()}-${ttime.getHours()}-${ttime.getMinutes()}-${ttime.getSeconds()}\n`,()=>{});

})



export default router
