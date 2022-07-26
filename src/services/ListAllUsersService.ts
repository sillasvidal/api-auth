import { inject, injectable } from 'tsyringe';

import User from '../entities/User';

import AppError from '../errors/AppError';

import { MESSAGE_ERROR_NO_USER_REGISTERED } from '../messages';

import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | null> {
    const users = this.usersRepository.listAll();

    if (!users) {
      throw new AppError(
        MESSAGE_ERROR_NO_USER_REGISTERED.code,
        MESSAGE_ERROR_NO_USER_REGISTERED.message,
        404);
    }

    return users;
  }
}

export default ListAllUsersService;