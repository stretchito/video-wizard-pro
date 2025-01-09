import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import winston from 'winston';

// Configure winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the full error details
  logger.error('Error details:', {
    error: err,
    stack: err.stack,
    body: req.body,
    path: req.path,
    method: req.method
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Handle FFmpeg specific errors
  if (err.message && err.message.includes('FFmpeg')) {
    res.status(500).json({
      status: 'error',
      message: 'Video processing failed. Please try with a smaller video file.',
      details: err.message
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};