const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token-ambient-music");
  if (!token)
    return res.status(401).send({ success: false, errors: ["Acesso negado."] });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({ success: false, errors: ["Acesso negado."] });
  }
};
