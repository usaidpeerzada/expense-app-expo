const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  note: String,
  price: Number,
});

const Expenses = mongoose.model("expense", ExpenseSchema);

module.exports = Expenses;
