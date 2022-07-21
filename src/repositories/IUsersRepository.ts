import User from "../entities/User";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(userData: IUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  findByIdWithPermissions(userId: string): Promise<User | null>;
  findByIdWithRoles(userId: string): Promise<User | null>;
  listAll(): Promise<User[] | null>;
  save(userData: User): Promise<void>;
}