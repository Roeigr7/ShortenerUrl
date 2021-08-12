import express from 'express';

import {
  registerUser,
  logoutUser,
  loginUser,
} from '../controllers/auth.controller';
import validateResource from '../middleware/validateResource';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validateResource(createUserSchema), registerUser);
router.post('/login', validateResource(loginUserSchema), loginUser);
router.get('/logout', logoutUser);

export default router;
