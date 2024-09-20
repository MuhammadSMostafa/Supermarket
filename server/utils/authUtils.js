const { AppError } = require('./errorUtils');
const { verifyToken } = require('./tokenUtils');
const User = require('./../models/userModel');

const routes = {
  register: ['name', 'email', 'password', 'address', 'phone'],
  login: ['email', 'password'],
  changePassword: ['oldPassword', 'newPassword'],
};

const sanitizeRequest = (route) => (req, res, next) => {
  const obj = {};
  let missed = [];
  routes[route].forEach((element) => {
    if (req.body[element]) obj[element] = req.body[element];
    else missed.push(element);
  });
  if (missed.length > 0)
    return next(new AppError(`The ${missed.join(',')} is missing`));
  req.obj = obj;
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
    const user = await User.findById(decoded.id).select('+password');
    if (!user)
      return next(new AppError('There is no use with this token', 402));
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('The token is invalid', 404));
  }
};

module.exports = { sanitizeRequest, authenticateUser };
