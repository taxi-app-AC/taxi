const app = module.exports = require('express')();

app.use('/api/auth', require('./auth'));
app.use('/api/order', require('./order'));

// the catch all route
app.all('*', (req, res) => {
    res.status(404).send({msg: 'not found'});
});