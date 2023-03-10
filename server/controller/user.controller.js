const User = require("../model/user.model");

const me = (req, res) => {
  res.status(200).json({ data: "hello" });
};

const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = { me, updateMe };
