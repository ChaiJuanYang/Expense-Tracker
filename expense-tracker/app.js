const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("/src/assets")); 
const path = require("path");
const url = "mongodb://127.0.0.1:27017/expenses-tracker";
const userCont = require("./backend/controllers/user-controller");
const expenseCont = require("./backend/controllers/expense-controller");
const jwt = require("jsonwebtoken");
app.use(express.static(path.join(__dirname,"dist/Expense Tracker")));
app.use(express.static('public'));
const PORT_NUMBER = 8081;

app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(url);
    server.listen(PORT_NUMBER, () => {
      console.log(`Server listening on port ${PORT_NUMBER}`);
    });

  } catch (err) {
    console.log(err);
  }
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.post("/signup", userCont.createUser);

app.post("/signin", userCont.loginUser);

app.post("/add-expense", expenseCont.addExpense);

app.post("/view-expenses", expenseCont.getExpense);

app.delete("/delete-expense/:id", expenseCont.deleteExpense);

app.put("/edit-expense", expenseCont.updateExpense);

app.post("/dashboard", expenseCont.displayExpense);

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
});
connect();