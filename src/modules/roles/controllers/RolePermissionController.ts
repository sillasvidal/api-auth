import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MESSAGE_RELATION_ROLE_PERMISSION_CREATED_WITH_SUCCESSFUL } from '../../../shared/infra/http/messages';

import CreateRolePermissionService from '../services/CreateRolePermissionService';

class RolePermissionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const createRolePermissionService = container.resolve(CreateRolePermissionService);

    const role = await createRolePermissionService.execute({ roleId, permissions });

    const responseRole = {
      code: MESSAGE_RELATION_ROLE_PERMISSION_CREATED_WITH_SUCCESSFUL.code,
      message: MESSAGE_RELATION_ROLE_PERMISSION_CREATED_WITH_SUCCESSFUL.message,
      role
    }

    return response.status(200).json(responseRole);
  }
}

export default RolePermissionController;
