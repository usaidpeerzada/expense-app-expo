const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const { signup, signin, protect, signout } = require("./utils/auth");
const connect = require("./utils/db");
const userRouter = require("./router/user.router");
const expenseRouter = require("./router/expense.router");
// import itemRouter from "./resources/item/item.router";
// import listRouter from "./resources/list/list.rout=

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/signup", signup);
app.post("/signin", signin);
app.post("/signout", signout);

app.use("/api", protect);
app.use("/api/user", userRouter);
app.use("/api/expense", expenseRouter);
// app.use("/api/item", itemRouter);
// app.use("/api/list", listRouter);

const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`API is running on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
