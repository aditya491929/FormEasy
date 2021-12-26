const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const auth = require('../middleware/auth');

router.post("/signup", async (req, res) => {
  if (!req.body.fname) {
    res.send({
      success: false,
      message: "FirstName is required!",
    });
  } else {
    const { fname, lname, username, email, password } = req.body;
    const takenUsername = await User.findOne({ username });
    const takenEmail = await User.findOne({ email });

    if (takenUsername || takenEmail) {
      return res
        .send({ 
          success: false,
          message: "Username or email has already been taken" 
        });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      res.send({ 
        success: true,
        message: "User Registered Successfully!", 
        savedUser 
      });
    }
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((dbUser) => {
    if (!dbUser) {
      return res.send({
        success: false,
        message: "Invalid Username or Password!",
      });
    }
    bcrypt.compare(password, dbUser.password).then((result) => {
      if (result) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          },
          (err, token) => {
            if (err) {
              return res.send({
                success: false,
                message: "error!",
              });
            }
            return res.send({
              success: true,
              message: "User Logged In Successfully!",
              token: token,
              user: {
                "id": dbUser._id,
                "email": dbUser.email,
                "username": dbUser.username,
                "fname": dbUser.fname,
                "lname": dbUser.lname
              },
            });
          }
        );
      } else {
        return res.send({
          success: false,
          message: "Invalid Username or Password!",
        });
      }
    });
  });
});

router.post("/verifyToken", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(500).send({
        message: "Token Missing!",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(500).send({
        isValid: false,
      });
    }
    const userData = await User.findById(verified.id);
    res.send({
      message: true,
      username: userData["username"],
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.get("/currentUser", auth, async (req, res) => {
  const userData = await User.findById(req.user).select('-password');
  res.send({
    isLoggedIn: true,
    user: userData,
  });
});

router.get('/logout', (req,res) => {
  const token = req.header("x-auth-token");
  const result = jwt.verify(token, process.env.JWT_SECRET);
  if(result) {
    return res.send({
      success: true,
      message: 'User Logged Out Successfully!'
    })
  }
})




module.exports = router;