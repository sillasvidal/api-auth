import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';

import authConfig from '../../../../config/auth';

import { MESSAGE_ERROR_JWT_TOKEN_INVALID, MESSAGE_ERROR_JWT_TOKEN_IS_MISSING } from '../messages';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = () => {
  return async (request: Request, _: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new AppError(
        MESSAGE_ERROR_JWT_TOKEN_IS_MISSING.code,
        MESSAGE_ERROR_JWT_TOKEN_IS_MISSING.message,
        401
      );
    }

    const [, token] = authHeaders.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      throw new AppError(
        MESSAGE_ERROR_JWT_TOKEN_INVALID.code,
        MESSAGE_ERROR_JWT_TOKEN_INVALID.message,
        401
      );
    }
  }
}
