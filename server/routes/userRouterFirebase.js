/* eslint-disable camelcase */
const { Router } = require('express');

require('dotenv').config();

const db = require('./db');
const bot = require('../bot');

const router = Router();

const usersRef = db.ref('Users');

router.get('/', async (req, res) => {
  usersRef.once('value', (snapshot) => res.json(snapshot.val()));
});

router.route('/signup').post(async (req, res) => {
  const { queryId, first_name, tg_id } = req.body;

  try {
    if (!(first_name && tg_id)) {
      // await bot.answerWebQuery(queryId, {
      //   type: 'article',
      //   id: queryId,
      //   title: 'Ответ с сервера',
      //   input_message_content: {
      //     message_text: 'Все поля должны быть заполнены',
      //   },
      // });
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await usersRef
      .orderByChild('tg_id')
      .equalTo(tg_id)
      .limitToFirst(1)
      .once('value');

    let newUser;
    if (!user.val()) {
      newUser = await usersRef.push({ first_name, tg_id });
    } else {
      // await bot.answerWebQuery(queryId, {
      //   type: 'article',
      //   id: queryId,
      //   title: 'Ответ с сервера',
      //   input_message_content: {
      //     message_text: 'Пользователь с таким tg_id уже существует',
      //   },
      // });
      return res.status(403).json({ message: 'User already exists' });
    }

    return res.json({ user: newUser });
  } catch (error) {
    // await bot.answerWebQuery(queryId, {
    //   type: 'article',
    //   id: queryId,
    //   title: 'Ответ с сервера',
    //   input_message_content: {
    //     message_text: 'Ошибка',
    //   },
    // });
    return res.status(500).json({});
  }
});

module.exports = router;
