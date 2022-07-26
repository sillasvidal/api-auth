import Permission from '../entities/Permission';

interface IPermission {
  name: string;
  description: string;
}

export interface IPermissionsRepository {
  create(permissionData: IPermission): Promise<Permission>;
  findByName(name: string): Promise<Permission | null>;
  findByNames(names: string[]): Promise<Permission[]>;
}