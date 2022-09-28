require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const errorHandle = require('./middlewares/errorHandle');
const NotFoundError = require('./utils/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserValidate, loginValidate } = require('./utils/Validators');
const { createUser, login } = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUserValidate, createUser);
app.post('/signin', loginValidate, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandle);

app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : '3000');
