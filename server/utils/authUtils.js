const { AppError } = require('./errorUtils');
const { verifyToken } = require('./tokenUtils');
const User = require('./../models/userModel');

const routes = {
  register: ['name', 'email', 'password', 'address', 'phone'],
  login: ['email', 'password'],
  changePassword: ['oldPassword', 'newPassword'],
  product: ['name', 'description', 'price', 'stock', 'categoryName'],
  user: ['name', 'email', 'address', 'phone'],
};

const checkRequest = (route) => (req, res, next) => {
  Object.keys(req.body).forEach((element) => {
    if (!routes[route].includes(element)) {
      delete req.body[element];
    }
  });
  const missed = routes[route].filter((element) => {
    return req.body[element] ? false : true;
  });
  console.log(req.body);
  if (missed.length > 0)
    return next(new AppError(`The ${missed.join(',')} is missing`));
  next();
};

const authenticateUser = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return next(new AppError('Authentication token is required'), 401);
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('+password +role');
    if (!user)
      return next(new AppError('There is no use with this token', 402));
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('The token is invalid', 404));
  }
};

const authorizeUser = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return next(new AppError('The user is not authorized', 404));
  next();
};

module.exports = { authenticateUser, checkRequest, authorizeUser };
