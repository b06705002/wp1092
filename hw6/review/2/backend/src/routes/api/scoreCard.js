import { Router } from 'express';
import ScorecardData from '../../../models/ScoreCard.js';


const router = Router();



router.get('/get-card',async function (req, res) {

  try{
    const allCards = await  ScorecardData.find();

    res.status(200).json(allCards);
  }
  catch(error){
    res.status(404).json({ message: error.message});
  }
})



router.post('/create-card', async function (req, res) {

  const card = req.body;

  const new_card = new ScorecardData(card);

  try {

    const existing = await ScorecardData.findOne({name:new_card.name,subject:new_card.subject});

    if(!existing){
      await new_card.save();
      res.status(201).json({card:new_card,message:`Adding (${new_card.name}, ${new_card.subject}, ${new_card.score})`});

    }else{
      const filter = {name:new_card.name,subject:new_card.subject};
      const update = {score:new_card.score };
      let doc = await ScorecardData.findOneAndUpdate(filter,update);
      res.status(201).json({card:new_card,message:`Updating (${new_card.name}, ${new_card.subject}, ${new_card.score})`});
    }

    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {

    res.status(409).json({ message: e.message });
  }
});

// TODO: delete the collection of the DB
router.delete('/clear-card', async function (req, res) {
  try{
    await ScorecardData.deleteMany({});
    res.status(201).json({ message:'Database cleared'});
  }catch(e){
    res.status(409).json({ message: e.message });
  }
})

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query-card', async function (req, res) {

  const  query = req.body;


  try {
    if(query.queryType === 'name'){

      const existing = await ScorecardData.findOne({name:query.queryString});
      if(!existing){
        res.status(201).json({message:`Name ${query.queryString} not found!`});
      }
      else{
        const docs = await ScorecardData.find({name:query.queryString});
        const array = [];

        for(var i = 0;i < docs.length;i++){
          array.push(`${docs[i].name}, ${docs[i].subject}, ${docs[i].score}`); 
        }
        res.status(201).json({messagess:array});
      }
    }else{
      const existing = await ScorecardData.findOne({subject:query.queryString});
      if(!existing){
        res.status(201).json({message:`Subject ${query.queryString} not found!`});
      }
      else{
        const docs = await ScorecardData.find({subject:query.queryString});
        const array = [];

        for(var i = 0;i < docs.length;i++){
          array.push(`${docs[i].name}, ${docs[i].subject}, ${docs[i].score}`); 
        }
        res.status(201).json({messagess:array});
      }
    }
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {

    res.status(409).json({ message: e.message });
  }
});
export default router;