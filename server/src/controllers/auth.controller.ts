import { Request, Response } from 'express';
import User from '../models/User.model';
import JWT from 'jsonwebtoken';
import config from 'config';
import expressJwt from 'express-jwt';

export const checkToken = expressJwt({
  secret: config.get('accessTokenSecret'),
  algorithms: ['HS256'],
  ///verified the id in the request
  userProperty: 'auth',
});

////REGISTER FUNCTION
export async function registerUser(req: Request, res: Response, next) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(409).json({ error: 'email or password not provided' });
    const existedUser = await User.findOne({ email: email });
    if (existedUser)
      return res.status(409).json({ error: 'email already exist' });
    const user = new User({ name, email, password });
    const savedUser = await user.save();
    const token = JWT.sign(
      { id: savedUser._id },
      config.get('accessTokenSecret')
    );
    res.cookie('t', token, { maxAge: 1650000 * 60 * 60, httpOnly: false });
    res.json({ user: savedUser, token });
  } catch (err) {
    res.send(err);
  }
}

export async function loginUser(req: Request, res: Response, next) {
  console.log('wwwwwwwwwwwwwww');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(409).json({ error: 'User not exist!' });
    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(401).json({ error: 'Incorrect password or mail!' });
    const token = JWT.sign({ id: user._id }, config.get('accessTokenSecret'));

    res.cookie('t', token, { maxAge: 1650000 * 60 * 60, httpOnly: false });
    res.json({ user, token });
  } catch (err) {
    res.status(404).json({ error: err });
  }
}
//////LOGOUT USER
export async function logoutUser(req: Request, res: Response, next) {
  console.log('dsa');
  try {
    res.clearCookie('t', { path: '/' });
    return res.json({
      message: 'signOut success',
    });
  } catch (err) {
    console.log('err', err);
  }
}
