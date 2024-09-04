import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
