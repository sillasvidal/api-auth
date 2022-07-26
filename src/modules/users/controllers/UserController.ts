import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import { MESSAGE_LOGIN_SUCCESSFUL, MESSAGE_USER_CREATED } from '../../../shared/infra/http/messages';


import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import ListAllUsersService from '../services/ListAllUsersService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({ name, email, password });

    const responseCreatedUser = {
      code: MESSAGE_USER_CREATED.code,
      message: MESSAGE_USER_CREATED.message,
      user: classToClass(createdUser),
    };

    return response.status(201).json(responseCreatedUser);
  }

  public async listAll(_: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const users = await listAllUsersService.execute();

    return response.status(200).json(classToClass(users));
  }

  public async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const login = await authenticateUserService.execute({ email, password });

    const responseLogin = {
      code: MESSAGE_LOGIN_SUCCESSFUL.code,
      message: MESSAGE_LOGIN_SUCCESSFUL.message,
      token: login.token,
      user: classToClass(login.user)
    };

    return response.status(200).json(responseLogin);
  }
}

export default UserController;
