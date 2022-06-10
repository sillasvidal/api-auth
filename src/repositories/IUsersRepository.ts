import User from "../entities/User";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(userData: IUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}