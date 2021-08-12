import { Request, Response } from 'express';

import ShortUrl from '../models/ShortUrl.model';

export async function createShortUrl(req: any, res: Response, next) {
  //get destination from request body or req.file
  const file = req?.file?.path || false;
  let imgOrAddress = file ? file : req.body.destination;
  console.log(file, 'fffff', imgOrAddress);
  if (file) {
    ///REPLACE THE FORWARD SLASH TO BACKSLASH
    imgOrAddress = String.raw`http://localhost:4000/${file}`;
    imgOrAddress = imgOrAddress.replace('\\', '/');
  }
  try {
    let newShortUrl = new ShortUrl();
    newShortUrl.owner = req.profile;
    newShortUrl.destination = imgOrAddress;
    newShortUrl.save((err, result) => {
      if (err) return res.status(400).json({ error: err });
      res.json(result);
    });
  } catch (err) {
    res.status(404).json({ error: err });
  }
}
//////////increment clicks and redirect
export async function handleRedirect(req: Request, res: Response) {
  const { shortAddress } = req.params;
  console.log('sss', shortAddress);
  console.log('roeiroei1', shortAddress);
  try {
    const shortUrl = await ShortUrl.findOne({ shortAddress });
    if (!shortUrl || shortUrl == null) {
      console.log(shortUrl);
      return res.redirect('/api/notfound');
    } else {
      shortUrl.clicks++;
      await shortUrl.save();
      return res.redirect(shortUrl.destination);
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
}
