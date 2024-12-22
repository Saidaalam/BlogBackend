import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  user?: JwtPayload | { id: string; role: string };
}

// Middleware to protect routes and verify JWT
export const protect = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
      statusCode: 401,
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
      statusCode: 401,
    });
  }
};

// Middleware to allow only admin users
export const adminOnly = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (!req.user || typeof req.user !== 'object' || req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admins only',
      statusCode: 403,
    });
    return; 
  }

  next(); 
};
