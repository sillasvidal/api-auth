import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import User from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository implements IUsersRepository {
  usersRepository: Repository<User>;
  
  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  } 
  
  async create(userData: IUser): Promise<User> {
    const user = this.usersRepository.create(userData);
    
    const createdUser = await this.usersRepository.save(user);
    
    return createdUser;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.usersRepository.findOne({
      where: {
        email
      }
    });
    
    return findUser;
  }
  
  async listAll(): Promise<User[] | null> {
    const findUsers = await this.usersRepository.find();

    return findUsers;
  }
}

export default UsersRepository;