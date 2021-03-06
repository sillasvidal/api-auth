import { inject, injectable } from "tsyringe";
import Permission from "../entities/Permission";
import AppError from "../errors/AppError";
import { IPermissionsRepository } from "../repositories/IPermissionsRepository";

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
      throw new AppError('Permission name already exists.', 422);
    }

    const permission = await this.permissionsRepository.create({name, description});

    return permission;
  }
}

export default CreatePermissionService;