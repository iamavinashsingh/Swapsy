// middlewares/isAdmin.middleware.js

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if user is admin
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = isAdmin;
