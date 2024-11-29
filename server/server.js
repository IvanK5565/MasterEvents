const express = require('express');
const app = express();
const userRoute = require('./routes/user')
const eventRoute = require('./routes/events')
const voteRoute = require('./routes/votes')

const cors = require('cors');
const corsOptoins = {
  origin: ["http://localhost:5173"]
};
app.use(cors(corsOptoins));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Метод:', req.method);
  // console.log('Заголовки:', req.headers);
  console.log('Тело:', req.body);
  next();
});

const mongoose = require("mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const Vote = require("./models/Vote");
const mongoString = "mongodb://localhost:27017/"

app.get('/api/magic', async (req, res) => {
  // const newUser = new User({
  //   firstname: "Ivan",
  //   lastname: "Kozlovsky",
  //   email: "blackpuma072@gmail.com"
  // });
  // // сохраняем в бд
  // await newUser.save();
  // res.sendStatus(200);

  const results = await User.find();
  res.status(200).json(results);
});
app.get('/api', async (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});
app.get('/api/categories', (_, res) => {
  res.send(Category.find());

  Event.collection.distinct("category", (err, event) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Что-то пошло не так' });
    }
    else res.status(200).json(event);
  })
});

app.use("/api/user", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/vote", voteRoute);


async function main() {

  try {
    await mongoose.connect(mongoString);
    app.listen(8080, () => console.log(`Listening on port ${8080}`));
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