import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import Role from "../entities/Role";
import { IRolesRepository } from "./IRolesRepository";

interface IRole {
  name: string;
  description: string;
}

class RolesRepository implements IRolesRepository {
  rolesRepository: Repository<Role>;
  
  constructor() {
    this.rolesRepository = AppDataSource.getRepository(Role);
  } 
  
  async create(roleData: IRole): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    
    const createdRole = await this.rolesRepository.save(role);
    
    return createdRole;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.rolesRepository.findOne({
      where: {
        name
      }
    });

    return role;
  }
}

export default RolesRepository;