import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateRoleService from '../services/CreateRoleService';

class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createRoleService = container.resolve(CreateRoleService);

    const createdRole = await createRoleService.execute({ name, description });

    return response.status(201).json(createdRole);
  }
}

export default RoleController;