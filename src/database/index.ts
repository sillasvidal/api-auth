import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'svtech_app',
  entities: ['./src/entities/*.ts'],
  migrations: [
    './src/database/migrations/*.ts'
  ]
});