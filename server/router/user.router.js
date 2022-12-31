const { Router } = require("express");
const { me, updateMe } = require("../controller/user.controller");

const router = Router();

router.get("/", me);
router.put("/update-user", updateMe);

module.exports = router;
