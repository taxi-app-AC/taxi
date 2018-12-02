module.exports = function logErrors (err, req, res, next) {
    console.error(err.stack);

    logger.log('error', err.stack);

    res.sendStatus(500);
}