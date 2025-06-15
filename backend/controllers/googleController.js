const jwt = require('jsonwebtoken');

exports.googleAuthCallback = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ message: 'Logged in successfully', success: true });
};
