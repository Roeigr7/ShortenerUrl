import { AnyObjectSchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await resourceSchema.validate(req.body);
      next();
    } catch (e) {
      return res.status(400).send(e.message);
    }
  };

export default validateResource;
