const { Router } = require("express");
const { saveExpense } = require("../controller/expense.controller");

const router = Router();

router.post("/add-expense", saveExpense);

module.exports = router;
