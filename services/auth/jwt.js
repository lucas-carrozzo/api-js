const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

const getJWT = (user) => {
  const userObject = {
    userId: user.id,
    email: user.email,
  };

  return jwt.sign(userObject, secret, {});
};

const verifyJwt = async (token) => {
  return jwt.verify(token, secret);
};

module.exports = { getJWT, verifyJwt };