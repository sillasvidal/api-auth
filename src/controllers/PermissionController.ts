import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePermissionService from '../services/CreatePermissionService';

class PermissionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissionService = container.resolve(CreatePermissionService);

    const createdPermission = await createPermissionService.execute({ name, description });

    return response.status(201).json(createdPermission);
  }
}

export default PermissionController;