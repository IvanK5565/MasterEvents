const express = require('express');
const app = express();
const userRoute = require('./routes/users')
const eventRoute = require('./routes/events')
const voteRoute = require('./routes/votes')
const voteCountRoute = require('./routes/vote_count')

const cors = require('cors');
const corsOptoins = {
  origin: ["http://localhost:5173"]
};
app.use(cors(corsOptoins));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Метод:', req.method);
  //console.log('Заголовки:', req.headers);
  console.log('Тело:', req.body);
  next();
});

const mongoose = require("mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const Vote = require("./models/Vote");
const Category = require("./models/Category");
const mongoString = "mongodb://localhost:27017/"

app.get('/api/magic', async (req, res) => {
  const vote = new Vote({
    vote: true,
    event_id: '67477e0633f69e9f4117317f',
    user_id: '6746488eacbb51d3c97cb3f1'
  });
  // сохраняем в бд
  await vote.save();
});
app.get('/api', async (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});
app.get('/api/categories', async (_, res) => {
  cats = await Category.find({}, 'name');
  return res.json({data:cats});
});

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/votes", voteRoute);



async function main() {

  try {
    await mongoose.connect(mongoString);
    app.listen(8080, () => console.log(`Listening on http://localhost:8080/`));
  }
  catch (err) {
    return console.log(err);
  }
}

main();
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {

  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit();
});

//TODO: Открыть гпт и посмотреть как разделить по файлам функционал и сделать это