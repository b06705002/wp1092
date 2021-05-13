import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const existing = await ScoreCard.findOne({name: req.body.name, subject: req.body.subject})
    if (existing) {
      console.log("Update Scorecard", {name: req.body.name, subject: req.body.subject, score: req.body.score});
      ScoreCard.findOneAndUpdate({name: req.body.name, subject: req.body.subject}, { '$set': { score: req.body.score }}, { 'new': true },
        function(err) {
          if (err) {
            console.log("Update Error");
            res.json({ message: 'Failed to update'});
          } else {
            console.log("Update Success");
            res.json({ message: "Updating (" + req.body.name + ", " + req.body.subject + ", " + req.body.score + ")", card: req.body });
          }
        }
      );
    } else {
      try {
        const newScoreCard = new ScoreCard({name: req.body.name, subject: req.body.subject, score: req.body.score});
        console.log("Create Scorecard", {name: req.body.name, subject: req.body.subject, score: req.body.score});
        newScoreCard.save();
        console.log("Create Success");
        res.json({ message: "Adding (" + req.body.name + ", " + req.body.subject + ", " + req.body.score + ")", card: req.body })
      } catch (e) {
        console.log("Create Error", e);
        res.json({ message: 'Failed to add'})
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
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)

router.delete('/delete-card', async function (_, res) {
  try {
    console.log("Clearing Database");
    ScoreCard.deleteMany({}, function(err) {
      if (err) {
        console.log("Delete Error");
        res.json({ message: 'Failed to delete'});
      } else {
        console.log("Delete Success");
        res.json({ message: "Database cleared" });
      }
    });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)

router.post('/implement-query', async function (req, res) {
  if (req.body.queryType == 'name') {
    try {
      console.log("Implement Query", {name: req.body.queryString});
      const existing = await ScoreCard.find({name: req.body.queryString})
      console.log("Implement Query Success");
      var existingList = [];
      for (let i=0; i<existing.length; i++) {
        existingList.push(existing[i].subject + ": " + String(existing[i].score));
      }
      res.json({ messages: existingList, message: 'Implement Success'});
    } catch (e) {
      console.log("Implement Query Error");
      res.json({ message: 'Failed to implement'});
    }
  } else {
    try {
      console.log("Implement Query", {subject: req.body.queryString});
      const existing = await ScoreCard.find({subject: req.body.queryString})
      console.log("Implement Query Success");
      var existingList = [];
      for (let i=0; i<existing.length; i++) {
        existingList.push(existing[i].name + ": " + String(existing[i].score));
      }
      res.json({ messages: existingList, message: 'Implement Success'});
    } catch (e) {
      console.log("Implement Query Error");
      res.json({ message: 'Failed to implement'});
    }
  }
});

export default router;
