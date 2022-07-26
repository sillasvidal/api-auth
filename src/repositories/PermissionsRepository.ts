import { In, Repository } from 'typeorm';

import { AppDataSource } from '../database';

import Permission from '../entities/Permission';

import { IPermissionsRepository } from './IPermissionsRepository';

interface IPermission {
  name: string;
  description: string;
}

class PermissionsRepository implements IPermissionsRepository {
  permissionsRepository: Repository<Permission>;
  
  constructor() {
    this.permissionsRepository = AppDataSource.getRepository(Permission);
  } 
  
  async create(permissionData: IPermission): Promise<Permission> {
    const permission = this.permissionsRepository.create(permissionData);
    
    const createdPermission = await this.permissionsRepository.save(permission);
    
    return createdPermission;
  }
  
  async findByName(name: string): Promise<Permission | null> {
    const permission = await this.permissionsRepository.findOne({
      where: {
        name
      }
    });
    
    return permission;
  }
  
  async findByNames(names: string[]): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.find({
      where: {
        name: In(names)
      }
    });
    
    return permissions;
  }
}

export default PermissionsRepository;