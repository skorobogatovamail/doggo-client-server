const { Router } = require('express');
const db = require('./db');
const bot = require('../bot');

const usersRef = db.ref('Users');

const router = Router();

router.get('/', async (req, res) => {
  usersRef.once('value', (snapshot) => res.json(snapshot.val()));
});

router.post('/', async (req, res) => {
  const { queryId } = req.body;
  try {
    await bot.answerWebQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Ответ с сервера',
      input_message_content: {
        message_text: 'Текст ответа с сервера',
      },
    });
    return res.status(200).json({});
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
