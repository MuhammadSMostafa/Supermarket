const express = require('express');
require('dotenv').config({ path: './../.env' });
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const { globalErrorHandler } = require('./utils/errorUtils');

require('./config/db.js')();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.use('*', (req, res) => {
  res.send("I'm at the server");
});

app.use(globalErrorHandler);
module.exports = app;
