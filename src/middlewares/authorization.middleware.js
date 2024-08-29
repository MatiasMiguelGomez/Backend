export const authorization = role => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'Unauthorized', message: 'You need to login' });
    }
    if (req.user.role != role) {
      return res
        .status(403)
        .json({ status: 'Unauthorized', message: 'You do not have permission' });
    }
    next();
  };
};
