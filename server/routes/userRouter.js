/* eslint-disable camelcase */
const { Router } = require('express');
const { User } = require('../db/models');
const bot = require('../bot');

const router = Router();

router.route('/signup').post(async (req, res) => {
  console.log('req.body: ', req.body);
  const { queryId, first_name, tg_id } = req.body;

  try {
    if (!(first_name && tg_id)) {
      await bot.answerWebQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Ответ с сервера',
        input_message_content: {
          message_text: 'Все поля должны быть заполнены',
        },
      });
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [user, created] = await User.findOrCreate({
      where: { tg_id },
      defaults: { first_name },
    });

    if (!created) {
      await bot.answerWebQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Ответ с сервера',
        input_message_content: {
          message_text: 'Пользователь с таким tg_id уже существует',
        },
      });
      return res.status(403).json({ message: 'User already exists' });
    }

    const plainUser = user.get();

    await bot.answerWebQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Ответ с сервера',
      input_message_content: {
        message_text: 'Регистрация прошла успешно!',
      },
    });
    return res.json({ user: plainUser });
  } catch (error) {
    await bot.answerWebQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Ответ с сервера',
      input_message_content: {
        message_text: 'Ошибка',
      },
    });
    return res.status(500).json({});
  }
});

module.exports = router;
