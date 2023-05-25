const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Имя пользователя должно быть заполнено"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Почта должен быть заполнена"],
    },
    role: {
      type: String,
      trim: true,
      required: [true, "Роль должна быть выбрана"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Пароль должен быть заполнен"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
