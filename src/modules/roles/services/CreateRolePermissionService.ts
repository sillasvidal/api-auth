import { inject, injectable } from 'tsyringe';

import Role from '../entities/Role';

import AppError from '../../../shared/errors/AppError';

import { MESSAGE_ERROR_ROLE_DOES_NOT_EXISTS } from '../../../shared/infra/http/messages';

import { IPermissionsRepository } from '../../permissions/repositories/IPermissionsRepository';
import { IRolesRepository } from '../repositories/IRolesRepository';

interface IRequest {
  roleId: string;
  permissions: string[];
}

@injectable()
class CreateRolePermissionService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository
  ) {}

  public async execute({roleId, permissions}: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new AppError(
        MESSAGE_ERROR_ROLE_DOES_NOT_EXISTS.code,
        MESSAGE_ERROR_ROLE_DOES_NOT_EXISTS.message,
        404
      );
    }

    const permissionsExists = await this.permissionsRepository.findByNames(permissions);

    role.permissions = permissionsExists;

    await this.rolesRepository.save(role);

    return role;
  }
}

export default CreateRolePermissionService;
