import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserAccessControlService from '../services/CreateUserAccessControlService';

class UserAccessControlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, permissions, roles } = request.body;

    const createUserAccessControlService = container.resolve(CreateUserAccessControlService);

    const createdUserAccessControl = await createUserAccessControlService.execute({ userId, permissions, roles });

    return response.status(201).json(createdUserAccessControl);
  }
}

export default UserAccessControlController;