require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bot = require('./bot');

const userRouter = require('./routes/userRouter');
const dataRouter = require('./routes/dataRouter');
const userRouterFirebase = require('./routes/userRouterFirebase');
const authMiddleware = require('./middleware/authMiddleware');
const showInitDataMiddleware = require('./middleware/showInitDataMiddleware');
const defaultErrorMiddleware = require('./middleware/defaultErrorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authMiddleware);
app.get('/', showInitDataMiddleware);
app.use(defaultErrorMiddleware);
app.use('/api/usersFirebase', userRouterFirebase);
app.use('/api/users', userRouter);
app.use('/api/web-data', dataRouter);

const url = 'https://delightful-monstera-119621.netlify.app';

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const { text } = msg;
  console.log(text);

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
      reply_markup: {
        keyboard: [[{ text: 'заполни форму' }]],
      },
    });

    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Сделать заказ', web_app: { url } }]],
      },
    });
  }
});

const PORT = 8000;

app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
