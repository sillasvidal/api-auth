import { In, Repository } from "typeorm";
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

  async save(roleData: Role): Promise<void> {
    await this.rolesRepository.save(roleData);
  }
  
  async create(roleData: IRole): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    
    const createdRole = await this.rolesRepository.save(role);
    
    return createdRole;
  }

  async findById(roleId: string): Promise<Role | null> {
    console.log(roleId);

    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId
      }
    });
    
    return role;
  }
  
  async findByName(name: string): Promise<Role | null> {
    const role = await this.rolesRepository.findOne({
      where: {
        name
      }
    });
    
    return role;
  }

  async findByNames(names: string[]): Promise<Role[]> {
    const roles = await this.rolesRepository.find({
      where: {
        name: In(names)
      }
    });
    
    return roles;
  }
}

export default RolesRepository;