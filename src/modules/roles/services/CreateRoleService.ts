import { inject, injectable } from 'tsyringe';

import Role from '../entities/Role';

import AppError from '../../../shared/errors/AppError';

import { MESSAGE_ERROR_ROLE_NAME_ALREADY_EXISTS } from '../../../shared/infra/http/messages';

import { IRolesRepository } from '../repositories/IRolesRepository';

interface IRole {
  name: string;
  description: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  public async execute({ name, description }: IRole): Promise<Role> {
    const checkIfRoleExists = await this.rolesRepository.findByName(name);

    if (checkIfRoleExists) {
      throw new AppError(
        MESSAGE_ERROR_ROLE_NAME_ALREADY_EXISTS.code,
        MESSAGE_ERROR_ROLE_NAME_ALREADY_EXISTS.message,
        422
      );
    }

    const role = await this.rolesRepository.create({name, description});

    return role;
  }
}

export default CreateRoleService;
