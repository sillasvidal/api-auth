import { DataSource } from 'typeorm';

import Permission from '../../../../modules/permissions/entities/Permission';
import Role from '../../../../modules/roles/entities/Role';
import User from '../../../../modules/users/entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'svtech_app',
  entities: [User, Permission, Role],
  synchronize: true,
  logging: false
});
