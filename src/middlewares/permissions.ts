import { NextFunction, Request, Response } from "express";

import AppError from "../errors/AppError";

import UsersRepository from "../repositories/UsersRepository";

const usersRepository = new UsersRepository();

export function can(permissionsRoutes: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const userId = request.user.id;

    const user = await usersRepository.findByIdWithPermissions(userId);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    const permissionExists = user.permissions
      .map(permission => permission.name)
      .some(permission => permissionsRoutes.includes(permission));

    if (!permissionExists) {
      throw new AppError('Not Authorized', 401);
    }

    return next();
  }
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const userId = request.user.id;

    const user = await usersRepository.findByIdWithRoles(userId);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    const roleExists = user.roles
      .map(role => role.name)
      .some(role => rolesRoutes.includes(role));

    if (!roleExists) {
      throw new AppError('Not Authorized', 401);
    }

    return next();
  }
}