import { Router } from 'express';
import PermissionController from '../controllers/PermissionController';
import RoleController from '../controllers/RoleController';
import RolePermissionController from '../controllers/RolePermissionController';
import UserAccessControlController from '../controllers/UserAccessControlController';
import UserController from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { is } from '../middlewares/permissions';

const routes = Router();

const userController = new UserController();
const roleController = new RoleController();
const permissionController = new PermissionController();
const userAccessControlController = new UserAccessControlController();
const rolePermissionController = new RolePermissionController();

routes.post('/users', userController.create);

routes.post('/users/login', userController.authenticate);

routes.get(
  '/users', 
  ensureAuthenticated(),
  is(['admin']),
  userController.listAll
);

routes.post(
  '/users/roles',
  ensureAuthenticated(),
  roleController.create
);

routes.post(
  '/users/permissions',
  ensureAuthenticated(),
  permissionController.create
);

routes.post(
  '/users/access-control',
  ensureAuthenticated(),
  userAccessControlController.create
);

routes.post(
  '/roles/:roleId/permissions',
  ensureAuthenticated(),
  rolePermissionController.create
);

export default routes;