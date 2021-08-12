import { Request, Response } from 'express';
import express from 'express';
import {
  createShortUrl,
  handleRedirect,
} from '../controllers/shortUrl.controller';
import validateResource from '../middleware/validateResource';
import shortUrlSchema from '../schemas/createShortUrl.schema';
import { checkToken } from '../controllers/auth.controller';
import { checkUserId } from '../controllers/user.controller';

const multer = require('multer');

/////Upload Image to db
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//////////fileFilter options
const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //accept
    cb(null, true);
  } else {
    //reject file

    return cb(new Error('file must be .jpg or .png only'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}).single('imageFile');

const router = express.Router();

///post new shortener url to IMAGE
router.post(
  '/api/url-image/:userId',
  function (req: Request, res: Response, next) {
    upload(req, res, function (err) {
      console.log('cscs', req.file);
      if (err) {
        return res.status(400).json(err.message);
      }
      next();
    });
  },
  checkToken,
  createShortUrl
);

////post new address-shortener by url
router.post(
  '/api/url-address/:userId',
  validateResource(shortUrlSchema),
  checkToken,
  createShortUrl
);

router.get('/:shortAddress', handleRedirect);

////check for every route with userId and return user profile
router.param('userId', checkUserId);

export default router;
