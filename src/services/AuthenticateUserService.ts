import { inject, injectable } from 'tsyringe';

import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import { IHashProvider } from '../providers/IHashProvider';

import { IUsersRepository } from '../repositories/IUsersRepository';

import User from '../entities/User';

import { MESSAGE_ERROR_LOGIN_EMAIL_OR_PASSWORD_WRONG } from '../messages';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        MESSAGE_ERROR_LOGIN_EMAIL_OR_PASSWORD_WRONG.code,
        MESSAGE_ERROR_LOGIN_EMAIL_OR_PASSWORD_WRONG.message,
        422
      );
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        MESSAGE_ERROR_LOGIN_EMAIL_OR_PASSWORD_WRONG.code,
        MESSAGE_ERROR_LOGIN_EMAIL_OR_PASSWORD_WRONG.message,
        422
      );
    }

    const { expiresIn,secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      token,
      user
    };
  }
}

export default AuthenticateUserService;