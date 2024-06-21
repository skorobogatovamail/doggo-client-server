const defaultErrorMiddleware = (err, _req, res) => {
  res.status(500).json({
    error: err.message,
  });
};

module.exports = defaultErrorMiddleware;
