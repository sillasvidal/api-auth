import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { MESSAGE_ACCESS_CONTROL_CREATED_WITH_SUCCESSFUL } from '../../../shared/infra/http/messages';

import CreateUserAccessControlService from '../services/CreateUserAccessControlService';

class UserAccessControlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, permissions, roles } = request.body;

    const createUserAccessControlService = container.resolve(CreateUserAccessControlService);

    const createdUserAccessControl = await createUserAccessControlService.execute({ userId, permissions, roles });

    const responseCreatedUserAccessControl = {
      code: MESSAGE_ACCESS_CONTROL_CREATED_WITH_SUCCESSFUL.code,
      message: MESSAGE_ACCESS_CONTROL_CREATED_WITH_SUCCESSFUL.message,
      user: classToClass(createdUserAccessControl)
    }

    return response.status(201).json(responseCreatedUserAccessControl);
  }
}

export default UserAccessControlController;
