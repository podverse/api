import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validateBodyObject(schema: Joi.ObjectSchema, req: Request, res: Response, next: NextFunction): void {
  const numericFields = ['position1', 'position2']; // Add any other fields that should be converted

  // Convert numeric string values to numbers
  for (const key of numericFields) {
    if (req.body[key] && typeof req.body[key] === 'string') {
      req.body[key] = parseFloat(req.body[key]);
    }
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
}