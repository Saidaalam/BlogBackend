import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    statusCode,
    error: { details: err.details || '' },
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
