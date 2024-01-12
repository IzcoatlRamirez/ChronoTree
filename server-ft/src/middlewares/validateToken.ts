// src/middlewares/validateToken.ts
import { Response, NextFunction } from 'express';
import { RequestCustom } from '../types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { tokenSecret } from '../config';

export const authRequired = async (req: RequestCustom, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!tokenSecret) {
    console.log('No secret provided');
    return res.status(401).json({ message: 'No secret provided' });
  }

  jwt.verify(token, tokenSecret, {}, (err: Error | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      console.log('Error verifying token:', err);
      return res.status(401).json({ message: 'Error verifying token', error: err.message });
    }

    if (typeof decoded === 'object' && 'data' in decoded) {
      req.id = parseInt(decoded.data);
    }
    
    next();
  });
};
