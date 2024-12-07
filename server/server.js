const express = require('express');
const app = express();
const userRoute = require('./routes/users')
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