const express = require('express');
const app = express();
const userRoute = require('./routes/users')
const eventRoute = require('./routes/events')
const voteRoute = require('./routes/votes')
const categoriesRoute = require('./routes/categories')
const seeds = require('./routes/seeds')
const Event = require('./models/Event');

const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Метод:', req.method);
  console.log('Тіло:', req.body);
  next();
});

const mongoose = require("mongoose");
const mongoString = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";

app.get('/api', async (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});


app.use("/api/seeds", seeds);
app.use("/api/categories", categoriesRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/votes", voteRoute);



async function main() {

  try {
    await mongoose.connect(mongoString);
    app.listen(8080, '0.0.0.0', () => console.log(`Listening on http://localhost:8080/`));
  }
  catch (err) {
    return console.log(err);
  }
}

main();

