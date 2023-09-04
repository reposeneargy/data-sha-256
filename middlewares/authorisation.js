const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const { userId, token } = req.cookies;
    if (!userId || !token) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorised, Please login first to get accesss to our server",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorised, Please login first to get accesss to our server",
        });
      }
      if (userData) {
      }
    });

    let user = await User.findOne({ _id: userId });
    user.password = "For security reason we can't show password";
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed.",
      });
    }
    if (user) {
      res.cookie("Authorised", "True");
    }
    next();
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
  }
};
