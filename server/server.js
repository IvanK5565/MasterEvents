const express = require('express');
const app = express();
const userRoute = require('./routes/users')
const eventRoute = require('./routes/events')
const voteRoute = require('./routes/votes')
const categoriesRoute = require('./routes/categories')
const Event = require('./models/Event');

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
const Category = require("./models/Category");
const mongoString = "mongodb://localhost:27017/"

app.get('/api', async (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});


app.get('/magic', async (req, res) => {
  const rand = (max)=>Math.floor(Math.random() * max)//rand [0,max)
  const cats = ["sport","music","holyday"]
  let events = []
  for(let i = 0; i < 10; i++){
    try {
      const event = new Event({
          name: "Event "+ i,
          describe: "Describe for " + i,
          date: new Date(
            2024,//year
            11,//month
            rand(31-10)+10,//day
            rand(12)+10,//hours
            rand(12)*5,//min
          ),
          category: cats[rand(3)],
      })
      console.log(rand(5));
      await event.save();

      const query = Category.findOne({ name: event.category });
      if (query.name != event.category) {
          newCat = new Category({ name: event.category });
          await newCat.save();
      }
      events.push(event);

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Что-то пошло не так' });
  }
  }
  res.status(200).json(events);
});

app.use("/api/categories", categoriesRoute);
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