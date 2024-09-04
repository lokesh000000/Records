import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import path from 'path'

import RecordRoutes from'./Route/RecordRoute.js'

const app = express();
config();
const port = process.env.PORT ;
const __dirname = path.resolve()


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api/records', RecordRoutes);

app.use(express.static(path.join(__dirname,"/client/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
