import { inject, injectable } from 'tsyringe';

import Permission from '../entities/Permission';

import AppError from '../../../shared/errors/AppError';

import { MESSAGE_ERROR_PERMISSION_NAME_ALREADY_EXISTS } from '../../../shared/infra/http/messages';

import { IPermissionsRepository } from '../repositories/IPermissionsRepository';

interface IPermission {
  name: string;
  description: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository
  ) {}

  public async execute({ name, description }: IPermission): Promise<Permission> {
    const checkIfPermissionExists = await this.permissionsRepository.findByName(name);

    if (checkIfPermissionExists) {
      throw new AppError(
        MESSAGE_ERROR_PERMISSION_NAME_ALREADY_EXISTS.code,
        MESSAGE_ERROR_PERMISSION_NAME_ALREADY_EXISTS.message,
        422
      );
    }

    const permission = await this.permissionsRepository.create({name, description});

    return permission;
  }
}

export default CreatePermissionService;
