import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import clientSchema from '../validators/client-schema';

const ajv = new Ajv();
addFormats(ajv);

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(clientSchema);
  const valid = validate(req.body);

  if (!valid) {
    res.status(400).json(validate.errors);
  } else {
    next();
  }
};
