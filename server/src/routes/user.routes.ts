import express from 'express';
import { checkToken } from '../controllers/auth.controller';
import {
  checkUserId,
  getAllUserShorteners,
  shortUrlByUser,
  isOwner,
  deleteShortener,
  updateShortener,
} from '../controllers/user.controller';
const router = express.Router();

router.get('/user-shorts/:userId', checkToken, getAllUserShorteners);
router.delete('/delete-short/:shortId', checkToken, isOwner, deleteShortener);
router.patch('/update-short/:shortId', checkToken, isOwner, updateShortener);
////////////find and add to the request when include in the url///////////////////////////

router.param('userId', checkUserId);

////check for every route with shortId param and return shorUrl model with user populated
router.param('shortId', shortUrlByUser);
export default router;
