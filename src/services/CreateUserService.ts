import UsersRepository from "../repositories/UsersRepository";

interface IUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(userData: IUser) {
    const usersRepository = new UsersRepository();

    const createdUser = await usersRepository.create(userData);

    return createdUser;
  }
}

export default CreateUserService;