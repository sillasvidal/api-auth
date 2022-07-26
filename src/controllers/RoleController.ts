import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MESSAGE_ROLE_CREATED_WITH_SUCCESSFUL } from '../messages';

import CreateRoleService from '../services/CreateRoleService';

class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createRoleService = container.resolve(CreateRoleService);

    const createdRole = await createRoleService.execute({ name, description });

    const responseCreatedRole = {
      code: MESSAGE_ROLE_CREATED_WITH_SUCCESSFUL.code,
      message: MESSAGE_ROLE_CREATED_WITH_SUCCESSFUL.message,
      role: createdRole
    };

    return response.status(201).json(responseCreatedRole);
  }
}

export default RoleController;