import { inject, injectable } from "tsyringe";
import Role from "../entities/Role";
import AppError from "../errors/AppError";
import { IPermissionsRepository } from "../repositories/IPermissionsRepository";
import { IRolesRepository } from "../repositories/IRolesRepository";

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
      throw new AppError('Role does not exists', 404);
    }

    const permissionsExists = await this.permissionsRepository.findByNames(permissions);

    role.permissions = permissionsExists;

    await this.rolesRepository.save(role);

    return role;
  }
}

export default CreateRolePermissionService;