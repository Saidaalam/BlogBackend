import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  role: string;
}

interface CustomRequest extends Request {
  user?: DecodedToken;
}

export const authenticateAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    if (decoded.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
      return;
     }

    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
    return; 
  }
};
