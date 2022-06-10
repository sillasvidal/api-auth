import { container } from 'tsyringe';
import BCryptHashProvider from '../providers/BCryptHashProvider';
import { IHashProvider } from '../providers/IHashProvider';

import { IUsersRepository } from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
);