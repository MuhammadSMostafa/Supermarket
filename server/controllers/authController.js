const User = require('./../models/userModel');
const bcrypt = require('bcrypt');
const { generateWebToken, verifyToken } = require('./../utils/tokenUtils');
const { AppError } = require('./../utils/errorUtils');

const registerUser = async (req, res, next) => {
  const newUser = await User.create(req.obj);
  const token = generateWebToken({ id: newUser._id });
  res.status(201).json({ success: true, token });
};

const loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.obj.email }).select('+password');
  if (!user) return next(new AppError('Invalid login credentials', 400));
  const isPasswordMatch = await bcrypt.compare(req.obj.password, user.password);
  if (!isPasswordMatch)
    return next(new AppError('Invalid login credentials', 400));
  const token = generateWebToken({ id: user._id });
  console.log(user);
  res.status(200).json({ success: true, token });
};

const changePassword = async (req, res, next) => {
  const isPasswordMatch = await bcrypt.compare(
    req.obj.oldPassword,
    req.user.password
  );
  if (!isPasswordMatch) return next(new AppError('Invalid old password', 400));
  req.user.password = req.obj.newPassword;
  req.user.save();
  res
    .status(201)
    .json({ success: true, message: 'Password updated successfully' });
};
const logoutUser = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, changePassword, logoutUser };
