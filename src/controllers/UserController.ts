import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({ name, email, password });

    return response.status(201).json(createdUser);
  }
}

export default UserController;