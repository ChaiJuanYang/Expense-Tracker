const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("/src/assets")); 
const path = require("path");
const url = "mongodb://127.0.0.1:27017/expenses-tracker";
const categoryCont = require("./backend/controllers/category-controller");
const Operation = require("./backend/models/operation")
const Category = require("./backend/models/event-category");
const operation = require("./backend/models/operation");
const stats = require("./backend/controllers/stats");

app.use(express.static(path.join(__dirname,"dist/ema_angular")));
app.use(express.static('public'));
const PORT_NUMBER = 8081;

app.use(express.json());

// async function connect() {
//     await mongoose.connect(url);
//   }
//   connect().catch((err) => console.log(err));

// app.listen(PORT_NUMBER, function () {
// console.log(`listening on port ${PORT_NUMBER}`);
// })
async function connect() {
  try {
    await mongoose.connect(url);
    let existingOperation = await Operation.findOne();
    const categoryCount = await Category.countDocuments();
  
    let newOperation = await Operation.findOneAndUpdate(
      {},
      { category_size: categoryCount },
      { new: true }
    );
    console.log(newOperation);
    if (!existingOperation) {
      const operation = new Operation();
      await operation.save();
  }
    server.listen(PORT_NUMBER, () => {
      console.log(`Server listening on port ${PORT_NUMBER}`);
    });

  } catch (err) {
    console.log(err);
  }
}
const filePath = 'public/output.mp3';
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
});
connect();


app.post("/add-category", categoryCont.createCategory);

app.get("/list-categories", categoryCont.getAllCategory);

app.delete("/delete-categories/:categoryId", categoryCont.deleteCategorybyId);

app.put("/update-category", categoryCont.updateCategorybyId);

app.get("/display-category/:categoryId", categoryCont.getCategoryDisplay);

app.get("/stats-g1", stats.getOneOperation);