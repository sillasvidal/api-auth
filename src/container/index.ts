import { container } from 'tsyringe';

import { IHashProvider } from '../providers/IHashProvider';
import BCryptHashProvider from '../providers/BCryptHashProvider';

import { IRolesRepository } from '../repositories/IRolesRepository';
import RolesRepository from '../repositories/RolesRepository';

import { IUsersRepository } from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
);