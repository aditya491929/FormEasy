const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(500).send({
          message: "No Token Found!",
        });
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(500).send({
          message: "Token Verification Failed!",
        });
      }
      req.user = verified.id;
      next();
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  module.exports = auth;