const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //comfirm if required fields are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    // check if user is already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    //add hasshed password
    const hashedPassword = await bcrypt.hash(password, 10);
   
    //create a new user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json("error entering message");
  }
};

// Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    // Return the token in the response
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
