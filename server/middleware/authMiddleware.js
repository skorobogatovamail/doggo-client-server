const { validate, parse } = require('@tma.js/init-data-node');
require('dotenv').config();

const token = process.env.TOKEN;

function setInitData(res, initData) {
  res.locals.initData = initData;
}

const authMiddleware = (req, res, next) => {
  const [authType, authData = ''] = (req.header('authorization') || '').split(
    ' ',
  );

  switch (authType) {
    case 'tma':
      try {
        validate(authData, token, { expiresIn: 3600 });
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
    default:
      return next(new Error('Unauthorized'));
  }
};

module.exports = authMiddleware;
