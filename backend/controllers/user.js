const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if(!username || !email || !password || !role)
    return res.status(400).send("Пожалуйста, заполните все поля")
  try {
    const userObj = { username, email, role };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    const token = sign({ [role]: user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json(role === "user" ? { token, user: { ...user._doc, password: null } } : { token, admin: { ...user._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Неверный логин или пароль");
    if (user.role !== "user")
      return res.status(404).send("Неверный логин или пароль..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Неверный логин или пароль");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    if (!user)
      return res.status(400).send("Пользователь не найден, отмена авторизации");
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUserData = (req, res, next) => {
  User.aggregate([
    {$match: {'role' : 'admin'}}
  ])
  .then(response => {
    res.json({response})
  })
}