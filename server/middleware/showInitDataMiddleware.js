function getInitData(res) {
  console.log('res: ', res);
  return res.locals.initData;
}

const showInitDataMiddleware = (_req, res, next) => {
  const initData = getInitData(res);
  console.log('getInitData: ', getInitData);
  if (!initData) {
    return next(
      new Error('Cant display init data as long as it was not found'),
    );
  }
  return res.json(initData);
};

module.exports = showInitDataMiddleware;
