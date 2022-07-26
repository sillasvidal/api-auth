import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

import { MESSAGE_ERROR_USER_DOES_NOT_EXISTS, MESSAGE_ERROR_USER_NOT_AUTHORIZED } from '../messages';

import UsersRepository from '../repositories/UsersRepository';

const usersRepository = new UsersRepository();

export function can(permissionsRoutes: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const userId = request.user.id;

    const user = await usersRepository.findByIdWithPermissions(userId);

    if (!user) {
      throw new AppError(
        MESSAGE_ERROR_USER_DOES_NOT_EXISTS.code,
        MESSAGE_ERROR_USER_DOES_NOT_EXISTS.message,
        400
      );
    }

    const permissionExists = user.permissions
      .map(permission => permission.name)
      .some(permission => permissionsRoutes.includes(permission));

    if (!permissionExists) {
      throw new AppError(
        MESSAGE_ERROR_USER_NOT_AUTHORIZED.code,
        MESSAGE_ERROR_USER_NOT_AUTHORIZED.message, 
        401
      );
    }

    return next();
  }
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const userId = request.user.id;

    const user = await usersRepository.findByIdWithRoles(userId);

    if (!user) {
      throw new AppError(
        MESSAGE_ERROR_USER_DOES_NOT_EXISTS.code,
        MESSAGE_ERROR_USER_DOES_NOT_EXISTS.message,
        400
      );
    }

    const roleExists = user.roles
      .map(role => role.name)
      .some(role => rolesRoutes.includes(role));

    if (!roleExists) {
      throw new AppError(
        MESSAGE_ERROR_USER_NOT_AUTHORIZED.code,
        MESSAGE_ERROR_USER_NOT_AUTHORIZED.message, 
        401
      );
    }

    return next();
  }
}