// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import { model, Schema } from 'mongoose';

const scoreCardSchema = new Schema({
  name: String,
  subject: String,
  score: Number
});

export default model('ScoreCard', scoreCardSchema);