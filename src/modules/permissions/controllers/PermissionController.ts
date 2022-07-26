import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MESSAGE_PERMISSION_CREATED_WITH_SUCCESSFUL } from '../../../shared/infra/http/messages';

import CreatePermissionService from '../services/CreatePermissionService';

class PermissionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissionService = container.resolve(CreatePermissionService);

    const createdPermission = await createPermissionService.execute({ name, description });

    const responseCreatedPermission = {
      code: MESSAGE_PERMISSION_CREATED_WITH_SUCCESSFUL.code,
      message: MESSAGE_PERMISSION_CREATED_WITH_SUCCESSFUL.message,
      permission: createdPermission
    };

    return response.status(201).json(responseCreatedPermission);
  }
}

export default PermissionController;
