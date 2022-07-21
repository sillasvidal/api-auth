import { Request, Response } from 'express';

import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';

import CreateUserService from '../services/CreateUserService';
import ListAllUsersService from '../services/ListAllUsersService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({ name, email, password });

    return response.status(201).json(createdUser);
  }

  public async listAll(_: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const users = await listAllUsersService.execute();

    return response.status(200).json(users);
  }

  public async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const login = await authenticateUserService.execute({ email, password });

    return response.status(200).json(login);
  }
}

export default UserController;