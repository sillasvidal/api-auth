import Role from "../entities/Role";

interface IRole {
  name: string;
  description: string;
}

export interface IRolesRepository {
  create(roleData: IRole): Promise<Role>;
  findByName(name: string): Promise<Role | null>;
}