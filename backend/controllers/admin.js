const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username }).lean();
    if (!admin) return res.status(404).send("Неверный логин или пароль");
    if (admin.role !== "admin")
      return res.status(404).send("Неверный логин или пароль..");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Неверный логин или пароль");
    const token = sign({ admin }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("У вас нет прав для входа сюда");
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("У вас нет прав для входа сюда");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("Пользователя не существует");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("У вас нет прав для входа сюда");
    await User.deleteOne({ id });
    return res.status(200).send("Пользователь удалён");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id).select("-password").lean();
    if (!admin)
      return res.status(400).send("Администратор не найден, отмена авторизации");
    return res.status(200).json({ ...admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUserData = (req, res, next) => {
  const userData = User.aggregate([
    {$match: {'role' : 'admin'}}
  ]).exec();
  res.status(200).send(userData)
}