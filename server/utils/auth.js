const config = require("../../config");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res
      .status(400)
      .send({ message: "Please enter Username, Email and Password." });
  }
  try {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  console.log("herer", req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalid = { message: "Invalid email and passoword combination" };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();
    console.log(",.,.,.", user);
    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ token, userId: user._id });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  console.log(bearer);

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();
  console.log(">>>", user);
  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
const signout = async (req, res, next) => {
  console.log(".");
};
module.exports = { signup, signin, protect, signout };
