import { inject, injectable } from "tsyringe";
import User from "../entities/User";
import AppError from "../errors/AppError";
import { IPermissionsRepository } from "../repositories/IPermissionsRepository";
import { IRolesRepository } from "../repositories/IRolesRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IUserAccessControl {
  userId: string;
  roles: string[];
  permissions: string[];
}

@injectable()
class CreateUserAccessControlService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({userId, roles, permissions}: IUserAccessControl): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists!.', 404);
    }

    const permissionsExists = await this.permissionsRepository.findByNames(permissions);
    
    const rolesExists = await this.rolesRepository.findByNames(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserAccessControlService;