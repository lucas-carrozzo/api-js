const jwt = require("./jwt");
const user = require("./user");

module.exports = {
  getJwt: jwt.getJWT,
  verify: jwt.verifyJwt,
  createUser: user.createUser,
};
