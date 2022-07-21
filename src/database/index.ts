import { DataSource } from 'typeorm';

import Permission from '../entities/Permission';
import Role from '../entities/Role';
import User from '../entities/User';

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