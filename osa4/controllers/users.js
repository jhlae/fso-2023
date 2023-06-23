const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Get all users
usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get user by id
usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.toJSON());
  } else {
    res.status(404).end();
  }
});

// Set user, validate with the following conditions:
//    username & password must be set
//    username & password must be 3 characters minimum
//    username must not be reserved
usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({
      error: "Username & password are required!",
    });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "Username and password have to include at least three characters.",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "Error: username already taken!",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
