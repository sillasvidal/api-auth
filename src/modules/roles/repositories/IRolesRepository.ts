import Role from '../entities/Role';

interface IRole {
  name: string;
  description: string;
}

export interface IRolesRepository {
  create(roleData: IRole): Promise<Role>;
  findById(roleId: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findByNames(names: string[]): Promise<Role[]>;
  save(roleData: Role): Promise<void>;
}
