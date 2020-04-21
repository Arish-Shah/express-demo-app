const logger = (req, res, next) => {
  console.log(
    `Hitting URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
