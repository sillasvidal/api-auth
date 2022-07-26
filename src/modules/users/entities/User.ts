import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Permission from '../../permissions/entities/Permission';
import Role from '../../roles/entities/Role';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumns: [{name: 'user_id'}],
    inverseJoinColumns: [{name: 'permission_id'}]
  })
  permissions: Permission[]

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{name: 'user_id'}],
    inverseJoinColumns: [{name: 'role_id'}]
  })
  roles: Role[]
}

export default User;
