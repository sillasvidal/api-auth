import { inject, injectable } from "tsyringe";
import Role from "../entities/Role";
import AppError from "../errors/AppError";
import { IRolesRepository } from "../repositories/IRolesRepository";

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
      throw new AppError('Role name already exists.', 422);
    }

    const role = await this.rolesRepository.create({name, description});

    return role;
  }
}

export default CreateRoleService;