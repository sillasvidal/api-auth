import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import User from "../entities/User";

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  usersRepository: Repository<User>;
  
  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  } 
    
  async create(userData: IUser) {
    const user = this.usersRepository.create(userData);

    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }
}

export default UsersRepository;