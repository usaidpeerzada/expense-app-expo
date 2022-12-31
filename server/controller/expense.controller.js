const ExpenseSchema = require("../model/expense.model");
const User = require("../model/user.model");

async function saveExpense(req, res) {
  try {
    console.log("hehrer");
    console.log("><><><>>>>>>>", req.body);
    const { userId, date, note, price } = req.body;
    const expense = await ExpenseSchema.create({
      date,
      note,
      price,
    });
    await User.findByIdAndUpdate(
      { _id: "63b04d6c5e77b063b29ba727" },
      { $push: { expenses: expense } }
    );
    return res
      .status(200)
      .send({ data: expense, message: "successfully added expense" });
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = { saveExpense };
