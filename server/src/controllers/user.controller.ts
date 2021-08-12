import { Response } from 'express';
import ShortUrl from '../models/ShortUrl.model';
import User from '../models/User.model';
////GET THE USER ID
export const checkUserId: any = (req, res: Response, next, id: string) => {
  try {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ error: 'you are not Authorized to this action' });
      }
      req.profile = user;
      next();
    });
  } catch (err) {
    next(res.status(400).json({ error: err.message }));
  }
};

/////////////find shortId and add to the request
export const shortUrlByUser = (req: any, res: Response, next, id) => {
  ShortUrl.findById(id)
    .populate('owner', '_id name')
    .exec((err, shortUrl) => {
      if (err || !shortUrl) return res.status(400).json({ error: err });
      req.shortUrl = shortUrl;
      next();
    });
};
//////GET ALL USER SHORTENERS
export const getAllUserShorteners = async (req: any, res: Response, next) => {
  try {
    const shortUrlList = await ShortUrl.find({
      owner: req.profile._id,
    })
      .sort({ date: -1 })
      .populate('owner');
    if (!shortUrlList)
      return res.status(404).json({
        error: 'no data found',
      });

    return res.json(shortUrlList);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
//////////////check owner of shortUrl for authorization///////
export const isOwner = (req: any, res: Response, next) => {
  let isOwner =
    req.shortUrl && req.auth && req.shortUrl.owner._id == req.auth.id;

  if (!isOwner)
    return res.status(403).json({ error: 'not authorized to this Url!' });
  next();
};

/////////////////////CRUD CONTROLLERS//////////////////////////
//////////////check owner of shortUrl for authorization///////

//DELETE SHORTENER
export const deleteShortener = async (req, res: Response, next) => {
  let shortUrl = req.shortUrl;
  await shortUrl.remove((err: any, shortUrl: any) => {
    if (err) return res.status(400).json({ error: 'item not exist' });
    res.json(shortUrl._id);
  });
};

export const updateShortener = async (req: any, res: Response, next) => {
  const { _id } = req.shortUrl;
  const updates = req.body;

  await ShortUrl.findByIdAndUpdate(_id, updates, {
    new: true,
  })
    .populate('owner')

    .exec((err: any, shortUrl) => {
      if (err?.name === 'MongoError' && err?.code === 11000) {
        // Duplicate username
        return res.status(422).json({ error: 'Short already exist!' });
      }
      if (err) return res.status(400).json({ error: err });

      res.json(shortUrl);
    });
};
