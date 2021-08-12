import config from 'config';
import JWT from 'jsonwebtoken';
import { Response } from 'express';

export const signAccessToken = (userId: string) => {
  return JWT.sign({ userId }, config.get('accessTokenSecret'), {
    expiresIn: '1w',
  });
};
export async function verifyAccessToken(req: any, res: Response, next) {
  if (!req.headers['authorization'])
    res.status(401).json({ message: 'Anauthorized to this path' });
  const authHeader = req.headers['authorization'];

  const bearerToken = authHeader?.split(' ');

  const token = bearerToken[1];
  console.log('token', token);

  JWT.verify(
    token as string,
    config.get('accessTokenSecret'),
    (err, decoded) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return res.send(message);
      }
      req.payload = decoded;
      next();
    }
  );
}
