import { inject, injectable } from 'tsyringe';

import AppError from '../errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { IHashProvider } from '../providers/IHashProvider';

import { MESSAGE_ERROR_USER_ALREADY_EXISTS_WITH_EMAIL } from '../messages';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(userData: IRequest) {
    const checkIfUserExists = await this.usersRepository.findByEmail(userData.email);

    if (checkIfUserExists) {
      throw new AppError(
        MESSAGE_ERROR_USER_ALREADY_EXISTS_WITH_EMAIL.code, 
        MESSAGE_ERROR_USER_ALREADY_EXISTS_WITH_EMAIL.message, 
        422
      );
    }

    const passwordHashed = await this.hashProvider.generateHash(userData.password);

    const createdUser = await this.usersRepository.create({
      name: userData.name,
      email: userData.email,
      password: passwordHashed
    });

    return createdUser;
  }
}

export default CreateUserService;