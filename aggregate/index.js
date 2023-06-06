const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/react-crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Подключение к БД установлено');
  })
  .catch((error) => {
    console.error('Ошибка подключения к БД:', error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

app.get('/users', (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error('Ошибка получения пользователей:', err);
      res.status(500).send('Ошибка получения пользователей');
    });
});

app.get('/aggregateAdmin', (req, res) => {
  User.aggregate([
    { $match: { role: { $in: ['admin'] } } },
    { $addFields: { test_role: 'testerAdmin' } },
  ])
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error('Ошибка выполнения агрегации:', err);
      res.status(500).send('Ошибка выполнения агрегации');
    });
});

app.get('/aggregateUser', (req, res) => {
    User.aggregate([
      { $match: { role: { $in: ['user'] } } },
      { $addFields: { test_role: 'testerUser' } },
    ])
      .exec()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error('Ошибка выполнения агрегации:', err);
        res.status(500).send('Ошибка выполнения агрегации');
      });
  });

app.listen(3000, () => {
  console.log('Сервер запущен на порте 3000');
});

