import jwt from 'jsonwebtoken';

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if(!header) return res.status(401).json({ message: 'No token provided' });
      const token = header.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(roles.length && !roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
    