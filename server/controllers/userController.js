const { AppError } = require('./../utils/errorUtils');
const getUser = async (req, res, next) => {
  if (req.params.id == req.user._id) {
    console.log(req.user);
    const user = req.user.toObject();
    delete user.role;
    delete user.password;
    res.status(200).json({ success: true, user });
  } else {
    return next(new AppError('Invalid request', 403));
  }
};

const updateUser = async (req, res, next) => {
  if (req.params.id == req.user._id) {
    const user = req.user;
    Object.keys(req.body).forEach(
      (element) => (user[element] = req.body[element])
    );
    user.save();
    res
      .status(201)
      .json({ success: true, message: 'The user updated successfully' });
  } else {
    return next(new AppError('Invalid request', 403));
  }
};

module.exports = { getUser, updateUser };
