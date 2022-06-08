import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const createdUser = await createUserService.execute({ name, email, password });

    return response.json(createdUser);
  }
}

export default UserController;