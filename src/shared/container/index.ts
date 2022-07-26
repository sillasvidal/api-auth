import { container } from 'tsyringe';

import { IHashProvider } from '../../modules/users/providers/IHashProvider';
import BCryptHashProvider from '../../modules/users/providers/BCryptHashProvider';

import { IRolesRepository } from '../../modules/roles/repositories/IRolesRepository';
import RolesRepository from '../../modules/roles/repositories/RolesRepository';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/UsersRepository';

import { IPermissionsRepository } from '../../modules/permissions/repositories/IPermissionsRepository';
import PermissionsRepository from '../../modules/permissions/repositories/PermissionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
);
