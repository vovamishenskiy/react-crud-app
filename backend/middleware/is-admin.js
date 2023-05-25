const { verify } = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.get("x-admin-auth-token");
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Ошибка авторизации");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Ошибка авторизации");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Ошибка авторизации");
    }

    if (decoded?.admin?.role !== 'admin') {
      req.isAuth = false;
      return res.status(401).send("Ошибка авторизации");
    }

    req.isAuth = true;
    req.admin = decoded.admin;
    return next();
  }
};
