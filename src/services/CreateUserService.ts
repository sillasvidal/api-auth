import AppError from "../errors/AppError";
import BCryptHashProvider from "../providers/BCryptHashProvider";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(userData: IRequest) {
    const usersRepository = new UsersRepository();

    const checkIfUserExists = await usersRepository.findByEmail(userData.email);

    if (checkIfUserExists) {
      throw new AppError('Já existe um usuário com esse e-mail.', 422);
    }

    const hashProvider = new BCryptHashProvider();

    const passwordHashed = await hashProvider.generateHash(userData.password);

    const createdUser = await usersRepository.create({
      name: userData.name,
      email: userData.email,
      password: passwordHashed
    });

    return createdUser;
  }
}

export default CreateUserService;